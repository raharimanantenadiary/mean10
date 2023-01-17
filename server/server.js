const express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const {mongoose} = require('./connect');

var app = express();
var employeController = require('./controller/empcontroller');

app.use(bodyParser.json());

app.use('/test',  employeController);

let port = process.env.PORT;
console.log("demarrage du server");
app.listen(process.env.PORT, ()=> {console.log(process.env.PORT);});
