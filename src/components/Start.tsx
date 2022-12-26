import React, { MouseEvent, useState } from "react";
import { useBoard } from "../context/BoardContext";

const Start = () => {
  const [value, setValue] = useState(3);
  const { start } = useBoard();

  const onSubmit = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    start(value);
  };

  return (
    <div className='w-full flex-1 flex justify-center items-center'>
      <div className='w-[50%] h-[50%] flex flex-col justify-center items-center opacity-90 bg-gray-100 rounded-3xl p-16'>
        <label className='text-4xl font-medium text-gray-500' htmlFor='disc'>
          Select the number of disk : {value}
        </label>
        <input
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          type='range'
          name='dics'
          id='disc'
          min='3'
          max='8'
          className='w-[30rem] h-24'
        />
        <div
          title={`Click to start a new game with ${value} disks`}
          onClick={onSubmit}
          className='w-80 h-24 border-2 cursor-pointer text-white font-medium text-4xl border-emerald-600 bg-emerald-500 flex justify-center items-center rounded-full'
        >
          Start
        </div>
      </div>
    </div>
  );
};

export default Start;
