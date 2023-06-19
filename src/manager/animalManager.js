const Animal = require('../models/Animal')

exports.create = (data) => Animal.create(data)

exports.getAll = () => Animal.find()

exports.getById = (id) => Animal.findById(id).populate('owner')

exports.update = (id, data) => Animal.findByIdAndUpdate(id,data)