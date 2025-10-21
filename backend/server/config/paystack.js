const axios = require('axios');
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;
if(!PAYSTACK_SECRET) throw new Error('PAYSTACK_SECRET missing');
module.exports = axios.create({ baseURL: 'https://api.paystack.co', headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });
