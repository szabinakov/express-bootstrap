/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

it('GET / should respond with welcome message', done => {
  request(app)
    .get('/')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Welcome to my jokes API!');
      done();
    });
});

it('GET / should respond with all jokes', done => {
  const mockResponse = {
    type: 'success',
    value: [
      {
        id: 1,
        joke: 'i am a joke',
        categories: [],
      },
      {
        id: 2,
        joke: 'i am another joke',
        categories: [],
      },
    ],
  };
  nock('https://api.icndb.com')
    .get('/jokes')
    .reply(200, mockResponse);
  request(app)
    .get('/jokes')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.jokes).toEqual([
        {
          id: 1,
          joke: 'i am a joke',
          categories: [],
        },
        {
          id: 2,
          joke: 'i am another joke',
          categories: [],
        },
      ]);
      done();
    });
});

it('GET / should respond with a random joke', done => {
  const mockResponse = {
    type: 'success',
    value: {
      id: 115,
      joke: 'i am a random joke',
      categories: [],
    },
  };
  nock('https://api.icndb.com')
    .get('/jokes/random')
    .query({ exclude: '[explicit]' })
    .reply(200, mockResponse);
  request(app)
    .get('/jokes/random')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.randomJoke).toEqual({
        categories: [],
        id: 115,
        joke: 'i am a random joke',
      });
      done();
    });
});

it('GET / should respond with a personal joke', done => {
  const mockResponse = {
    type: 'success',
    value: {
      id: 141,
      joke: 'random joke about manchester codes',
      categories: [],
    },
  };
  nock('https://api.icndb.com')
    .get('/jokes/random')
    .query({ exclude: '[explicit]', firstName: 'Lady', lastName: 'Marmalade' })
    .reply(200, mockResponse);
  request(app)
    .get('/jokes/random/personal/Lady/Marmalade')
    .then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.personalJoke).toEqual(mockResponse.value);
      done();
    });
});
