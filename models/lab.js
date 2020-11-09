const mongoose = require('mongoose');

var labSchema = mongoose.Schema({
    labId: {
        type: String,
        required: "Id required"
    },
    lab_name: {
        type: String,
        required: "Lab_name required"
    },
    lab_ids: {
        type: Array,
    },
    staff_ids:{
        type: Array,
    },
    student_ids:{
        type: Array,
    },
    lab_code:{
        type:String,
        required:"Lab_code required"
    },
    year:{
        type:Number
    }
})

module.exports = mongoose.model('labs', labSchema);