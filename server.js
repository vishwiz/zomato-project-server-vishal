const express = require('express')
// const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/api')
// const path = require('path');
// let restaurant = require('./modals/restaurants')
const cors = require('cors');
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use("/api", routes)
mongoose.connect('mongodb://localhost/restaurants-Details', {
  useNewUrlParser: true
})



app.listen(8080, () => console.log('server started on port 8080....'))