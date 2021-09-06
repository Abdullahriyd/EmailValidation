const net = require('net');
let sender = 'janifalisa@gmail.com';
let recipient = 'hasan@h-educate.com';
let exchange = 'aspmx.l.google.com';

const commands = [
  'HELO There\r\n',
  'MAIL FROM: <ethan.arrowood@gmail.com>\r\n',
  'RCPT TO: <hasan@h-educate.com>\r\n',
  'DATA\r\n',
  'QUIT\r\n'
]

let i = 0

const socket = net.createConnection(25, 'aspmx.l.google.com', () => console.log('Connected to gmail SMTP server.'))


socket.on('data', buff => {
  const res = buff.toString()
  console.log(res)
  if (res.includes('221 2.0.0 closing connection')) {
    socket.destroy()
  } else if (i < commands.length) {
    socket.write(commands[i++])
  } else {
    console.log('Ran out of commands but did not receive 221 response from SMTP server')
    socket.destroy()
  }
})

socket.write(commands[i])