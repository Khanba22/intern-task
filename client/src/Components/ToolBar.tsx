import React from "react";
import {
  download,
  pen,
  color,
  arrow,
  rectangle,
  eclipse,
  eraser,
} from "../assets/index";

const arr = [download, pen, color, arrow, rectangle, eclipse, eraser];
const toolArr = [
  "download",
  "pen",
  "filler",
  "arrow",
  "rectangle",
  "ellipse",
  "eraser",
];

type ToolBarProps = {
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  filled: boolean;
  setFilled: React.Dispatch<React.SetStateAction<boolean>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  tool: string;
  setTool: React.Dispatch<React.SetStateAction<string>>;
};



const Toolbar = ({
  size,
  setSize,
  color,
  setColor,
  tool,
  setTool,
  filled,
  setFilled,
}: ToolBarProps) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number.parseInt(e.target.value));
  }

  return (
    <div className="content-box position-absolute top-center p-3 border rounded d-flex flex-column">
      <div className="d-flex w-100 justify-content-evenly">
        <input
          style={{
            background: color,
            outline: "none",
            padding: "0",
            height: "40px",
            width: "40px",
          }}
          type="color"
          className=" bg-transparent"
          value={color}
          onChange={handleColorChange}
        />
        {arr.map((val, i) => (
          <button
            style={{
              width: "44px",
              height: "40px",
              border:
                toolArr[i] === tool || (toolArr[i] === "filler" && filled)
                  ? "1px solid black"
                  : "",
            }}
            className="btn"
            key={i}
            onClick={() => {
              if (toolArr[i] === "filler") {
                setFilled(!filled);
              } else {
                setTool(toolArr[i]);
              }
            }}
          >
            <img src={val} alt="" className="h-100 w-100" />
          </button>
        ))}
      </div>
      <div className="w-100 d-flex justify-content-center">
        <input value={size} className="m-3 w-25" type="range" min={1} max={20} onChange={handleSizeChange} />
      </div>
    </div>
  );
};

export default Toolbar;
