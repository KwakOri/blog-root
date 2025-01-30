import QueryProvider from "@/app/(providers)/_components/QueryProvider";
import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default layout;
