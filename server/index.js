const express =  require ('express');
const socketio = require('socket.io');
const http = require('http'); 

const PORT = process.env.PORT || 5000;

const router = require('./router'); 

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('new connection');

  socket.on('disconnect'), () => {
    console.log('User has left!!');
  }
});

app.use(router);

server.listen(PORT, () => console.log(`server started on port ${PORT}`));