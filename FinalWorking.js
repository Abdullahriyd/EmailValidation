const {Resolver} = require('dns').promises;
const resolver = new Resolver;
const net = require('net');

//--------------     The domain part slicing section  ------------    //

 let   domainFind = (email) =>  {
    let newEmail = (email||'').trim();
  
    if (newEmail.length === 0) {
       return console.log( 'Email not provided');
    }
    const split = newEmail.split('@');
    if (split.length < 2) {
       return console.log('Email does not contain "@".');
    }
    else {
        const [domain] = split.slice(-1);
        if (domain.indexOf('.') === -1) {
          return   console.log( 'Must contain a "." after the "@".');
        }  
        return domain;    
    }
  }
  //----------Input-----//
  let email ='  toconnor@rockefeller.edu  ';
  let newEmail = (email||'').trim();
  let domain = domainFind(email);

  //--------------     The DNS & MX part Checking section  ------------    //

  async function MxFinder(domain,email){
    const domainMX  =  await resolver.resolveMx(domain);
    console.log (domainMX);

    let mxResult = domainMX;
    let maxNum = 1000;
    let indexNum = 0;

  for (let i = 0; i < mxResult.length; i++) {
    const element = mxResult[i].priority;
        if(element<maxNum){
          maxNum = element;
          indexNum=i;
                          } 
  }
    //console.log (maxNum);
   // console.log (indexNum);
    console.log ('Lowest priority mx record : '+mxResult[indexNum].exchange);
    let exchange = mxResult[indexNum].exchange;


     //--------------------- SMTP CHECKING-------------//

  function checkSMTP (exchange,email) {
      
  const socket = net.createConnection(25, exchange, () => console.log(`\nConnected to ${exchange} SMTP server.\n`))
   
  socket.on('error', error => {
     socket.emit('fail', error);
     console.log ('SMTP Did not find')
     socket.destroy();
 });
 const commands = [
  'HELO There\r\n',
  'MAIL FROM: <testtwo720@gmail.com>\r\n',
  `RCPT TO: <${email}>\r\n`,
  'DATA\r\n',
  'QUIT\r\n'
]

let i = 0


socket.on('data', buff => {
  const res = buff.toString()
  console.log(res)
  if (res.includes('354')){
    console.log (`The ${email} email Address Is Valid`) 
    socket.destroy()
  } else if (i < commands.length) {
    socket.write(commands[++i])
  }else{console.log(`The ${email} email Address Is InValid`);
   socket.destroy();}
})

socket.write(commands[i])// it runs i=0 ;
  
 }

  checkSMTP(exchange,email);

  }
  
  MxFinder(domain,newEmail);

  //--------------     This is last work till 28/8/21.-------//
  

   
  


