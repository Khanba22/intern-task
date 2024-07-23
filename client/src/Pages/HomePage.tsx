import React, { useCallback, useContext, useEffect, useState } from "react";
import { SocketContext } from "../Contexts/SocketContext";
import { useNavigate } from "react-router-dom";

const HomePage = ({
  setIsHome,
}: {
  setIsHome: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const socketContext = useContext(SocketContext);
  const { ws } = socketContext;
  const navigate = useNavigate();
  useEffect(() => {
    setIsHome(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createRoom = useCallback(() => {
    ws?.emit("create-room");
  }, [ws]);

  const joinRoom = () => {
    navigate(`/room/${roomId}`);
  };
  const [roomId, setRoomId] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  return (
    <div
      style={{
        background: "url('/homeBackground.png')",
        width: "100vw",
        height: "100vh",
        objectFit: "contain",
        backgroundSize: "cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat"
      }}
    >
      <div className="homePageContainer">
        <h1>WHITEBOARD.IO</h1>

        <div>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter Room Code"
          />
          <button disabled={roomId.length === 0} onClick={joinRoom}>
            Join Room
          </button>
        </div>
        <h4>
          OR
        </h4>
        <button onClick={createRoom}>Create Room</button>
      </div>
    </div>
  );
};

export default HomePage;
