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
  //mailChecker(email);
  const {valid, reason, validators} = await emailValidator.validate(email); //await isEmailValid(email) ;
  if (valid) return res.send({message: "OK"});

  return res.status(400).send({
    message: "Please provide a valid email address.",
    reason: validators[reason].reason
  })

});


app.listen(5000);
  

// let emails = ['jmorais1110@gmail.com',
//     'mizmacmarketing@gmail.com',
//     'ryanhesse90@gmail.com',
//     'shayan.tariq01@gmail.com',
//     'shanetroach@gmail.com',
//     'ken.citron@gmail.com',
//     'eleanormarksprior@gmail.com',
//     'ecomconference@gmail.com',
//     'csingh586@gmail.com',
//     'rahman@rr-apparel.com',
//     'robertoandressuarez76@gmail.com',
//     'ann.valencia3823@gmail.com',
//     'Zichu81@gmail.com',
//     'md.r.hasan04@gmail.com',
//     'sarakagroupinc@gmail.com',
//     'rautaishwarya1@gmail.com',
//     'seansoohyunkwon@gmail.com',
//     'sherwin.shafie@gmail.com']

// let promises= [];    

// for (let index = 0; index < emails.length; index++) {
//   promises.push(evalidate(emails[index]));
// }

// Promise.all(promises)
// .then(result => {
//   for (let i = 0; i < result.length; i++) {
//     console.log(result[i]);
    
//   }
// })

// async function evalidate (email)  {
//   //let email = req.query.email;
  
//   if (!email){
//     return res.status(400).send({
//       message: "Email is missing."
//     })   
//   }
//   //mailChecker(email);
  
//   const {valid, reason, validators} = await emailValidator.validate(email); //await isEmailValid(email) ;
//   try{
//     if (valid) return res.send({message: "OK"});
//   } catch(err){
//     return res.status(400).send({
//       message: email + "is not valid email address.",
//       reason: validators[reason].reason
//     })
//   }
//   // return res.status(400).send({
//   //   message: "Please provide a valid email address.",
//   //   reason: validators[reason].reason
//   // })

// };
  




