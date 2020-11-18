const mongoose = require('mongoose');

var exerciseSchema = mongoose.Schema({
    exerId:{
        type: String
    },
    title: {
        type: String,
        required: "title required"
    },
    prob_stmt: {
        type: String,
        required:"Problem_statement required"
    },
    exer_no:{
        type: Number,
        required:"Exer_no required"
    },
    input_file_location:{
        type:String,
    },
    output_file_location:{
        type:String,
    },
    deadline:{
        type:Number,
        required:"Deadline Required"
    },
    date_of_creation:{
        type:Number,
        required:"Date of creation required"
    },
    labId:{
        type:String,
        required:"Lab id required"
    },
    discussionId:{
        type:String,
        required:"Discussion id required"
    }
})

module.exports = mongoose.model('exercises', exerciseSchema);