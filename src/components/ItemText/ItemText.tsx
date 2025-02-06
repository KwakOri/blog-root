import { PropsWithChildren } from "react";

const ItemText = ({ children }: PropsWithChildren) => {
  return (
    <p
      className={
        "text-center font-semibold text-primary-strong  text-sm truncate"
      }
    >
      {children}
    </p>
  );
};

export default ItemText;
