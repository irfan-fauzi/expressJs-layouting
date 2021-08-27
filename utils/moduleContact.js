const fs = require('fs')

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

// save the date
const addContact = (inputUser) => {
  const arrayDatabase = readAllData()
  createDirectory()
  createEmptyFile()
  arrayDatabase.push(inputUser)
  writeContactToFile(arrayDatabase)
}


module.exports = { readAllData, showDetailContact, addContact }