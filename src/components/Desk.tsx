import React, { useCallback, useMemo, useState } from "react";
import { STEP_PLAY, STEP_RESULT, useBoard } from "../context/BoardContext";
import MoveCounter from "./MoveCounter";
import Start from "./Start";
import Tower from "./Tower";

const Desk = () => {
  const { board, step } = useBoard();

  const renderGame = () => {
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
              <MoveCounter />
            </>
          );
        case STEP_RESULT:
          break;

        default:
          return <Start />;
      }
    }
  };

  return <div className='relative flex flex-col flex-1'>{renderGame()}</div>;
};

export default Desk;
