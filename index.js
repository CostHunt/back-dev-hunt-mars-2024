// index.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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

  socket.on('joinGroup', async (data) => {
    socket.join(data.id_groupe)
    console.log( data.id_account,' joined group:', data.id_groupe);
    // Fetch messages for the group from the database
    const messages = await prisma.message.findMany({
      where: {
        id_groupe: data.id_groupe,
      },
    });

    // Emit the messages to the user who joined the group
    socket.emit('groupMessages', messages);
  });

  socket.on('leaveGroup', (data) => {
    socket.leave(data.id_groupe);
    console.log(data.id_account,' joined group:', data.id_groupe);
  });
  socket.on('sendMessage', async (data) => {
    const savedMessage = await prisma.message.create({
      data: {
        contenu: data.contenu,
        id_groupe: data.id_groupe, 
        id_account: data.id_account, 
      },
    });

    io.to(data.id_groupe).emit('new_message', savedMessage);
  });
});


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
