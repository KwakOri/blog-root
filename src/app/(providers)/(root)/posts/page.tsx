"use client";

import IndexBar from "@/components/IndexBar";
import ListItem from "@/components/ListItem";
import { useGetPosts } from "@/services/posts/posts.hooks";
import { TPost } from "@/types/posts";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const PostsPage = () => {
  const [blogId, setBlogId] = useState(0);
  const { data: posts, isPending } = useGetPosts(blogId);
  console.log(posts);
  return (
    <div className={"flex flex-col gap-3 w-full overflow-y-scroll p-4"}>
      <IndexBar index1="std" index2="std" index3="std" index4="std" />
      {!isPending &&
        posts.map((post: TPost) => {
          const createdAt = new Date(post.createdAt);
          const formattedDate = dayjs(createdAt).format("YYYY-MM-DD");

          return (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <ListItem
                index1={post.title}
                index3={post.blogs.name}
                index2={post.categories.name}
                index4={formattedDate}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default PostsPage;
