const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const confconex = require('./confconex');


const app = express();
const PORT = 3000;

app.use(cors());

