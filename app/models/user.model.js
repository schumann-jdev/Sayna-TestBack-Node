const mongoose = require ('mongoose');
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        date_naissance: Date,
        sexe: String,
        token: String,
        refresh_token: String,
        authError: Number,
        profilActive: Boolean,
        activeAt: Date,
    })
);

module.exports = User;