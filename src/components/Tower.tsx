import React from "react";
import { useBoard } from "../context/BoardContext";
import Disc from "./Disc";
import { ForbiddenIcon, ThumbUpIcon } from "./Icons";
import { AnimatePresence, motion } from "framer-motion";

export interface ITower {
  position: number;
}

const Tower = ({ position }: ITower) => {
  const { board, targetTower, isValidMove, originalPosition } = useBoard();

  const renderIcon = () => {
    if (originalPosition.fromTower === targetTower) return;

    if (isValidMove(position)) {
      /** Tell the user his move is authorise */
      return (
        <motion.span
          initial={{
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: -75,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            y: { duration: 0.6, repeat: Infinity, repeatType: "mirror", ease: "easeOut" },
          }}
          className='absolute thumb-icon'
        >
          <ThumbUpIcon className='fill-green-300 w-16 h-16 z-30 ' />
        </motion.span>
      );
    }

    /** Tell the user his move is not authorise */
    return (
      <motion.span
        initial={{
          y: -100,
          scale: 1,
          opacity: 0,
        }}
        animate={{
          scale: 1.2,
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          scale: { duration: 0.6, repeat: Infinity, repeatType: "mirror", ease: "easeOut" },
        }}
        className='absolute thumb-icon'
      >
        <ForbiddenIcon className='fill-red-500 w-16 h-16 z-30 ' />
      </motion.span>
    );
  };

  return (
    <div className='w-[25%] relative flex flex-col items-center' data-tower={position}>
      <AnimatePresence>{targetTower === position && renderIcon()}</AnimatePresence>
      <div className={`w-[100%] h-96  flex flex-col justify-end items-center relative`}>
        {board[position].map((value, index) => (
          <Disc value={value} key={value} position={position} isSelectable={index === 0} />
        ))}
        <span className='w-3 h-full bg-stone-600 block rounded-t-3xl border border-stone-700 self-center absolute'></span>
        <span className='w-full h-6 bg-stone-600 block rounded-3xl border border-stone-700 z-20'></span>
      </div>
    </div>
  );
};

export default Tower;
