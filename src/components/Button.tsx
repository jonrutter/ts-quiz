import React from 'react';

type Props = {
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer bg-gradient-to-b from-white to-[#ffcc91] border-2 border-[#d38551] shadow-md rounded-xl h-[40px] my-5 px-10"
    >
      {children}
    </button>
  );
};
