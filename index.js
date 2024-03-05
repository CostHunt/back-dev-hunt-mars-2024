// index.js
const express = require('express');
const mainRoute = require('./routes/main.route');
const authRoute = require('./routes/auth.route');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {origin: "*"}
});

app.use(express.json());
app.use('/api', mainRoute);
app.use('/api/auth', authRoute);


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
