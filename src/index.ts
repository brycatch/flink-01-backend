import Server from './server';

const server = Server.instance;

server.init(() => {
  console.log(`Server running in port ${server.port}`);
});