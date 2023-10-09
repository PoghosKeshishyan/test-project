const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    owner: { type: Types.ObjectId, ref: 'User' },
    cardNumber: { type: String, required: true, unique: true },
    card: []
});

module.exports = model('Cards', schema);