const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Chapa API configuration
const CHAPA_API_KEY = 'CHASECK_TEST-3vf0YrtySMXfPDsAYB2nEIe4Z8OOB7uD';
const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';

// Endpoint to initialize Chapa transaction
app.post('/api/chapa/initialize', async (req, res) => {
  try {
    const response = await axios.post(CHAPA_API_URL, req.body, {
      headers: {
        Authorization: `Bearer ${CHAPA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Chapa API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to initialize transaction',
    });
  }
});

// Endpoint to verify Chapa transaction
app.get('/api/chapa/verify/:tx_ref', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${req.params.tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_API_KEY}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Chapa verification error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to verify transaction',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});