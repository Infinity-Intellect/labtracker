const mongoose = require('mongoose');

var discussionSchema = mongoose.Schema({
    discussionId:{
        type: String
    },
   
    comment_ids:[{
            type: String
    }],
})

module.exports = mongoose.model('discussions', discussionSchema);