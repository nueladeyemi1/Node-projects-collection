const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});

app.post('/', (req, res) => {
  console.log('You can post to this endpoint');
});

const port = 2000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
