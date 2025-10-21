const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const generateSAN = require('../utils/sanGenerator');
const createSanPdf = require('../utils/pdfSlip');

router.post('/create', async (req,res)=>{
  try{
    const { fullName, dob, classLevel } = req.body;
    let san; do { san = generateSAN(); } while(await Student.findOne({ san }));
    const s = await Student.create({ fullName, dob, classLevel, san });
    const pdf = await createSanPdf({ name: fullName, san, bankName: process.env.SCHOOL_BANK_NAME || 'DIOK Bank' });
    res.json({ ok:true, student:s, sanPdfBase64: pdf.toString('base64') });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

module.exports = router;
