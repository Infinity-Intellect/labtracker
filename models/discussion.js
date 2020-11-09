const mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
    discussionId: {
        type: String,
        required: "Id required"
    },
   
    comment_ids:{
        type: Array,
    }
})

module.exports = mongoose.model('discussions', discussionSchema);