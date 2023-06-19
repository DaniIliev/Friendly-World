const router = require('express').Router()
const animalManager = require('../manager/animalManager')

router.get('/create', (req,res) => {
    res.render('create')
})

router.post('/create', async (req,res) => {
    const {name, years, kind, imageUrl, need, location, description} = req.body 
    const onwer = req.user

    try{
        const data = {name, years, kind, imageUrl, need, location, description, onwer}
        await animalManager.create({name, years, kind, imageUrl, need, location, description, onwer})
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
module.exports = router