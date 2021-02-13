const express = require('express');
//const router = express.Router();
const emailValidator = require('deep-email-validator');


const app = express();

// async function isEmailValid(email) {
//   return emailValidator.validate(email)
//  }

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/submit', async (req,res) =>{
  let email = req.query.email;

  if (!email){
    return res.status(400).send({
      message: "Email is missing."
    })   
  }
  mailChecker(email);
  const {valid, reason, validators} = await emailValidator.validate(email); //await isEmailValid(email) ;
  if (valid) return res.send({message: "OK"});

  return res.status(400).send({
    message: "Please provide a valid email address.",
    reason: validators[reason].reason
  })

}

)



app.listen(5000);

