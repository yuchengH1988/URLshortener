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
const { randomPath } = require('./utils')

app.get('/', (req, res) =>
  res.render('index')
)
app.post('/', (req, res) => {
  const { originUrl } = req.body
  let newUrl
  const arr = []
  const baseUrl = 'http://localhost:3000'
  const pattern = /^http:\/\/|https:\/\/|www\..{1,}\.com$/

  if (originUrl === '' || originUrl === undefined) {
    let msg = '請輸入網址！'
    return res.render('index', { originUrl: msg })
  } else if (!originUrl.match(pattern)) {
    msg = '網址輸入錯誤'
    return res.render('index', { originUrl: msg })
  }

  Url.find()
    .lean()
    .then((urls) => {
      urls.find(url => {
        if (url.originUrl === originUrl) {
          arr.push(url)
          return newUrl = `${baseUrl}/${url.path}`
        }
      })
      if (arr.length === 0) {
        let path = randomPath(5)
        Url.create({
          originUrl: originUrl,
          path: path
        })
        return newUrl = `${baseUrl}/${path}`
      }
    })
    .then(() => {
      res.render('results', { newUrl, originUrl })
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