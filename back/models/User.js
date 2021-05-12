const mongoose = require('mongoose');
const Team = require('./Team');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nick: {
        type: String,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true,
    },
    teamEarth: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    totalPoints: {
        type: Number
    },
    team: {
        type: Object
    },
    lastMtach: {
        type: String
    }

});

module.exports = mongoose.model('user', userSchema)