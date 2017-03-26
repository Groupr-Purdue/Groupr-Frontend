const express = require('express');
const path = require('path');

const app = express();

const staticPath = path.resolve(__dirname, '../../public');


console.log(staticPath);

app.use(express.static(staticPath));

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT + '!');
})
