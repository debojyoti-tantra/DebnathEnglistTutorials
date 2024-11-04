require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('Home')
  // res.send('Hello World!')
})

app.get('/about', (req, res) => {
  res.render('about')
  // res.send('Hello World!')
})

app.get('/payment', (req, res) => {
  res.render('payment')
  // res.send('Hello World!')
})

app.get('/class-10', (req, res) => {
  res.render('class-10')
  // res.send('Hello World!')
})

app.get('/class-10/:slug', (req, res) => {
  res.render(`${req.params.slug}`)
  // res.send(`${req.params.slug} page is on Progress.......`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
