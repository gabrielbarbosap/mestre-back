const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema({
    team1: {
        type: String,
        required: true
    },
    team2: {
        type: String,
        required: true
    },
    date: {
        type: String,
        require: true
    },
    nameTeam: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('game', gameSchema)