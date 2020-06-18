const jokeMock = {
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

const randomJokeMock = {
  type: 'success',
  value: {
    id: 115,
    joke: 'i am a random joke',
    categories: [],
  },
};

const personalJokeMock = {
  type: 'success',
  value: {
    id: 141,
    joke: 'random joke about manchester codes',
    categories: [],
  },
};

module.exports = {
  jokeMock,
  randomJokeMock,
  personalJokeMock,
};
