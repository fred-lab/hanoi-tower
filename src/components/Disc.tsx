import React from "react";
export interface IDisc {
  id: number;
  size: number;
  isSelectable?: boolean;
}

const Disc = ({ id, size, isSelectable = false }: IDisc) => {
  return (
    <div
      className={`h-8 w-20 bg-yellow-400 rounded-3xl flex justify-center align-middle z-10 ${
        isSelectable && "cursor-pointer"
      }`}
    >
      {id}
    </div>
  );
};

export default Disc;
