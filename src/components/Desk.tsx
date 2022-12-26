import React, { useCallback, useMemo, useState } from "react";
import { useBoard } from "../context/BoardContext";
import MoveCounter from "./MoveCounter";
import Tower from "./Tower";

const Desk = () => {
  const { board } = useBoard();

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
};

export default Desk;
