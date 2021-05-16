const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 3000
const app = express()
const bodyParser = require('body-parser')

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