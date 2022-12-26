import { Context, createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

export type Tower = number[];

const initialState: Tower[] = [[1, 2, 3, 4, 5, 6, 7, 8], [], []];

export interface BoardContext {
  board: Tower[];
  updateBoard: (fromTower: number, toTower: number, value: number) => void;
  isValidMove: (position: number, value: number) => boolean;
  minimumMove: number;
  move: number;
}

const BoardContext = createContext({} as BoardContext);

export const useBoard = () => useContext(BoardContext);

export function BoardProvider({ children }: PropsWithChildren) {
  const [board, setBoard] = useState<Tower[]>(initialState);
  const [move, setMove] = useState(0);

  const isValidMove = (position: number, value: number) => {
    if (board[position].length === 0 || value < board[position][0]) {
      return true;
    }
    return false;
  };

  const updateBoard = (fromTower: number, toTower: number, value: number) => {
    if (isValidMove(toTower, value) && fromTower !== toTower) {
      setMove((currentMove) => currentMove + 1);
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

  const minimumMove = useMemo(() => {
    return Math.pow(2, 3) - 1;
  }, [board]);

  const value = useMemo(() => ({ board, isValidMove, updateBoard, minimumMove, move }), [board]);

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
