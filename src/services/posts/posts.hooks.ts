import { options } from "@/services/posts/posts.query";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = (blogId: number) => useQuery(options.posts(blogId));

export const useGetPost = (blogId: number, postId: number) =>
  useQuery(options.post(blogId, postId));
