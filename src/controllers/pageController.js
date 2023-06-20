const router = require('express').Router()
const animalManager = require('../manager/animalManager')
const isAuth = require('../middleware/authMiddleware')

router.get('/create', isAuth.isAuthenticated, (req,res) => {
    res.render('create')
})

router.post('/create', async (req,res) => {
    const {name, years, kind, imageUrl, need, location, description} = req.body 
    const owner = req.user.id

    
    try{
        await animalManager.create({name, years, kind, imageUrl, need, location, description, owner})
        res.redirect('/catalog')
    }catch(err){
    res.render('create', {error: err.message})

    }
})

router.get('/catalog', async (req,res) => {
    const animals = await animalManager.getAll().lean()
    const noAnimals = animals.length == 0

    res.render('catalog', {animals, noAnimals})
})

router.get('/search', (req,res) => {
    res.render('search')
})

router.post('/search', isAuth.isAuthenticated, async (req,res) => {
    const animals = await animalManager.getAll().lean()
    const {text} = req.body
    console.log(text)
    const maches = []
    for (const animal of animals) {
        if(animal.location.toLowerCase().includes(text.toLowerCase())){
            maches.push(animal)
        }
    }
    const noMaches = maches.length == 0
    res.render('search', {maches, text, noMaches})
})
module.exports = router