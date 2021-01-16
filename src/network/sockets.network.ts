import socket from 'socket.io';

const listen = (io: socket.Server) => {
  console.log('Listening sockets');
  io.on("connection", (client: socket.Socket) => {

  });
}

export default { listen };