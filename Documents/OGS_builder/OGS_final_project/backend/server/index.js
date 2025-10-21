require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ogs';
mongoose.connect(MONGODB_URI).then(()=>console.log('MongoDB connected')).catch(e=>console.error(e));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/alumni', require('./routes/alumni'));
app.use('/api/rollcall', require('./routes/rollcall'));

app.get('/', (req,res)=> res.send('OGS backend live'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`OGS server running on ${PORT}`));
