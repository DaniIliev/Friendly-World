const Animal = require('../models/Animal')

exports.create = (data) => Animal.create(data)

exports.getAll = () => Animal.find()