const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const AdminWallet = require('../models/AdminWallet');
const paystack = require('../config/paystack');

const PIN_PRICE = Number(process.env.PIN_PRICE_NAIRA || 1500);
const MAINT = Number(process.env.PIN_MAINTENANCE_NAIRA || 570);
const SCHOOL = Number(process.env.PIN_SCHOOL_NAIRA || 930);

router.post('/initialize-pin', async (req,res)=>{
  try{
    const r = await paystack.post('/transaction/initialize', {
      amount: PIN_PRICE * 100,
      email: 'no-reply@ogsschool.org',
      callback_url: process.env.FRONTEND_URL + '/payments/callback',
      metadata: { type:'pin_purchase' }
    });
    res.json(r.data);
  }catch(e){ console.error(e.response?.data||e.message); res.status(500).json({ error: 'init failed' }); }
});

async function webhookHandler(req, res){
  try{
    const event = JSON.parse(req.body.toString());
    if(event.event === 'charge.success' || (event.event === 'payment.success' && event.data.status === 'success')){
      const data = event.data;
      const amountN = data.amount/100;
      const tx = await Transaction.create({ reference: data.reference, amount: amountN, status: data.status, raw: data });
      tx.split = { maintenance: MAINT, school: SCHOOL, remainder: amountN - MAINT - SCHOOL };
      await tx.save();
      await AdminWallet.findOneAndUpdate({ key: 'maintenance' }, { $inc: { balance: MAINT } }, { upsert:true });
      await AdminWallet.findOneAndUpdate({ key: 'school' }, { $inc: { balance: SCHOOL } }, { upsert:true });
    }
    res.sendStatus(200);
  }catch(e){ console.error(e); res.sendStatus(500); }
}

module.exports = router;
module.exports.webhookHandler = webhookHandler;
