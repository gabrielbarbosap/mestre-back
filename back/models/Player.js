const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    plantels: {
        type: Number
    },
    mediaPlay: {
        type: Number
    },
    lastPoint: {
        type: Number
    }
});

module.exports = mongoose.model('player', playerSchema)