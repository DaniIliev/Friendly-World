const router = require('express').Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')
const pageController = require('./controllers/pageController')


router.get('/', homeController.getHomePage)
router.get('/404', homeController.getErrorPage)

router.use(pageController)
router.use('/user', userController)

module.exports = router