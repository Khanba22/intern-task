import React, { useContext, useEffect, useState } from "react";
import DrawingBoard from "../Components/DrawingBoard";
import Toolbar from "../Components/ToolBar";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Contexts/SocketContext";
import { UserContext } from "../Contexts/UserConfigContext";
import userServices from "../services/UserServices";
import Chat from "../Components/Chat";

const WhiteBoard = () => {
  const userContext = useContext(UserContext);
  const { username, setUsername } = userContext;
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("");
  const { ws } = useContext(SocketContext);
  const [filled, setFilled] = useState(false);
  const { roomId } = useParams();

  

  const setName = async () => {
    const user = (await userServices.getUsername()) || "";
    setUsername(user);
  };

  useEffect(() => {
    setName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (username) {
      ws?.emit("join-room", { roomId, username });
    }
  }, [ws, roomId, username]);

  return (
    <div className="whiteboard-page">
      <Toolbar
        filled={filled}
        setFilled={setFilled}
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
      />
      <DrawingBoard roomId={roomId} filled={filled} tool={tool} color={color} />
      <Chat/>
    </div>
  );
};

export default WhiteBoard;
