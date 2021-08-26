const express = require('express')
const app = express()
const port = 3000

// ejs
app.set('view engine', 'ejs')

const dummyData = [
  {
    name: "irfan",
    email: "irfan@yahoo.com"
  },
  {
    name: "heru",
    email: "heru@yahoo.com"
  },
  {
    name: "doddy",
    email: "doddy@yahoo.com"
  },
  {
    name: "erik",
    email: "erik@yahoo.com"
  },
  {
    name: "erik",
    email: "erik@yahoo.com"
  },

]

// build in middleware
app.use(express.static('public'))

// Application middleware

app.use((req, res, next) => {
  console.log('Time : ', Date.now())
  next()
})


app.get('/', (req, res) => {
  res.render('index', {
    userName: "irfan magrib",
    email: "irfan@yahoo.com",
    title: "home",
    dummyData
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/pricing', (req, res) => {
  res.render('pricing')
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('404, not found')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


console.log("ok")