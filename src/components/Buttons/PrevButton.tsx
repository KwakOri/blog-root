"use client";

import SVGIcon from "@/components/SVGIcon";
import { useRouter } from "next/navigation";

const PrevButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <SVGIcon
        icon={"ArrowLeft"}
        className="opacity-100 hover:opacity-70 transition-all"
      />
    </button>
  );
};

export default PrevButton;
