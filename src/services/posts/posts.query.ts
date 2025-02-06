import { getPost, getPosts } from "@/services/posts/posts.service";

export const postQueryKeys = {
  all: ["posts"] as const,
  posts: (blogId: number) => [...postQueryKeys.all, "blog", blogId] as const,
  post: (postId: number) => [...postQueryKeys.all, "post", postId] as const,
};

export const options = {
  posts: (blogId: number) => {
    return {
      queryKey: postQueryKeys.posts(blogId),
      queryFn: () => getPosts(blogId),
    };
  },
  post: (postId: number) => ({
    queryKey: postQueryKeys.post(postId),
    queryFn: () => getPost(postId),
  }),
};
