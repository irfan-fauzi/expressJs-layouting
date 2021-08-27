const fs = require('fs')
const validator = require('validator')

const createDirectory = () => {
  const dir = './dist'
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
  }
}

const createEmptyFile = () => {
  const dir = 'dist/setting.json'
  if(!fs.existsSync(dir)){
    fs.writeFileSync('dist/setting.json', '[]')
  }
}
// load all data
const readAllData = () => {
  createDirectory()
  createEmptyFile()
  const readFile = fs.readFileSync('dist/setting.json', 'utf-8')
  const arrayJSON = JSON.parse(readFile)
  return arrayJSON
}

// load ditail data
const showDetailContact = (name) => {
  const listOfContact = readAllData()
  const selectedContact = listOfContact.filter(itemContact => {
    return itemContact.name === name
  })
  return selectedContact[0]
}

const writeContactToFile = (arrayJSON) => {
  const stringArrayJson = JSON.stringify(arrayJSON)
  fs.writeFileSync('dist/setting.json', stringArrayJson)
}


const validateDuplicateData = (arrayJSON, userInput, duplicateValue) => {
  const isDuplicate = arrayJSON.filter(el => {
    return el[duplicateValue] === userInput[duplicateValue]
  })
  if(isDuplicate.length > 0){
   
    return false
  }
}

const validateEmail = (email) => {
  const isEmail = validator.isEmail(email)
  if(isEmail){

    return false
  }
}

// save the date
const addContact = (inputUser) => {
  const arrayDatabase = readAllData()
  createDirectory()
  createEmptyFile()

  const isDuplicate = validateDuplicateData(arrayDatabase, inputUser, "name")
  if(isDuplicate === false) return false


  arrayDatabase.push(inputUser)
  writeContactToFile(arrayDatabase)
}

const deleteContact = (params) => {
  console.log(params)
}

module.exports = { readAllData, showDetailContact, addContact, deleteContact }