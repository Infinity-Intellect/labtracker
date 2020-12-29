const mongoose = require('mongoose');

var labSchema = mongoose.Schema({
    labId:{
        type: String
    },
    lab_name: {
        type: String,
        required: "Lab_name required"
    },
    exer_ids:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'exercises'
    }],
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