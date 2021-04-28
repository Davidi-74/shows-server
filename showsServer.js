const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

require('./configs/subscriptionsDB');

const moviesController = require('./controllers/moviesController')
const subsController = require('./controllers/subscriptionsController')
const memberController = require('./controllers/membersController')

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

app.use('/movies', moviesController)
app.use('/subs', subsController)
app.use('/members', memberController)


app.listen(process.env.PORT || 8000);
console.log("Server is up!");