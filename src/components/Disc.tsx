import React, { useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { useBoard } from "../context/BoardContext";
export interface IDisc {
  value: number;
  position: number;
  isSelectable?: boolean;
}

const Disc = ({ value, position, isSelectable }: IDisc) => {
  const { board, getOriginalPosition, updateBoard, setTargetTower } = useBoard();
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-orange-400",
    "bg-pink-400",
    "bg-cyan-400",
    "bg-purple-400",
    "bg-slate-400",
  ];

  /**
   * Get the tower's id by the current position of the dragged disk
   */
  const getTowerIdByPosition = (x: number, y: number): number => {
    const tower = getTowerElementByPosition(x, y);

    if (tower === undefined) return -1;

    return Number(tower.dataset.tower);
  };

  /**
   * Get the tower's html element by the current position of the dragged disk
   */
  const getTowerElementByPosition = (x: number, y: number): HTMLElement => {
    const elements = document.elementsFromPoint(x, y);
    return elements.filter((element) => element.hasAttribute("data-tower"))[0] as HTMLElement;
  };

  /**
   * On drag start, get the original position of the dragged disk
   */
  const onDragStart = (e: globalThis.PointerEvent | globalThis.MouseEvent | TouchEvent) => {
    getOriginalPosition(position, value);
  };

  /**
   * On drag, get the current position of the dragged disk and define the target tower
   */
  const onDragOver = (event: PointerEvent | globalThis.MouseEvent | TouchEvent, info: PanInfo) => {
    const { x, y } = info.point;
    const tower = getTowerElementByPosition(x, y);

    if (tower) {
      const toTowerId = Number(tower.dataset.tower);
      setTargetTower(toTowerId);
    }
  };

  /**
   * On drop, get the destination's tower
   */
  const onDragEnd = (e: PointerEvent | globalThis.MouseEvent | TouchEvent, info: PanInfo) => {
    try {
      const { x, y } = info.point;
      const towerId = getTowerIdByPosition(x, y);

      if (towerId >= 0) {
        updateBoard(towerId);
      }
      setTargetTower(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{
        y: value * -400,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: (board[0].length - value) * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      whileTap={{
        rotate: "-15DEG",
      }}
      drag
      dragSnapToOrigin={true}
      dragTransition={{ bounceStiffness: 120, bounceDamping: 15 }}
      onDrag={onDragOver}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{
        width: "100%",
        maxWidth: `${(value + 1) * 3}rem`,
        pointerEvents: isSelectable ? "auto" : "none",
      }}
      className={`h-7 ${colors[value - 1]} border border-gray-500 rounded-3xl flex justify-center align-middle z-10 ${
        isSelectable && "cursor-pointer"
      }`}
    >
      {value}
    </motion.div>
  );
};

export default Disc;
