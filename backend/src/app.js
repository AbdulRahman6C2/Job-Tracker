const express = require('express');
const cors = require('cors');
const applicationsRouter = require('./routes/applications');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/applications', applicationsRouter);
app.use(errorHandler);

module.exports = app;