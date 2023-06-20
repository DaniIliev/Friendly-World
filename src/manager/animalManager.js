const Animal = require('../models/Animal')

exports.create = (data) => Animal.create(data)

exports.getAll = () => Animal.find()

exports.getById = (id) => Animal.findById(id).populate('owner','populate')

exports.update = (id, data) => Animal.findByIdAndUpdate(id,data)

exports.delete = (id) => Animal.findByIdAndDelete(id)

exports.findOneAndPopulate = (id) => Animal.findById(id).populate('donations')