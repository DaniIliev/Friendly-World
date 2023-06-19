const animalManager = require('../manager/animalManager')

exports.getHomePage = async (req, res) =>{
    const animals = await animalManager.getAll().lean()
    const storage = []
    for(let i = 0; i < animals.length; i++){
        for(let j = i+1; j <= 3; j++){
            storage.push(animals[animals.length - j])
            break
        }
    }
    const leerStorage = storage.length == 0
    res.render('home', {storage, leerStorage})
}

exports.getErrorPage = (req,res) => {
    res.render('404')
}