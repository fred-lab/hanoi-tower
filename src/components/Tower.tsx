import React, { useState } from "react";
import Disc, { IDisc } from "./Disc";

export interface ITower {
  discs: IDisc[];
}

const Tower = ({ discs }: ITower) => {
  return (
    <section className='w-96 h-96 bg-cyan-200 flex flex-col justify-end items-center relative'>
      {discs.map(({ id, size, isSelectable }, index) => (
        <Disc key={id} id={id} size={size} isSelectable={index === 0} />
      ))}
      <span className='w-3 h-full bg-gray-700 block rounded-t-3xl self-center absolute'></span>
      <span className='w-full h-6 bg-gray-700 block rounded-3xl'></span>
    </section>
  );
};

export default Tower;
