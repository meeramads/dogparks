const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
    name: { type: String, required: true},
    city: { type: String, required: true},
    address: String
});

const Park = mongoose.model('Park', parkSchema)

module.exports = Park