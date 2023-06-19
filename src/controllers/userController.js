const userManager = require('../manager/userManager')
const router = require('express').Router()
const secret = require('../config/secret')
const jwt = require('jsonwebtoken')


router.get('/register', (req,res) => {
    res.render('register')
})

router.post('/register', async (req,res) => {
    const {email, password, repeatPassword} = req.body

    try{
        if(repeatPassword != password){
            throw Error('Password do not match!')
        }

        const user = await userManager.create({email, password})

        const payload = {id: user._id, email: user.email}
        const token = await jwt.sign(payload, secret(), {expiresIn: '6h'}) 

        res.cookie('auth', token)
        res.redirect('/')
    }catch(err){
        res.render('register', {error: err.message})
    }
})


router.get('/logout', (req,res) => {
    res.clearCookie('auth')
    res.redirect('/')
})

module.exports = router