import { TPost } from "@/types/posts";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import "./editor.css";

interface PostReaderProps {
  post: TPost;
}

const PostReader = ({ post }: PostReaderProps) => {
  const html = generateHTML(JSON.parse(post.content), [
    StarterKit,
    Image,
    Link,
  ]);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-5 w-full justify-center py-5">
          <div className={"flex flex-col gap-2"}>
            <p
              className={
                "font-bold text-[36px] placeholder:text-primary-weak text-primary-strong"
              }
            >
              {post.title}
            </p>
            <div className={"w-[50px] h-2 shrink-0 bg-primary-strong"}></div>
          </div>
        </div>
        <hr className={"py-2"} />

        <div
          className={"flex-1 overflow-y-auto text-primary-strong "}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </>
  );
};

export default PostReader;
