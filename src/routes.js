const router = require('express').Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')

router.get('/', homeController.getHomePage)

router.use('/user', userController)

module.exports = router