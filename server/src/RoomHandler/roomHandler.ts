import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

interface Room {
  users: Set<string>;
  metaData: Record<string, any[]>;
}

type RoomMap = Record<string, Room>;

type RoomHandlerProps = {
  socket: Socket;
  roomMap: RoomMap;
};

type JoinRoomProps = {
  roomId: string;
  username: string;
};

type AddComponentPayload = {
  username: string;
  roomId: string;
  data: any;
};

export const RoomHandler = ({ socket, roomMap }: RoomHandlerProps) => {
  const addComponent = ({ username, data, roomId }: AddComponentPayload) => {
    const room = roomMap[roomId];
    if (!room) {
      socket.emit("error", { message: "Room not found" });
      return;
    }

    if (!room.metaData[username]) {
      room.metaData[username] = [];
    }
    room.metaData[username].push(data);
    socket.to(roomId).emit("component-added", { username, data });
  };

  const removeLastComponent = ({
    username,
    roomId,
  }: {
    username: string;
    roomId: string;
  }) => {
  
    const room = roomMap[roomId];
    if (!room) {
      socket.emit("error", { message: "Room not found" });
      return;
    }

    if (room.metaData[username] && room.metaData[username].length > 0) {
      room.metaData[username].pop();
      socket.to(roomId).emit("component-removed", { username });
    } else {
      socket.emit("error", { message: "No components to remove" });
    }
  };

  const createRoom = () => {
    const uuid = uuidv4();
    const config: Room = {
      users: new Set<string>(),
      metaData: {},
    };
    roomMap[uuid] = config;
    socket.emit("room-created", { roomId: uuid });
  };

  const joinRoom = ({ roomId, username }: JoinRoomProps) => {
    let room = roomMap[roomId];
    if (!room) {
      socket.emit("error", { message: "Room not found" });
      return;
    }

    room.users.add(username);
    if (!room.metaData[username]) {
      room.metaData[username] = [];
    }
    socket.join(roomId);
    socket.emit("user-joined", { metaData: room.metaData });
    socket.to(roomId).emit("user-joined", { metaData: room.metaData });
  };

  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
  socket.on("add-component", addComponent);
  socket.on("remove-last-element", removeLastComponent);
};
