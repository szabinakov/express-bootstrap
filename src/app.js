const express = require('express');
const { mainController } = require('./controller.js');
const { jokesController } = require('./controller.js');
const { randomJokesController } = require('./controller.js');
const { personalJokesController } = require('./controller.js');

const app = express();

app.get('/', mainController);

app.get('/jokes', jokesController);

app.get('/jokes/random', randomJokesController);

app.get('/jokes/random/personal/:first/:last', personalJokesController);

module.exports = app;
