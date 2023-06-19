const express = require('express')

const dbConfig = require('./config/dbConfig')
const setupViewEngine = require('./config/configHandlebars')
const routes = require('./routes')

const app = express()

setupViewEngine(app)
dbConfig()

app.use(express.static('src/public'))
app.use(express.urlencoded({extended:false}))
app.use(routes)




app.listen(3000, () => console.log('Server is listen on port 3000...'))