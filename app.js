const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 3000

// const PORT = process.env.PORT || 3000
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})