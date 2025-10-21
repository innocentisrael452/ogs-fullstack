const mongoose = require('mongoose');
const s = new mongoose.Schema({ key:String, balance:{type:Number,default:0} }, { timestamps:true });
module.exports = mongoose.model('AdminWallet', s);
