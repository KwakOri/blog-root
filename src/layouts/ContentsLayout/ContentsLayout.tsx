import Board from "@/components/Board";
import Sidebar from "@/components/Sidebar";

import { PropsWithChildren } from "react";

const ContentsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-start gap-7 w-full max-w-[1176px] pl-[108px] pr-6">
      <Sidebar />
      <Board>{children}</Board>
    </div>
  );
};

export default ContentsLayout;
