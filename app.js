'use strict';

console.log("Hello world");

const express = require('express');
const app = express();
const petRoutes = require('./routes/petRoutes');
const logger = require('./middleware/logger');

app.use(express.json());
app.use(logger);
app.use('/', petRoutes);

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});

module.exports = app;