import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer();
const io = new Server(server, {
  cors: { origin: '*' },
});

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

io.on('connection', socket => {
  socket.on('message', text => {
    console.log(text);
    const data = JSON.parse(text);
    console.log('sending data to jarvis');
    io.emit('jarvis-message', text);
    sleep(3000);
  });
});

server.listen(5000, () =>
  console.log('Server listening on ws://localhost:5000')
);
