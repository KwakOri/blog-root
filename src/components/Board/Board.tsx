import { PropsWithChildren } from "react";

const Board = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-paper-weak rounded-2xl w-full h-full flex">
      {children}
    </div>
  );
};

export default Board;
