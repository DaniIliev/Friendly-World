const userManager = require('../manager/userManager')
const router = require('express').Router()

router.get('/register', (req,res) => {
    res.render('register')
})

router.post('/register', (req,res) => {
    const {email, password, repeatPassword} = req.body

    try{
        if(repeatPassword != password){
            throw Error('Password do not match!')
        }

        const token = await 
    }catch(err){

    }
})

module.exports = router