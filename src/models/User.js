const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

Schema.pre('save', async function(){
   const hash = await bcrypt.hash(this.password, 10)
   this.password = hash
})

Schema.method('validatePassword', function(value){
    bcrypt.compare(this.password, value)
})

mongoose.model('User', Schema)