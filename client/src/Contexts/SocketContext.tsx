import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import {
  addComponent,
  setMetaData,
  removeComponent,
} from "../Redux/BoardSlice";

const socketUrl = process.env.SOCKET_URL || "http://localhost:4000";

export type SocketType = {
  ws: Socket;
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  updater: boolean;
};

export const SocketContext = createContext<Partial<SocketType>>({});
type SocketProviderProps = {
  children: ReactNode;
};

type EnterRoomProps = {
  roomId: string;
};
const ws = io(socketUrl);
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enterRoom = ({ roomId }: EnterRoomProps) => {
    setRoomId(roomId);
    navigate(`/room/${roomId}`);
  };

  const userJoined = ({ metaData }: any) => {
    dispatch({
      type: `${setMetaData}`,
      payload: {
        metaData,
      },
    });
  };

  const componentAdded = ({
    username,
    data,
  }: {
    username: string;
    data: any;
  }) => {
    setUpdater(!updater);
    dispatch({
      type: `${addComponent}`,
      payload: {
        username,
        data,
      },
    });
  };

  const removedComponent = ({ username }: { username: string }) => {
    setUpdater(!updater);
  
 
    dispatch({
      type: `${removeComponent}`,
      payload: {
        username,
      },
    });
  };

  // States
  const [roomId, setRoomId] = useState<string>("");
  const [updater, setUpdater] = useState(false);

  // UseEffects
  useEffect(() => {
    ws?.on("room-created", enterRoom);
    ws?.on("user-joined", userJoined);
    ws?.on("component-added", componentAdded);
    ws?.on("component-removed", removedComponent);

    return () => {
      ws?.off("room-created", enterRoom);
      ws?.off("user-joined", userJoined);
      ws?.off("component-added", componentAdded);
      ws?.off("component-removed", removedComponent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={{ ws, roomId, setRoomId, updater }}>
      {children}
    </SocketContext.Provider>
  );
};
