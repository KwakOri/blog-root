"use client";

import SVGIcon from "@/components/SVGIcon";
import Link from "next/link";

interface EditButton {
  postId: string;
}

const EditButton = ({ postId }: EditButton) => {
  return (
    <Link href={`/posts/${postId}/edit`}>
      <SVGIcon
        icon={"Edit"}
        className="opacity-100 hover:opacity-70 transition-all"
      />
    </Link>
  );
};

export default EditButton;
