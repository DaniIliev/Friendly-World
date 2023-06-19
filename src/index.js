const express = require('express')

const dbConfig = require('./config/dbConfig')
const setupViewEngine = require('./config/configHandlebars')
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const authentication = require('./middleware/authMiddleware')

const app = express()

setupViewEngine(app)
dbConfig()

app.use(express.static('src/public'))
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(authentication.auth)
app.use(routes)







app.listen(3000, () => console.log('Server is listen on port 3000...'))