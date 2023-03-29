const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());


app.post('/bfhl', (req, res) => {
  try {
    
    const inputArray = req.body.array;

   
    const { full_name, dob, email, college_roll } = req.body;

   
    const user_id = `${full_name}_${dob.split('-').join('')}`;

   
    const evenNumbers = [];
    const oddNumbers = [];
    const upperCaseLetters = [];
  
    inputArray.forEach((element) => {
      if (typeof element === 'number') {
        if (element % 2 === 0) {
          evenNumbers.push(element);
        } else {
          oddNumbers.push(element);
        }
      } else if (typeof element === 'string') {
        const letters = element.split('');
        letters.forEach((letter) => {
          if (/[a-zA-Z]/.test(letter)) {
            upperCaseLetters.push(letter.toUpperCase());
          }
        });
      }
    });

    // create the response object
    const response = {
      user_id,
      email,
      college_roll,
      is_success: true,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      uppercase_letters: upperCaseLetters,
    };

    // send the response
    res.status(200).json(response);
  } catch (error) {
    // handle any errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});