const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./app/controllers')(app);

app.listen(3000, () => console.log('Api funfando em localhost:3000!'));