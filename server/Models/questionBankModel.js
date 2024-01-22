const mongoose = require('mongoose');
const {Schema}=mongoose;
const questionBankSchema = new Schema({
    question:{
        type:String,
        required:true
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String
    },
    option4:{
        type:String
    },

    difficulty:{
        type:String,
        required:true
    },
    languageType:{
        type:String,
        required:true
    },
    correctAnswer:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('questionBank', questionBankSchema)