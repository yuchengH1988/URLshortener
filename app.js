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

const Url = require('./models/url')
const randomPath = require('./utils')

app.get('/', (req, res) =>
  res.render('index')
)
app.post('/', (req, res) => {
  const { originUrl } = req.body
  let newUrl
  const arr = []
  const baseUrl = 'http://localhost:3000'
  Url.find()
    .lean()
    .then((urls) => {
      urls.find(url => {
        if (url.originUrl === originUrl) {
          arr.push(url)
        }
      })
      if (arr.length === 0) {
        const path = randomPath(5)
        Url.create({
          originUrl: originUrl,
          path: path
        })
        return newUrl = `${baseUrl}/${path}`
      }
    })
    .then(() => {
      if (originUrl.match(/^http:\/\/|https:\/\//)) {
        res.render('results', { newUrl, originUrl })
      } else {
        res.render('results', { newUrl, url: `http://${originUrl}` })
      }
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/results', (req, res) =>
  res.render('results')
)

app.get('/:path', (req, res) => {
  const path = req.params.path
  return Url.findOne({ path })
    .then(url => res.redirect(url.originUrl))
}
)
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})