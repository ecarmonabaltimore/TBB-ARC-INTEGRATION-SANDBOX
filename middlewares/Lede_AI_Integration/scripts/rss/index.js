const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

app.get('/', function (_, res) {
  res.contentType('application/xml');
  res.sendFile(path.join(__dirname, 'data2.xml'));
});

app.listen(port, () => {
  console.info(`RSS feed server listening on port ${port}`);
});
