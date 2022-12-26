import React, { DragEvent } from "react";
export interface IDisc {
  value: number;
  position: number;
  isSelectable?: boolean;
}

const Disc = ({ value, position, isSelectable }: IDisc) => {
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-orange-400",
    "bg-pink-400",
    "bg-cyan-400",
    "bg-purple-400",
    "bg-slate-400",
  ];

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    // Pass the current tower and the value to the Drag Event
    e.dataTransfer?.setData("value", value.toString());
    e.dataTransfer?.setData("fromTower", position.toString());
  };

  return (
    <div
      draggable={isSelectable}
      onDragStart={onDragStart}
      style={{
        width: "100%",
        maxWidth: `${(value + 1) * 3}rem`,
        pointerEvents: isSelectable ? "auto" : "none",
      }}
      className={`h-7 ${colors[value - 1]} border border-gray-500 rounded-3xl flex justify-center align-middle z-10 ${
        isSelectable && "cursor-pointer"
      }`}
    >
      {value}
    </div>
  );
};

export default Disc;
