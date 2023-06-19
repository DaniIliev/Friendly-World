const secret = require('../config/secret')
const jwt = require('jsonwebtoken')

exports.auth = async (req,res,next) => {
    const token = req.cookies['auth']

    if(token){
        try{
            const decodedToken = jwt.verify(token, secret())

            req.user = decodedToken
            req.isAuthenticated = true
    
            res.locals.user = decodedToken
            res.locals.isAuthenticated = true
        }catch(err){
            res.clearCookie('auth')
            res.redirect('/user/login')
        }
    }
    next()
}

exports.isAuthenticated = (req,res,next) => {
    if(!req.user) {
        res.redirect('/404')
    }
    next()
}