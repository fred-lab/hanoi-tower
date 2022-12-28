import React, { PropsWithChildren } from "react";
import { motion } from "framer-motion";

const Modal = ({ children }: PropsWithChildren) => {
  return (
    <div className='w-full flex-1 flex justify-center items-center absolute top-[25%] z-50'>
      <motion.div
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: "-100vw" }}
        transition={{ type: "tween" }}
        className='w-[50%] h-[50%] flex flex-col justify-center items-center opacity-90 bg-gray-100 rounded-3xl p-16'
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
