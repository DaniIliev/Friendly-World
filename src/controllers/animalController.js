const router = require('express').Router()
const animalManager = require('../manager/animalManager')

router.get('/:id/details', async (req,res) => {
    const animalId = req.params.id
    const animal = await animalManager.getById(animalId).lean()
    const isOwner = animal.owner._id == req.user?.id

    let userDonated = false

    for (const element of animal.donations) {
        if(element._id == req.user.id){
            userDonated = true
        }
    }


    res.render('details', {animal, isOwner, userDonated})
})

router.get('/:id/edit', async (req,res) => {
    const animalId = req.params.id

    try{
        const animal = await animalManager.getById(animalId)

        res.render('edit', animal)
    }catch(err){
        res.redirect('/404')
    }
})

router.post('/:id/edit', async (req,res) => {
    const {name, years, kind, imageUrl, need, location, description} = req.body 
    const animalId = req.params.id
    try{
        await animalManager.update(animalId, {name, years, kind, imageUrl, need, location, description})
        res.redirect(`/animal/${animalId}/details`)
    }catch(err){
        res.render('edit', {error: err.message})
    }
})

router.get('/:id/delete', async (req,res) => {
    const animalId = req.params.id

    try{
        await animalManager.delete(animalId)
        res.redirect('/catalog')
    }catch(err){
        res.redirect('/404')
    }
})


router.get('/:id/donate', async (req,res) => {
    const animalId = req.params.id
    const userId = req.user.id
    try{
        const animal = await animalManager.findOneAndPopulate(animalId)
        animal.donations.push(userId)
        animal.save()

        res.redirect(`/animal/${animalId}/details`)
    }catch(err){
        res.redirect('/404')
    }
})


module.exports = router