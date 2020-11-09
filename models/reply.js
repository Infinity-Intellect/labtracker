const mongoose = require('mongoose');

var staffSchema = mongoose.Schema({
    replyId: {
        type: String,
        required: "Id required"
    },
    value: {
        type: String,
        required: "Value required"
    },
    user_id:{
        type: String,
        required:"Userid required"
    }
})

module.exports = mongoose.model('staffs', staffSchema);