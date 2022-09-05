const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String },
    cart: { type: Array, default: []},
    name: { type: String },
    phone: { type: String },
    date: { type: String },
    sex: { type: String },
    username: { type: String },
    image: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Account', Account);