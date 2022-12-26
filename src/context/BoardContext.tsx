import { Context, createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

export type Tower = number[];

export interface BoardContext {
  board: Tower[];
  minimumMove: number;
  move: number;
  step: string;
  start: (quantity: number) => void;
  reset: () => void;
  updateBoard: (fromTower: number, toTower: number, value: number) => void;
  isValidMove: (position: number, value: number) => boolean;
}

const BoardContext = createContext({} as BoardContext);

export const useBoard = () => useContext(BoardContext);

export const STEP_START = "start";
export const STEP_PLAY = "play";
export const STEP_RESULT = "result";

export function BoardProvider({ children }: PropsWithChildren) {
  const [board, setBoard] = useState<Tower[]>([]);
  const [move, setMove] = useState(0);
  const [step, setStep] = useState(STEP_START);

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

  const start = (quantity: number) => {
    setBoard(() => [Array.from(Array(quantity).keys(), (i: number) => i + 1), [], []]);
    setStep(STEP_PLAY);
  };

  const reset = () => {
    setStep(STEP_START);
    setBoard([]);
    setMove(0);
  };

  const value = useMemo(
    () => ({ board, isValidMove, updateBoard, minimumMove, move, step, start, reset }),
    [board, step, move]
  );

  useEffect(() => {
    if (board.length > 0 && board[board.length - 1].length > 0 && step === STEP_PLAY) {
      const towers = board.slice(0, -1);

      if (towers.every((tower) => tower.length === 0)) {
        console.log(`
        **************************************************
        Win !! With ${move} moves out of ${minimumMove} !!
        **************************************************
        ~
        ~ Made by Fred ~
        ~ https://github.com/fred-lab/hanoi-tower ~
        ~
        ~ Like this project ? Buy me a coffee :)
        ~ https://www.buymeacoffee.com/fredlab ~
        ~ THX
        ~
        ~ See you Space Cowboy !
        ~
        **************************************************
        `);

        setTimeout(() => {
          setStep(() => STEP_RESULT);
        }, 500);
      }
    }
  }, [board]);

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}
