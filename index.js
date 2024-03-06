// index.js
const express = require('express');
const mainRoute = require('./routes/main.route');
const app = express();
const cors = require('cors');
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {origin: "*"}
});

app.use(express.json());
app.use(cors());
app.use('/api', mainRoute);

io.on('connection', (socket) => {
  console.log("connected")

  socket.on("message1", message=>{
    try{
        console.log("msg1");
        io.emit("new_message1", message)
      }
      catch{
      io.emit("error", {error: "message1 non envoyé"})
    }
  })
  socket.on("message2", message=>{
    try{
        console.log("msg2");
        io.emit("new_message2", message)
      }
      catch{
      io.emit("error", {error: "message2 non envoyé"})
    }
  })
});


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
