import React, { MouseEvent, useCallback, useMemo, useState } from "react";
import { STEP_PLAY, STEP_RESULT, useBoard } from "../context/BoardContext";
import MoveCounter from "./MoveCounter";
import Result from "./Result";
import Start from "./Start";
import Tower from "./Tower";

const Desk = () => {
  const { board, step, reset, move } = useBoard();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    reset();
  };
  const renderGame = useCallback(() => {
    {
      switch (step) {
        case STEP_PLAY:
          return (
            <>
              <section className='w-full flex justify-around items-center gap-20 flex-1'>
                {board.map((_, index: number) => (
                  <Tower position={index} key={index} />
                ))}
              </section>
              <div className='flex justify-center items-center'>
                <MoveCounter />
                <div
                  onClick={onClick}
                  title='Reset the game'
                  className='w-40 h-8 border-2 cursor-pointer text-white font-medium text-xl border-rose-400 bg-indigo-400 flex justify-center items-center rounded-full'
                >
                  Reset
                </div>
              </div>
            </>
          );
        case STEP_RESULT:
          return <Result />;
        default:
          return <Start />;
      }
    }
  }, [step]);

  return <div className='relative flex flex-col flex-1'>{renderGame()}</div>;
};

export default Desk;
