const router = require('express').Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')
const pageController = require('./controllers/pageController')
const animalController = require('./controllers/animalController')

router.get('/', homeController.getHomePage)
router.get('/404', homeController.getErrorPage)

router.use(pageController)
router.use('/user', userController)
router.use('/animal', animalController)

module.exports = router