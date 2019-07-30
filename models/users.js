const mongoose = require('mongoose');
const Park = require('./models/parks.js')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
    city: String,
    parks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Park'
    }]
    
});

const User = mongoose.model('User', userSchema)

module.exports = User