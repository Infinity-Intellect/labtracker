const mongoose = require('mongoose');

var lab_progressionSchema = mongoose.Schema({
    lab_progId: {
        type: String,
        required: "Id required"
    },
    labId: {
        type: String,
        required: "LabId required"
    },
    
    exer_prog_ids:{
        type: Array,
    }
})

module.exports = mongoose.model('lab_progressions', lab_progressionSchema);