import Board from "@/components/Board";
import Sidebar from "@/components/Sidebar";
import { PropsWithChildren } from "react";

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <Sidebar />
      <div className="w-full h-full max-w-[1176px] py-5 pl-[108px] pr-6">
        <Board>{children}</Board>
      </div>
    </div>
  );
};

export default PageLayout;
