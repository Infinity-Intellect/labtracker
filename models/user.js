const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: "Id required"
    },
    email: {
        type: String,
        required: "Email required"
    },
    role: {
        type: Boolean,
        required:"Role required"
    }
})

module.exports = mongoose.model('users', userSchema)