To start working with WebSockets using Socket.IO in a Node.js backend and Vite for the frontend with vanilla JavaScript, let's walk through the basics.

### Step 1: Set Up a Simple Node.js Server with Socket.IO
We'll create a basic Node.js server that uses Socket.IO to handle WebSocket connections.

1. **Initialize your project**  
   Create a new directory and initialize a Node.js project:
   ```bash
   mkdir socket-io-project
   cd socket-io-project
   npm init -y
   ```

2. **Install dependencies**  
   Install the necessary packages:
   ```bash
   npm install express socket.io
   ```

3. **Create the server**  
   Create a file `server.js` in the root of your project and add the following code:

   ```javascript
   const express = require('express');
   const http = require('http');
   const { Server } = require('socket.io');

   const app = express();
   const server = http.createServer(app);
   const io = new Server(server);

   // Serve static files from the "public" directory
   app.use(express.static('public'));

   // Listen for WebSocket connections
   io.on('connection', (socket) => {
       console.log('A user connected:', socket.id);

       // Example: broadcast message to all connected clients
       socket.on('message', (msg) => {
           console.log('Message received:', msg);
           io.emit('message', msg); // Broadcast to all clients
       });

       socket.on('disconnect', () => {
           console.log('User disconnected:', socket.id);
       });
   });

   // Start the server
   server.listen(3000, () => {
       console.log('Server is running on http://localhost:3000');
   });
   ```

### Step 2: Set Up the Frontend with Vite and Vanilla JavaScript
Vite is a fast build tool that helps with development and bundling.

1. **Install Vite**  
   In the same project directory, install Vite:

   ```bash
   npm install vite
   ```

2. **Create the frontend structure**  
   Inside the root directory, create a `public` folder. Inside the `public` folder, create `index.html` and `main.js`.

   - **index.html**:
     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Socket.IO Example</title>
     </head>
     <body>
         <h1>WebSocket Chat</h1>
         <div id="messages"></div>
         <input id="messageInput" placeholder="Type a message..." autofocus>
         <button id="sendMessageBtn">Send</button>

         <script type="module" src="/main.js"></script>
     </body>
     </html>
     ```

   - **main.js** (the frontend logic for connecting to the Socket.IO server):
     ```javascript
     import { io } from "socket.io-client";

     const socket = io(); // Automatically connects to the server

     const messageInput = document.getElementById('messageInput');
     const sendMessageBtn = document.getElementById('sendMessageBtn');
     const messagesDiv = document.getElementById('messages');

     // Listen for messages from the server
     socket.on('message', (msg) => {
         const messageElement = document.createElement('div');
         messageElement.textContent = msg;
         messagesDiv.appendChild(messageElement);
     });

     // Send a message when the button is clicked
     sendMessageBtn.addEventListener('click', () => {
         const message = messageInput.value;
         if (message) {
             socket.emit('message', message); // Send the message to the server
             messageInput.value = ''; // Clear the input
         }
     });
     ```

3. **Run Vite**  
   To use Vite, modify your `package.json` to add a script for running Vite:
   
   ```json
   "scripts": {
       "dev": "vite",
       "start": "node server.js"
   }
   ```

   Now, run Vite using the following command:
   ```bash
   npm run dev
   ```

   Vite will automatically build and serve your frontend files.

### Step 3: Run the Application

1. **Start the server**  
   Run the Node.js server:
   ```bash
   npm start
   ```

2. **Access the app**  
   Open your browser and go to `http://localhost:3000`. You should see a simple chat interface where you can type a message and broadcast it to all connected clients in real time.

---

### Step 4: Build Something Cool
To make it more interesting, let's expand this chat app with a few cool features:
- **User Join/Leave Notifications:** Notify all users when someone joins or leaves.
- **Message Timestamps:** Display the time when messages are sent.
- **Online User Count:** Show how many users are currently connected.
# socket-io-tyrout
