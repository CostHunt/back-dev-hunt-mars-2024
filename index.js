// index.js
const express = require('express');
const mainRoute = require('./routes/main.route');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {origin: "*"}
});
const cors = require('cors');
app.use(express.json());
app.use('/api', mainRoute);

app.use(cors());
io.on('connection', (socket) => {
  console.log("connected")

  socket.on("message", message=>{
    try{
        console.log(message);
        io.emit("new_message", message)
      }
      catch{
      io.emit("error", {error: "message non envoyé"})
    }
  })
});


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
