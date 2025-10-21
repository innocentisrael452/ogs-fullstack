const mongoose = require('mongoose');
const r = new mongoose.Schema({ date:String, classId:String, formMasterId:String, entries:Array }, { timestamps:true });
module.exports = mongoose.model('RollCall', r);
