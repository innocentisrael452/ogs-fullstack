const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Alumni = require('../models/Alumni');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 70*1024 } });

router.post('/register', upload.single('photo'), async (req,res)=>{
  try{
    let photoUrl = '';
    if(req.file){
      if(req.file.size > 65*1024) return res.status(400).json({ error:'Photo must be <= 65KB' });
      const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, { folder: 'ogs/alumni' });
      photoUrl = result.secure_url;
    }
    const { name, year, prefect, phone, email, social } = req.body;
    const rec = await Alumni.create({ name, year, prefect, phone, email, social, photoUrl });
    res.json({ ok:true, alumni: rec });
  }catch(e){ console.error(e); res.status(500).json({ error: e.message }); }
});

module.exports = router;
