const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('./client/dist'));

app.get('/', (req, res) => {
  res.send('connected!')
})

var PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})