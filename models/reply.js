const mongoose = require('mongoose');

var replySchema = mongoose.Schema({
    replyId:{
        type: String
    },
    value: {
        type: String,
        required: "Value required"
    },
    userId:{
        type: String,
        required:"Userid required"
    }
})

module.exports = mongoose.model('replies', replySchema);