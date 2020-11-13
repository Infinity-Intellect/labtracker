const mongoose = require('mongoose');

var exer_progressionSchema = mongoose.Schema({
    exerProgId:{
        type: String
    },
    exerId: {
        type: String,
        required: "ExerId required"
    },
    submission_date: {
        type: Date,
        required:"Date required"
    },
    marks:{
        type: Number,
        required:"Marks required"
    },
    filepath:{
        type:String,
        required:"File_path required"
    }
})

module.exports = mongoose.model('exer_progressions', exer_progressionSchema);