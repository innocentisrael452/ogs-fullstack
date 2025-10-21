const mongoose = require('mongoose');
const t = new mongoose.Schema({
  reference:String, amount:Number, status:String, split:Object, raw:Object
},{ timestamps:true });
module.exports = mongoose.model('Transaction', t);
