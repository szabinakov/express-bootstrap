/**
 * @jest-environment node
 */

const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');
const { jokeMock, randomJokeMock, personalJokeMock } = require('../data-for-testing/data-test.js');

describe('GET / - Homepage', () => {
  it('GET / should respond with some homepage markup', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Jokes');
        done();
      });
  });
});

describe('GET/jokes', () => {
  it('GET / should respond with all jokes', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, jokeMock);
    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes).toEqual(jokeMock.value);
        done();
      });
  });
  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET/jokes/random', () => {
  it('should responde with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 404, message: 'Something went wrong' });

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Something went wrong');
        done();
      });
  });
  it('GET / should respond with a random joke', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, randomJokeMock);
    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual(randomJokeMock.value);
        done();
      });
  });
});

describe('GET/jokes/random/personal/Lady/Marmalade', () => {
  it('shoud response with an error message when something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'Lady', lastName: 'Marmalade' })
      .replyWithError({ statusCode: 500, message: 'Something is wrong' });

    request(app)
      .get('/jokes/random/personal/Lady/Marmalade')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('Something is wrong');
        done();
      });
  });
  it('GET / should respond with a personal joke', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'Lady', lastName: 'Marmalade' })
      .reply(200, personalJokeMock);
    request(app)
      .get('/jokes/random/personal/Lady/Marmalade')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(personalJokeMock.value);
        done();
      });
  });
});
