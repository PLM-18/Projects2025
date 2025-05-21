const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const {encryptData } = require('./service/encryption');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', //nextjs frontend
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('send-file', async ({fileData, to}) => {
        console.log(`Received file for ${to}`);
        const encrypted = await encryptData(fileData);

        io.to(to).emit('receive-file', {
            fileData: encrypted,
            from: socket.id
        });
    });

    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`${userId} join room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(4000, () => {
    console.log('Server running on port 4000');
})
