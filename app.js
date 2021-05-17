const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 3000
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/URLshortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})
// const PORT = process.env.PORT || 3000
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>
  res.render('index')
)

app.get('/results', (req, res) =>
  res.render('results')
)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})