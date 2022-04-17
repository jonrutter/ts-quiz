import React from 'react';

type Props = {
  onClick: () => void;
  ref?: React.RefObject<HTMLButtonElement>;
};

export const Button: React.FC<Props> = ({ onClick, ref, children }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer bg-gradient-to-b from-white to-[#ffcc91] border-2 border-[#d38551] shadow-md rounded-xl h-[40px] my-5 px-10 outline-none focus:ring-2 focus:ring-white"
      ref={ref}
      autoFocus
    >
      {children}
    </button>
  );
};
