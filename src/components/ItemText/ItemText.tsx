import { PropsWithChildren } from "react";

const ItemText = ({ children }: PropsWithChildren) => {
  return (
    <p
      className={"text-center font-semibold text-primary-strong w-full text-sm"}
    >
      {children}
    </p>
  );
};

export default ItemText;
