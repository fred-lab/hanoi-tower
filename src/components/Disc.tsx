import React, { DragEvent } from "react";
export interface IDisc {
  value: number;
  position: number;
  isSelectable?: boolean;
}

const Disc = ({ value, position, isSelectable }: IDisc) => {
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    // Pass the current tower and the value to the Drag Event
    e.dataTransfer?.setData("value", value.toString());
    e.dataTransfer?.setData("fromTower", position.toString());
  };

  return (
    <div
      draggable={isSelectable}
      onDragStart={onDragStart}
      className={`h-8 w-20 bg-yellow-400 rounded-3xl flex justify-center align-middle z-10 ${
        isSelectable && "cursor-pointer"
      }`}
    >
      {value}
    </div>
  );
};

export default Disc;
