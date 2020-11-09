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
    name: {
        type: String,
        required:"Name required"
    },
    lab_ids:{
        type: Array,
    }
})

module.exports = mongoose.model('staffs', staffSchema);