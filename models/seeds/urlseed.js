const mongoose = require('mongoose')
const Url = require('../url')
mongoose.connect('mongodb://localhost/URLshortener', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const url = require('./url.json').results
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected !!')
  Url.create(url)
    .then(() => db.close())
  console.log('url is done')
})