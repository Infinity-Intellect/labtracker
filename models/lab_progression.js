const mongoose = require('mongoose');

var lab_progressionSchema = mongoose.Schema({
    labProgId:{
        type: String
    },
    labId: {
        type: String,
        required: "LabId required"
    },
    
    exer_prog_ids:[{
            type: String
        }],
})

module.exports = mongoose.model('lab_progressions', lab_progressionSchema);