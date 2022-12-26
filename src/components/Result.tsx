import React, { MouseEvent } from "react";
import { useBoard } from "../context/BoardContext";
import Modal from "./Modal";

const Result = () => {
  const { move, minimumMove, reset } = useBoard();

  const restart = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    reset();
  };
  return (
    <Modal>
      <h2 className='text-5xl font-medium text-emerald-600 mb-8'>CONGRATULATIONS !</h2>
      <p className='text-3xl font-medium text-gray-500 mb-6'>
        You solved this 'Tower of Hanoi' puzzle in <span className='text-5xl'>{move}</span> moves !
      </p>
      <p className='text-xl font-medium text-gray-500 mb-6'>
        The minimal number of moves required to solve it was {minimumMove} moves !
      </p>
      <div
        title='Click to start a new game'
        onClick={restart}
        className='w-80 h-24 border-2 cursor-pointer text-white font-medium text-4xl border-emerald-600 bg-emerald-500 flex justify-center items-center rounded-full'
      >
        Play again
      </div>
    </Modal>
  );
};

export default Result;
