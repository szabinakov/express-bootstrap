const express = require('express');
const { mainController } = require('./controller.js');
const { jokesController } = require('./controller.js');
const { randomJokeController } = require('./controller.js');
const { randomPersonalJokeController } = require('./controller.js');

const app = express();

app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/joke/random', randomJokeController);

app.get('/joke/random/personal/Szabina/Kovacs', randomPersonalJokeController);

module.exports = app;
