import React from 'react';

type Props = {
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer bg-gradient-to-b from-white to-[#ffcc91] border-2 border-[#d38551] shadow-md rounded-xl h-[40px] my-5 px-10 outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
      autoFocus
    >
      {children}
    </button>
  );
};
