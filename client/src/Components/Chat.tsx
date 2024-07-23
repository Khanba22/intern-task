import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Contexts/SocketContext";
import { UserContext } from "../Contexts/UserConfigContext";
import { send } from "../assets";
import { useLocation } from "react-router-dom";

interface ChatInterface {
  sender: string;
  time: string;
  message: string;
}

type handleRecieveMessageProps = {
  message: string;
  sender: string;
  time: string;
};

const Chat = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const { ws } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const { username } = useContext(UserContext);
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [time,setTime] = useState(Date.now());

  const handleRecieveMessage = ({
    sender,
    time,
    message,
  }: handleRecieveMessageProps) => {
    const chat = { sender, time, message }
    var arr = chats;
    arr.push(chat);
    setChats(arr);
    setTime(Date.now())
  };

  const location = useLocation()

  const sendMessage = () => {
    const roomId = location.pathname.split("/")[2];
    console.log(roomId)
    ws?.emit("send-message", { sender: username, message: message , roomId:roomId });
    setMessage("")
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
    setMessage(event.target.value);
  }

  useEffect(() => {
    ws?.on("receive-message", handleRecieveMessage);
    return () => {
      ws?.off("receive-message", handleRecieveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <button
        onClick={toggleDropdown}
        className="chat-toggle-button fa-message fas"
      ></button>
      <div
        style={{ transform: `translateX(${isDropdownOpen ? "500px" : "0px"})` }}
        className="chatBox"
      >
        {chats.map((chat) => {
          return (
            <div className="chat-container">
              <span>{chat.sender}</span>
              <span>{`${chat.time}`}</span>
              <p>
                {chat.message}
              </p>
            </div>
          );
        })}
        <div className="chatBox-inputbar">
          <textarea value={message} onChange={handleChange} placeholder="Type Something..." className="chatBox-input" />
          <button onClick={sendMessage}><img src={send} alt="" /></button>
        </div>
      </div>
    </>
  );
};

export default Chat;
