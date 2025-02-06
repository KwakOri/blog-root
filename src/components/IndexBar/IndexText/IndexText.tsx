import { PropsWithChildren } from "react";

const IndexText = ({ children }: PropsWithChildren) => {
  return (
    <p className={"text-center font-semibold text-primary-strong w-full"}>
      {children}
    </p>
  );
};

export default IndexText;
