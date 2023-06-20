const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: [10, 'Email is too short!']
    },

    password: {
        type: String,
        required: true,
        minLength: [4, 'Password is too short!']
    }
})

Schema.pre('save', async function(){
   const hash = await bcrypt.hash(this.password, 10)
   this.password = hash
})

Schema.method('validatePassword', function(value){
    bcrypt.compare(this.password, value)
})

const User = mongoose.model('User', Schema)

module.exports = User