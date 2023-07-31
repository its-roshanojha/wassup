const expres = require('express');
const app = expres();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const port = 3003;
app.use(cors());

const mainServer = http.createServer(app);

const io = new Server(mainServer, {
  cors : {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
    console.log(socket.id," User Connected to Server");

    socket.on('send_message', (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on('join_room', (data)=> {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined the room ${data}`)
    })

    socket.on('disconnect', () => {
     console.log(socket.id,"User Disconnected from Server");
    });
})

mainServer.listen(port, () => {
  console.log('Server Running');
})