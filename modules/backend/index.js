const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const config = require('../../config');

const app = express();

app.defaultPort = config.ports.backend;
app.settings = {
    hasDb: false,
    module: 'backend',
    ns: ['backend'],
};

app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'assets')));


require('./routes')(app);

module.exports = app;
