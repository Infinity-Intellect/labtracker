const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    commentId:{
        type: String
    },
    value: {
        type: String,
        required: "Value required"
    },
    reply_ids: [{
        type: String
    }],
    user_id:{
        type: String,
        required:"Userid required"
    }
})

module.exports = mongoose.model('comments', commentSchema);