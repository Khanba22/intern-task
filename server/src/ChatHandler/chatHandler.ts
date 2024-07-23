import { Socket } from "socket.io";

type RoomHandlerProps = {
  socket: Socket;
  roomMap: RoomMap;
};
interface Room {
  users: Set<string>;
  metaData: Record<string, any[]>;
}

interface sendMessageProps {
  message: string;
  roomId: string;
  sender: string;
}

type RoomMap = Record<string, Room>;
export const chatHandler = ({ socket, roomMap }: RoomHandlerProps) => {
  const sendMessage = ({ message, roomId, sender }: sendMessageProps) => {

    const date = new Date();
    const time = date.toLocaleTimeString();
    const messageData = {
      sender,
      message,
      time: time,
    };
    socket.emit("receive-message", { ...messageData });
    socket.to(roomId).emit("receive-message", { ...messageData });
  };

  socket.on("send-message", sendMessage);
};
