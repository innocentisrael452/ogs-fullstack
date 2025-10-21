const mongoose = require('mongoose');
const a = new mongoose.Schema({ name:String, year:String, prefect:String, phone:String, email:String, social:String, photoUrl:String }, { timestamps:true });
module.exports = mongoose.model('Alumni', a);
