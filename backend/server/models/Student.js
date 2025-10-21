const mongoose = require('mongoose');
const s = new mongoose.Schema({
  fullName:String, dob:Date, classLevel:String, san:{type:String, unique:true}, photoUrl:String, createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
},{ timestamps:true });
module.exports = mongoose.model('Student', s);
