import React, { useState, useRef, useEffect, Key, useContext } from "react";
import { Stage, Layer, Line, Text, Rect, Ellipse, Arrow } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { addComponent, removeComponent } from "../Redux/BoardSlice";
import { UserContext } from "../Contexts/UserConfigContext";
import { SocketContext } from "../Contexts/SocketContext";

interface LineInterface {
  updater?: boolean;
  points: Array<number>;
  color: string;
  tool: string;
  filled: boolean;
}

interface DrawingBoardProps {
  roomId: string | undefined;
  color: string;
  filled: boolean;
  tool: string;
}

const DrawingBoard = ({ color, tool, filled, roomId }: DrawingBoardProps) => {
  const userContext = useContext(UserContext);
  const { username } = userContext;
  const { ws, updater } = useContext(SocketContext);
  const dispatch = useDispatch();
  const [line, setLine] = useState<LineInterface>({
    color: color,
    points: [],
    tool: tool,
    filled: filled,
  });
  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);
  const boardData = useSelector((state: RootState) => state.boardData);
  const { metaData } = boardData;
  const shapeRef = useRef([]);
  const [updaterOn, setUpdateOn] = useState(false);

  useEffect(() => {
    if (updaterOn) {
      return;
    }
    setUpdateOn(true);
    setInterval(() => {
      dispatch({
        type: `${removeComponent}`,
        payload: {},
      });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLine({ ...line, updater: updater });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updater]);

  useEffect(() => {
    if (color) {
      setLine({ ...line, color });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    if (tool) {
      setLine({ ...line, tool });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool]);

  useEffect(() => {
    shapeRef.current = getDataInArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardData]);

  const getDataInArray = () => {
    var arr: any = [];
    Object.keys(metaData).forEach((key) => (arr = arr.concat(metaData[key])));
    return arr;
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setLine({ ...line, points: [pos.x, pos.y], filled });
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (point) {
      if (line.tool === "pen" || line.tool === "eraser") {
        setLine({ ...line, points: [...line.points, point.x, point.y] });
      } else {
        const newPoints = [...line.points.slice(0, 2), point.x, point.y];
        setLine({ ...line, points: newPoints });
      }
    }
  };

  const handleMouseUp = () => {
    dispatch({
      type: `${addComponent}`,
      payload: {
        username: username,
        data: line,
      },
    });
    ws?.emit("add-component", { username, data: line, roomId });
    setTimeout(() => {
      setLine({ ...line, points: [] });
    }, 500);
    isDrawing.current = false;
  };

  const handleDblClick = (e: KonvaEventObject<MouseEvent>) => {
    const pos = stageRef.current?.getPointerPosition();
    const text = prompt("Enter your text:");
    if (text) {
      ws?.emit("add-component", {
        roomId,
        username: username,
        data: {
          type: "text",
          text: text,
          x: pos.x,
          y: pos.y,
        },
      });
      dispatch({
        type: `${addComponent}`,
        payload: {
          username: username,
          data: {
            type: "text",
            text: text,
            x: pos.x,
            y: pos.y,
          },
        },
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      undoLastElement();
    }
  };

  const undoLastElement = () => {
    ws?.emit("remove-last-element", { username: username, roomId });
    dispatch({
      type: `${removeComponent}`,
      payload: {
        username: username,
      },
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line]);

  const drawShape = (data: any, index: Key) => {
    switch (data.tool) {
      case "pen":
        return (
          <Line
            key={index}
            points={data.points}
            stroke={data.color}
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        );
      case "eraser":
        return (
          <Line
            key={index}
            points={data.points}
            stroke={"#ffffff"}
            strokeWidth={30}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        );
      case "rectangle":
        return !data.filled ? (
          <Rect
            key={index}
            x={data.points[0]}
            y={data.points[1]}
            width={data.points[2] - data.points[0]}
            height={data.points[3] - data.points[1]}
            stroke={data.color}
            strokeWidth={2}
          />
        ) : (
          <Rect
            key={index}
            x={data.points[0]}
            y={data.points[1]}
            width={data.points[2] - data.points[0]}
            height={data.points[3] - data.points[1]}
            fill={data.color}
          />
        );
      case "ellipse":
        return !data.filled ? (
          <Ellipse
            key={index}
            x={(data.points[0] + data.points[2]) / 2}
            y={(data.points[1] + data.points[3]) / 2}
            radiusX={Math.abs(data.points[2] - data.points[0]) / 2}
            radiusY={Math.abs(data.points[3] - data.points[1]) / 2}
            stroke={data.color}
            strokeWidth={2}
          />
        ) : (
          <Ellipse
            key={index}
            x={(data.points[0] + data.points[2]) / 2}
            y={(data.points[1] + data.points[3]) / 2}
            radiusX={Math.abs(data.points[2] - data.points[0]) / 2}
            radiusY={Math.abs(data.points[3] - data.points[1]) / 2}
            fill={data.color}
          />
        );
      case "arrow":
        return (
          <Arrow
            key={index}
            points={data.points}
            stroke={data.color}
            strokeWidth={2}
            fill={data.color}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (tool === "download") {
      downloadImage()
    }
  },[tool])

  const downloadImage = () => {
    if (stageRef.current) {
      const stage = stageRef.current;
      const dataURL = stage.toDataURL({
        mimeType: 'image/png',
        quality: 1,
      });

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'konva-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Stage
      width={document.body.clientWidth}
      height={document.body.clientHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDblClick={handleDblClick}
      ref={stageRef}
      className="stage-class"
    >
      <Layer>
        {shapeRef.current.map((data: any, index: Key) => {
          if (data.type === "text") {
            return (
              <Text
                key={index}
                text={data.text}
                x={data.x}
                y={data.y}
                fontSize={20}
                draggable
              />
            );
          } else {
            return drawShape(data, index);
          }
        })}
        {drawShape(line, 0)}
      </Layer>
    </Stage>
  );
};

export default DrawingBoard;
