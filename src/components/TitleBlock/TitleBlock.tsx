import { PropsWithChildren } from "react";

const TitleBlock = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center mx-8">
      <h1 className="text-[48px] font-extrabold">{children}</h1>
    </div>
  );
};

export default TitleBlock;
