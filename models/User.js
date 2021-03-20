const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 12,
        max: 80,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)