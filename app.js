const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
require('./config/mongodb.js')
const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})