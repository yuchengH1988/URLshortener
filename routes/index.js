const express = require('express')
const router = express.Router()

const Url = require('../models/url')
const { randomPath } = require('../utils')

router.get('/', (req, res) =>
  res.render('index')
)
router.post('/', (req, res) => {
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

router.get('/results', (req, res) =>
  res.render('results')
)

router.get('/:path', (req, res) => {
  const path = req.params.path
  return Url.findOne({ path })
    .then(url => res.redirect(url.originUrl))
}
)

module.exports = router