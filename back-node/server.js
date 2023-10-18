const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server listening on port ${port}!`));

const uploadRoute = require('./src/route/upload.route.js');
app.use('/api/upload', uploadRoute);
