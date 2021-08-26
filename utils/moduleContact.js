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

const readAllData = () => {

  createDirectory()
  createEmptyFile()

  const readFile = fs.readFileSync('dist/setting.json', 'utf-8')
  const arrayJSON = JSON.parse(readFile)
  return arrayJSON
}



module.exports = { readAllData }