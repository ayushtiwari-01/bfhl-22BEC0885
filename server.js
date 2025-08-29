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

function isSpecialCharacter(str) {
  return !/^[A-Za-z0-9]+$/.test(str);
}

app.get('/', (req, res) => {
  res.json({
    message: "BFHL API is running!",
    student: "22BEC0885",
    endpoints: {
      "POST /bfhl": "Main API endpoint",
      "GET /bfhl": "Operation code endpoint"
    }
  });
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: 'data' should be an array"
      });
    }

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    const allAlphabets = [];

    data.forEach(item => {
      const itemStr = String(item).trim();

      if (isNumeric(itemStr)) {
        const num = parseInt(itemStr);
        sum += num;
        if (num % 2 === 0) {
          evenNumbers.push(itemStr);
        } else {
          oddNumbers.push(itemStr);
        }
      } else if (isAlphabetic(itemStr)) {
        alphabets.push(itemStr.toUpperCase());
        for (let char of itemStr) {
          allAlphabets.push(char);
        }
      } else if (isSpecialCharacter(itemStr)) {
        specialCharacters.push(itemStr);
      }
    });

    let concatString = '';
    allAlphabets.reverse();
    allAlphabets.forEach((char, index) => {
      concatString += index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    });

    const response = {
      is_success: true,
      user_id: "ayush_tiwari_25072005",
      email: "ayush.tiwari2022@vitstudent.ac.in",
      roll_number: "22BEC0885",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString
    };

    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
