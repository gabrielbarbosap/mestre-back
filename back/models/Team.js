const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('team', teamSchema)