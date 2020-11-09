const mongoose = require('mongoose');

var exerciseSchema = mongoose.Schema({
    exerId: {
        type: String,
        required: "Id required"
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
        required:"i/p file location required"
    },
    output_file_location:{
        type:String,
        required:"o/p file location required"
    },
    deadline:{
        type:Date,
        required:"Deadline Required"
    },
    date_of_creation:{
        type:Date,
        required:"Date of creation required"
    },
    lab_id:{
        type:String,
        required:"Lab id required"
    },
    discussion_id:{
        type:String,
        required:"Discussion id required"
    }
})

module.exports = mongoose.model('exercises', exerciseSchema);