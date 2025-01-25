import PageLayout from "@/layouts/PageLayout";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-center w-full h-screen">
      <PageLayout>{children}</PageLayout>
    </div>
  );
};

export default RootLayout;
