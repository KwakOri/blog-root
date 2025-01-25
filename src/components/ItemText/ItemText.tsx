import { PropsWithChildren } from "react";

const ItemText = ({ children }: PropsWithChildren) => {
  return (
    <p className={"text-center font-semibold grow text-primary-strong "}>
      {children}
    </p>
  );
};

export default ItemText;
