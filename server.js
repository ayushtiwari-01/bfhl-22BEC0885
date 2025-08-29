const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

function isNumeric(str) {
  return /^\d+$/.test(str);
}

function isAlphabetic(str) {
  return /^[A-Za-z]+$/.test(str);
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' should be an array"
      });
    }

    const numbers = [];
    const alphabets = [];
    let highestAlphabet = '';

    data.forEach(item => {
      const itemStr = String(item).trim();

      if (isNumeric(itemStr)) {
        numbers.push(itemStr);
      } else if (isAlphabetic(itemStr) && itemStr.length === 1) {
        alphabets.push(itemStr);
        
        if (!highestAlphabet || itemStr.toUpperCase() > highestAlphabet.toUpperCase()) {
          highestAlphabet = itemStr;
        }
      }
    });

    const response = {
      is_success: true,
      user_id: "ayush_tiwari_25072005",
      email: "ayush.tiwari2022@vitstudent.ac.in",
      roll_number: "22BEC0885",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/bfhl`);
  console.log(`🎯 Roll Number: 22BEC0885`);
});

module.exports = app;
