import PrevButton from "@/components/Buttons/PrevButton";
import PostReader from "@/components/Editor/PostReader";
import { client } from "@/services/index.service";

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const postId = (await params).postId;
  const { data: post } = await client.get(`/posts/${postId}`);

  return (
    <div className={"w-full h-full p-4"}>
      <PrevButton />
      <PostReader post={post} />
    </div>
  );
};

export default PostDetailPage;
