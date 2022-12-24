import React, { useCallback, useMemo, useState } from "react";
import { IDisc } from "./Disc";
import Tower from "./Tower";

const Desk = ({ towers = 3 }) => {
  const [discs, setDiscs] = useState<IDisc[]>([
    { id: 1, size: 10 },
    { id: 2, size: 20 },
    { id: 3, size: 30 },
    { id: 4, size: 40 },
    { id: 5, size: 50 },
    { id: 6, size: 60 },
  ]);

  return (
    <section className='h-full w-full flex justify-center items-center gap-20'>
      <Tower discs={discs} />
      {[...Array(towers - 1)].map((_, idx) => (
        <Tower key={idx} discs={[]} />
      ))}
    </section>
  );
};

export default Desk;
