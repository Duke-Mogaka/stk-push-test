const axios = require('axios');
const { generatePassword, getTimestamp } = require('../config/daraja.config');

exports.initiateSTKPush = async (req, res) => {
  try {
    const { phone, amount, account_reference, description } = req.body;

    const timestamp = getTimestamp();
    const password = generatePassword(timestamp);

    // Get access token
    const authResponse = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
          ).toString('base64')}`,
        },
      }
    );

    const accessToken = authResponse.data.access_token;

    // Initiate STK push
    const stkResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: process.env.SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.SHORT_CODE,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: account_reference || 'Test',
        TransactionDesc: description || 'Payment',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(stkResponse.data);
  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to initiate STK Push',
      details: error.response?.data || error.message,
    });
  }
};