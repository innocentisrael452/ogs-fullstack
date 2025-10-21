const express = require('express');
const router = express.Router();
const RollCall = require('../models/RollCall');

router.post('/submit', async (req,res) => {
  try{
    const payload = req.body;
    const rc = await RollCall.create(payload);
    res.json({ ok:true, rollcall: rc });
  }catch(e){ res.status(500).json({ error: e.message }); }
});

router.get('/class/:classId/date/:date', async (req,res) => {
  const rc = await RollCall.findOne({ classId: req.params.classId, date: req.params.date });
  res.json(rc || { entries: [] });
});

module.exports = router;
