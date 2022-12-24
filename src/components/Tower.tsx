import React, { DragEvent, useEffect, useRef, useState } from "react";
import { useBoard } from "../context/BoardContext";
import Disc from "./Disc";

export interface ITower {
  position: number;
}

const Tower = ({ position }: ITower) => {
  const { board, isValidMove, updateBoard } = useBoard();
  const towerRef = useRef<HTMLDivElement>(null);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Get the original Tower position and the value from the Drag Event
    const value = Number(e.dataTransfer.getData("value"));
    const fromTower = Number(e.dataTransfer.getData("fromTower"));

    updateBoard(fromTower, position, value);
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const value = Number(e.dataTransfer.getData("value"));
    console.log(position, isValidMove(position, value));
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className='w-96 h-96 bg-cyan-200 flex flex-col justify-end items-center relative'
      ref={towerRef}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {board[position].map((value, index) => (
        <Disc value={value} key={value} position={position} isSelectable={index === 0} />
      ))}
      <span className='w-3 h-full bg-gray-700 block rounded-t-3xl self-center absolute'></span>
      <span className='w-full h-6 bg-gray-700 block rounded-3xl'></span>
    </div>
  );
};

export default Tower;
