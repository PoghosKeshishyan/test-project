const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        required: true,
    },

    cards: [
        { type: Types.ObjectId, ref: 'Cards' },
    ],
});

module.exports = model('User', schema);