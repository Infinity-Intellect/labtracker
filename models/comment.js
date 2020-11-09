const mongoose = require('mongoose');

var staffSchema = mongoose.Schema({
    commentId: {
        type: String,
        required: "Id required"
    },
    value: {
        type: String,
        required: "Value required"
    },
    reply_ids: {
        type: Array,
    },
    user_id:{
        type: String,
        required:"Userid required"
    }
})

module.exports = mongoose.model('staffs', staffSchema);