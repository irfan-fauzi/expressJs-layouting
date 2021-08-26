
const express = require('express')
const { readAllData, showDetailContact } = require('./utils/moduleContact')

const app = express()
const port = 3000

// ejs
app.set('view engine', 'ejs')
// build in middleware
app.use(express.static('public'))

// Application middlew

app.get('/', (req, res) => {
  res.render('index', {
    userName: "irfan magrib",
    email: "irfan@yahoo.com",
    title: "home",
    
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/pricing', (req, res) => {
  res.render('pricing')
})

app.get('/contact', (req, res) => {
  const allDataContact = readAllData()
  res.render('contact', {
    allDataContact
  })
})

app.get('/contact/:name', (req, res) => {
  const detail = showDetailContact(req.params.name)
  res.render('details', { detail })
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('404, not found')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


