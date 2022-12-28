import React, { MouseEvent } from "react";
import { STEP_PLAY, STEP_RESULT, STEP_START, useBoard } from "../context/BoardContext";
import MoveCounter from "./MoveCounter";
import Result from "./Result";
import Start from "./Start";
import Tower from "./Tower";
import { AnimatePresence, motion } from "framer-motion";

const Desk = () => {
  const { board, step, reset } = useBoard();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    reset();
  };

  return (
    <div className='relative flex flex-col flex-1'>
      <AnimatePresence>
        {step === STEP_START && <Start />}
        {step === STEP_RESULT && <Result />}
      </AnimatePresence>
      <section className={`w-full flex justify-around items-center gap-20 flex-1 ${step !== STEP_PLAY && "blur-sm"}`}>
        {board.map((_, index: number) => (
          <Tower position={index} key={index} />
        ))}
      </section>
      <div className='flex justify-center items-center'>
        <MoveCounter />
        <motion.div
          whileHover={{
            scale: 1.1,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 6 }}
          onClick={onClick}
          title='Reset the game'
          className='w-40 h-8 border-2 cursor-pointer text-white font-medium text-xl border-rose-400 bg-indigo-400 flex justify-center items-center rounded-full'
        >
          Reset
        </motion.div>
      </div>
    </div>
  );
};

export default Desk;
