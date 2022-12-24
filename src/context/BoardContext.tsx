import { Context, createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

export type Tower = number[];

const initialState: Tower[] = [[1, 2, 3], [], []];

export interface BoardContext {
  board: Tower[];
  updateBoard: (fromTower: number, toTower: number, value: number) => void;
  isValidMove: (position: number, value: number) => boolean;
}

const BoardContext = createContext({} as BoardContext);

export const useBoard = () => useContext(BoardContext);

export function BoardProvider({ children }: PropsWithChildren) {
  const [board, setBoard] = useState<Tower[]>(initialState);

  const isValidMove = (position: number, value: number) => {
    if (board[position].length === 0 || value < board[position][0]) {
      return true;
    }
    return false;
  };

  const updateBoard = (fromTower: number, toTower: number, value: number) => {
    if (isValidMove(toTower, value) && fromTower !== toTower) {
      setBoard((currentBoard) =>
        currentBoard.map((tower, index) => {
          // remove the selected disc from the original tower
          if (fromTower === index) {
            const [selectedDisc, ...discs] = tower;
            return discs;
          }

          // add the selected dis to the destination tower
          if (toTower === index) {
            return [value, ...tower];
          }
          return tower;
        })
      );
    }
  };

  const value = useMemo(() => ({ board, isValidMove, updateBoard }), [board]);

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
