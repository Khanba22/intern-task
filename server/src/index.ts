import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import { RoomHandler } from "./RoomHandler/roomHandler";
import { chatHandler } from "./ChatHandler/chatHandler";

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
app.use(cors());
const roomMap = {};

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wss = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

wss.on("connection", (socket) => {
  chatHandler({socket,roomMap})
  RoomHandler({ socket, roomMap });
});
