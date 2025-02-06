"use client";

import Editor from "@/components/Editor";
import { useGetPost } from "@/services/posts/posts.hooks";
import { usePathname } from "next/navigation";

const PostEditPage = () => {
  const pathname = usePathname();
  const postId = pathname.split("/")[2];
  const { data: post, isPending: isPostPending } = useGetPost(Number(postId));

  return (
    <div className={"w-full h-full p-4 flex flex-col"}>
      <Editor />
    </div>
  );
};

export default PostEditPage;
