const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const PORT = 3000;

console.log("nodemon is working...");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Static files
app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log('A user connected', socket.id);

    // Listen for 'message' event from the client
    socket.on('message', (msg) => {
        console.log("Message received:", msg);

        // Emit 'message' event to all clients
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
