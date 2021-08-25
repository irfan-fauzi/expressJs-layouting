
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  //res.send('Hello World!')
  // res.json([
  //   {
  //     name: "irfan",
  //     email: "asdas"
  //   },
  //   {
  //     name: "irfan",
  //     email: "asdas"
  //   }
  // ])
  res.sendFile('./view/index.html', {
    root: __dirname
  })
})

app.get('/about', (req, res) => {
  res.sendFile('./view/about.html', {
    root: __dirname
  })
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('Test')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
console.log("ok")