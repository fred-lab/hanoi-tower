import React, { useCallback, useMemo, useState } from "react";
import { useBoard } from "../context/BoardContext";
import { IDisc } from "./Disc";
import Tower from "./Tower";

const Desk = ({ towers = 3 }) => {
  const { board } = useBoard();

  return (
    <section className='h-full w-full flex justify-center items-center gap-20'>
      {board.map((_, index: number) => (
        <Tower position={index} key={index} />
      ))}
    </section>
  );
};

export default Desk;
