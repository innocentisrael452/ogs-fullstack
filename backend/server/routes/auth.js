const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/bootstrap-superadmin', async (req,res)=>{
  try{
    const { email, password, name } = req.body;
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ error:'exists' });
    const pw = await bcrypt.hash(password, 10);
    const u = new User({ email, name, role:'superadmin', passwordHash: pw, walletAccess:true });
    await u.save();
    res.json({ ok:true });
  }catch(e){ res.status(500).json({ error:e.message }); }
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if(!u) return res.status(401).json({ error:'Invalid' });
  const ok = await bcrypt.compare(password, u.passwordHash||'');
  if(!ok) return res.status(401).json({ error:'Invalid' });
  const token = jwt.sign({ id:u._id, role:u.role, email:u.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn:'7d' });
  res.json({ token });
});

module.exports = router;
