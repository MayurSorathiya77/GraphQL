const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
});


const Student = mongoose.model('student',studentSchema);

module.exports = {Student};