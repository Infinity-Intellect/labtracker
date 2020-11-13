const mongoose = require('mongoose');

var staffSchema = mongoose.Schema({
    
    userId: {
        type: String,
        required: "Id required"
    },
    staffId: {
        type: String,
        required: "StudentId required"
    },
    
    lab_ids: [{
            type: String
        }],
})

module.exports = mongoose.model('staffs', staffSchema);