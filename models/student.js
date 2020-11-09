const mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: "Id required"
    },
    studentId: {
        type: String,
        required: "StudentId required"
    },
    name: {
        type: String,
        required:"Name required"
    },
    sem: {
        type: Number,
        required:"Sem required"
    },
    lab_prog_ids:{
        type: Array,
    }
})

module.exports = mongoose.model('students', studentSchema);