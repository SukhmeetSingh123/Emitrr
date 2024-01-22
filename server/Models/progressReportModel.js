const mongoose = require('mongoose');
const {Schema}=mongoose;
const progressReportSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Auth'
  },
  correctAnswers:{
    type:Number,
    default:0
  },
  wrongAnswers:{
    type:Number,
    default:0
  },
  choosenLanguages:{
    type:[String],
    default:['']
  }

})

module.exports = mongoose.model('progressReport', progressReportSchema)