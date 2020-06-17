const request = require('request');
const axios = require('axios');

const mainController = (req, res) => {
  res.send({ message: 'Welcome to my jokes API!' });
};

const jokesController = (req, res) =>
  request('https://api.icndb.com/jokes', (error, jokesApiResponse) => {
    if (error) {
      console.log(error);
    }

    const parsedResponse = JSON.parse(jokesApiResponse.body);

    res.send({ jokes: parsedResponse.value });
  });

const randomJokeController = (req, res) => {
  res.send({ message: 'This is the random jokes endpoint' });
};

const randomPersonalJokeController = (req, res) => {
  res.send({ message: 'This is the personalised random joke endpoint' });
};

module.exports = {
  mainController,
  jokesController,
  randomJokeController,
  randomPersonalJokeController,
};
