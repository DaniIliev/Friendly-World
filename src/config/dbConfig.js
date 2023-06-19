const mongoose = require('mongoose')

async function connectToDb(){
   await mongoose.connect('mongodb://127.0.0.1:27017/friendly-world')
    .then(() => console.log('Db connect!'))
}

module.exports = connectToDb