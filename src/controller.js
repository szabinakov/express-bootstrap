const axios = require('axios');

const jokesController = (req, res) =>
  axios
    .get('https://api.icndb.com/jokes')
    .then(response => res.send({ jokes: response.data.value }))
    .catch(error => res.status(error.statusCode).send({ error: error.message }));

const randomJokesController = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => res.send({ randomJoke: response.data.value }))
    .catch(error => res.status(error.statusCode).send({ error: error.message }));
};

const personalJokesController = async (req, res) => {
  const { first, last } = req.params;

  try {
    const response = await axios.get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    );
    return res.send({ personalJoke: response.data.value });
  } catch (error) {
    return res.status(error.statusCode).send({ error: error.message });
  }
};

module.exports = {
  jokesController,
  randomJokesController,
  personalJokesController,
};
