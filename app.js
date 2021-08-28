
const express = require('express')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const { readAllData, showDetailContact, addContact, deleteContact, checkDuplicate, updateContact, duplicateEdit } = require('./utils/moduleContact')

const app = express()
const port = 3000

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: { maxAge: 6000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(flash())
// ejs
app.set('view engine', 'ejs')
// build in middleware
app.use(express.static('public'))
app.use(express.urlencoded())


// show home page
app.get('/', (req, res) => {
  res.render('index', {
    userName: "irfan magrib",
    email: "irfan@yahoo.com",
    title: "home",
    
  })
})

// show about page ------------------
app.get('/about', (req, res) => {
  res.render('about')
})

// ----------------------------
// show about page ------------------
app.get('/pricing', (req, res) => {
  res.render('pricing')
})

// -----------------------------------

// show contact page ------------------
app.get('/contact', (req, res) => {
  const allDataContact = readAllData()
  res.render('contact', {
    allDataContact,
    msg: req.flash('msg')
  })
})

// -------------------------------------
// show add page
app.get('/contact/add', (req, res) => {
  res.render('add')
})

// start ADD data ----------------------------------------
app.post('/contact', [
 body('name').custom((value) => {
  const isDuplicate = checkDuplicate(value)
  if(isDuplicate){
    throw new Error('Nama kontak sudah terdaftar')
  }
  return true
 }),
 
 check('email', 'masukan email yang valid')
 .isEmail()],
 (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()
    res.render('add', { error })
    
  } else {
    const inputUser = req.body
    addContact(inputUser)
    // kirimkan flash
    req.flash('msg', 'data kontak berhasil ditambahkan')
    res.redirect('/contact')
  }
  
})

// end ADD data ----------------------------------------

// delete
app.get('/contact/delete/:name', (req ,res) => {
  const detail = showDetailContact(req.params.name)
   // jika kontak tidak ada
   if(!detail){
    res.status(404)
    res.send('<h1>404</h1>')
   } else {
    deleteContact(req.params.name)
    req.flash('msg', `${req.params.name} telah dihapus`)
    res.redirect('/contact')
   }
})

// show edit page
app.get('/contact/edit/:name', (req, res) => {
  const detail = showDetailContact(req.params.name)
  res.render('edit', { detail })
})

// process edit
app.post('/contact/update',[
  // body('name').custom((value) => {
  //  const isDuplicate = checkDuplicate(value)
   
  //  if(isDuplicate){
  //    throw new Error('Nama kontak sudah terdaftar')
  //  }
  //  return true
    
  // }),
  
  body().custom(value => {
    const {oldName, name} = value
    const isDuplicate = checkDuplicate(name)
    const validate = oldName === name
    
    if(!validate){
      if(isDuplicate){
        throw new Error('data sudah tersedia')
      }
    } 
    
 
  }),

  check('email', 'masukan email yang valid')
  .isEmail()],
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     const error = errors.array()
     const detail = req.body
     res.render(`edit`, { error, detail })
     
   } else {
      // const contact = req.body
      // updateContact(contact)
    //  addContact(inputUser)
    //  // kirimkan flash
    //  req.flash('msg', 'data kontak berhasil ditambahkan')
    //  res.redirect('/contact')
    //  res.redirect('/contact')
    console.log('masuk')
   }
   
 })

// --------------------

// detail
app.get('/contact/:name', (req, res) => {
  const detail = showDetailContact(req.params.name)
  res.render('details', { detail })
})

// if page not found -----------------------

app.use('/', (req, res) => {
  res.status(404)
  res.send('404, not found')
})

// ----------------------------------------

// start server ---------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// -----------------------------------------------


