import { Context, createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

export type Tower = number[];

export interface BoardContext {
  board: Tower[];
  minimumMove: number;
  move: number;
  step: string;
  start: (quantity: number) => void;
  reset: () => void;
  updateBoard: (newPosition: number) => void;
  isValidMove: (position: number) => boolean;
  getOriginalPosition: (tower: number, disk: number) => void;
  originalPosition: DiskPosition;
  targetTower: number;
  setTargetTower: React.Dispatch<React.SetStateAction<number>>;
}

export interface DiskPosition {
  fromTower: number;
  disk: number;
}

const BoardContext = createContext({} as BoardContext);

export const useBoard = () => useContext(BoardContext);

export const STEP_START = "start";
export const STEP_PLAY = "play";
export const STEP_RESULT = "result";

export function BoardProvider({ children }: PropsWithChildren) {
  const [board, setBoard] = useState<Tower[]>([]);
  const [move, setMove] = useState(0);
  const [step, setStep] = useState<"start" | "play" | "result">(STEP_START);
  const [originalPosition, setOriginalPosition] = useState<DiskPosition>({
    fromTower: 0,
    disk: 1,
  });
  const [targetTower, setTargetTower] = useState(-1);

  /**
   * Get the original position from where the move start
   */
  const getOriginalPosition = (fromTower: number, disk: number) => {
    setOriginalPosition({
      fromTower,
      disk,
    });
  };

  /**
   * Check if the move is authorized
   */
  const isValidMove = (toTowerId: number) => {
    if (board[toTowerId].length === 0 || originalPosition.disk < board[toTowerId][0]) {
      return true;
    }
    return false;
  };

  /**
   * Update the game with the new position of the dragged disk
   */
  const updateBoard = (newPosition: number) => {
    const { fromTower, disk } = originalPosition;
    if (isValidMove(newPosition) && fromTower !== newPosition) {
      setMove((currentMove) => currentMove + 1);
      setTargetTower(-1);
      setBoard((currentBoard) =>
        currentBoard.map((tower, index) => {
          // remove the selected disc from the original tower
          if (fromTower === index) {
            const [selectedDisc, ...discs] = tower;
            return discs;
          }

          // add the selected dis to the destination tower
          if (newPosition === index) {
            return [disk, ...tower];
          }
          return tower;
        })
      );
    }
  };

  /**
   * Get the minimum moves to resolve this game
   */
  const minimumMove = useMemo(() => {
    return Math.pow(2, 3) - 1;
  }, [board]);

  /**
   * On Start, define a new board with a 'quantity' of disks
   */
  const start = (quantity: number) => {
    setBoard(() => [Array.from(Array(quantity).keys(), (i: number) => i + 1), [], []]);
    setStep(STEP_PLAY);
  };

  /**
   * Reset the game
   */
  const reset = () => {
    setStep(STEP_START);
    setBoard([]);
    setMove(0);
  };

  const value = useMemo(
    () => ({
      board,
      isValidMove,
      updateBoard,
      minimumMove,
      move,
      step,
      start,
      reset,
      getOriginalPosition,
      originalPosition,
      targetTower,
      setTargetTower,
    }),
    [board, step, move, originalPosition, targetTower]
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
