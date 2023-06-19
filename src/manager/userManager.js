const User = require('../models/User')




exports.create =  (data) => User.create(data)

exports.findOne = (data) => User.findOne(data)


    
