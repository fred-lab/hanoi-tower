import React, { PropsWithChildren } from "react";

const Modal = ({ children }: PropsWithChildren) => {
  return (
    <div className='w-full flex-1 flex justify-center items-center'>
      <div className='w-[50%] h-[50%] flex flex-col justify-center items-center opacity-90 bg-gray-100 rounded-3xl p-16'>
        {children}
      </div>
    </div>
  );
};

export default Modal;
