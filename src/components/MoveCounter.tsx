import React from "react";
import { useBoard } from "../context/BoardContext";

const MoveCounter = () => {
  const { minimumMove, move } = useBoard();
  return (
    <div className='flex justify-center items-center h-10 text-blue-100 m-4'>
      <p className='text-4xl tracking-wider  bg-green-600 p-2 pl-8 pr-8 m-4 rounded-full block'>
        Moves : <span className='text-4xl'>{move}</span> /<span className='text-3xl pl-2'>{minimumMove}</span>
      </p>
    </div>
  );
};

export default MoveCounter;
