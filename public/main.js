import { io } from "/socket.io/socket.io.esm.min.js";

const socket = io();

const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const messagesDiv = document.getElementById("messages");

socket.on("message", (msg) => {
  console.log("Received message:", msg); // Log the message to ensure it's being received

  const messageElement = document.createElement("div");
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);
});

sendMessageBtn.addEventListener("click", () => {
  const message = messageInput.value;
  console.log(message);

  if (message) {
    socket.emit("message", message); // Emit the message to the server

    messageInput.value = ""; // Clear the input
  }
});
