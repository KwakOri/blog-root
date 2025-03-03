"use client";

import { publicUrlPrefix } from "@/constants/constant";
import { useGetAllCategories } from "@/services/categories/categories.hooks";
import { uploadImages, uploadPost } from "@/services/posts/posts.service";
import { TPost } from "@/types/posts";
import { useMutation } from "@tanstack/react-query";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Editor, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./editor.css";

export interface TCategory {
  id: number;
  blogId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface TCategories {
  blogId: number;
  blogName: string;
  categories: TCategory[];
}

interface TBlogEditor {
  post?: TPost;
}

const BlogEditor = ({ post }: TBlogEditor) => {
  const initialData: {
    imageIds: number[];
    content: JSONContent;
    title: string;
    blogId: number;
    categoryId: number;
  } = !post
    ? {
        imageIds: [],
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
            },
          ],
        },
        title: "",
        blogId: 0,
        categoryId: 0,
      }
    : {
        imageIds: post?.imageIds.split(",").map((id) => parseInt(id)),
        content: JSON.parse(post?.content),
        title: post?.title,
        blogId: post?.blogId,
        categoryId: post?.categoryId,
      };

  const [initialImageIds, setInitialImageIds] = useState<number[]>(
    initialData.imageIds
  );
  const [imageFiles, setImageFiles] = useState<{ image: File; id: string }[]>(
    []
  );
  const [postTitle, setPostTitle] = useState<string>(initialData.title);
  const [selectedBlog, setSelectedBlog] = useState<number>(initialData.blogId);
  const [selectedCategory, setSelectedCategory] = useState<number>(
    initialData.categoryId
  );
  const router = useRouter();

  const { data: categoriesData, isPending: isCategoriesPending } =
    useGetAllCategories();

  const { mutate: uploadPostMutation, isPending: isUploadingPost } =
    useMutation({
      mutationFn: (json: JSONContent) => onSave(json),
      onSuccess: (data) => {
        const id = data.data.id;
        console.log("Upload Result =>", data);
        alert("저장이 완료되었습니다.");
        router.replace(`/posts/${id}`);
      },
      onError: () => {
        alert("저장에 실패했습니다.");
      },
    });

  const onPostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const changeSrcToPublicUrl = (node: JSONContent) => {
    if (node.type === "image" && node.attrs?.title) {
      const id = node.attrs?.title;
      node.attrs.src = `${publicUrlPrefix}${id}`;
    }
    if (node.content) {
      node.content.map((child: JSONContent) => {
        return changeSrcToPublicUrl(child);
      });
    }

    return node;
  };

  const onSave = async (json: JSONContent) => {
    const imageResponse = await uploadImages(imageFiles);
    console.log("Image Upload Result =>", imageResponse);

    const body = {
      title: postTitle,
      content: JSON.stringify(changeSrcToPublicUrl(json)),
      blogId: selectedBlog,
      categoryId: selectedCategory,
      isPublished: true,
      imageIds: imageFiles.map((image) => image.id).join(""),
    };
    return await uploadPost(body);
  };

  const handleSavePost = (json: JSONContent) => {
    if (selectedBlog === 0) return alert("블로그를 선택해주세요.");
    if (selectedCategory === 0) return alert("카테고리를 선택해주세요.");
    if (postTitle === "") return alert("제목을 입력해주세요.");
    if (json?.content?.length === 0) return alert("내용을 입력해주세요.");
    uploadPostMutation(json);
  };

  const addImages = (currentEditor: Editor, files: File[]) => {
    const addedFiles = files.map((file: File) => ({
      image: file,
      id: uuidv4(),
    }));

    addedFiles.forEach((addedFile) => {
      insertImage(currentEditor, addedFile.image, addedFile.id);
    });
  };

  const insertImage = (currentEditor: Editor, file: File, fileName: string) => {
    const previewUrl = URL.createObjectURL(file);
    setImageFiles((prev) => [...prev, { image: file, id: fileName }]);
    currentEditor
      .chain()
      .insertContentAt(currentEditor.state.selection.anchor, {
        type: "image",
        attrs: {
          src: previewUrl,
          title: fileName,
        },
      })
      .focus()
      .run();
  };
  const extractImageIds = (node: JSONContent): string[] => {
    const imageIds: string[] = [];

    if (node.type === "image" && node.attrs?.title) {
      imageIds.push(node.attrs.title);
    }

    if (node.content) {
      node.content.forEach((child: JSONContent) => {
        imageIds.push(...extractImageIds(child));
      });
    }
    return imageIds;
  };
  const onImageDrop = (currentEditor: Editor, files: File[]) => {
    addImages(currentEditor, files);
  };
  const onImagePaste = (
    currentEditor: Editor,
    files: File[],
    htmlContent: string | undefined
  ) => {
    if (htmlContent) {
      return false;
    }
    addImages(currentEditor, files);
  };
  const onEditorUpdate = ({ editor }: { editor: Editor }) => {
    console.log("Updated!");
    console.log(imageFiles);
    const json = editor.getJSON();
    const foundImageIds = extractImageIds(json);
    const imageIds = imageFiles.map((imageFile) => imageFile.id);

    const removedImageIds = imageIds.filter(
      (imageId) => !foundImageIds.includes(imageId)
    );

    const addedImageIds = foundImageIds.filter((id) => !imageIds.includes(id));

    console.log("ADDED IMAGE IDS =>", addedImageIds);
    console.log("REMOVED IMAGE IDS =>", removedImageIds);

    if (removedImageIds.length > 0 || addedImageIds.length > 0) {
      setImageFiles((prev) =>
        prev.filter((image) => foundImageIds.includes(image.id))
      );
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: "h-full focus:outline-none",
      },
    },
    extensions: [
      StarterKit,
      Image,
      Link,
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: onImageDrop,
        onPaste: onImagePaste,
      }),
    ],
    content: initialData.content,
    onUpdate: onEditorUpdate,
  });

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-5 w-full justify-center py-5">
          <div className={"flex flex-col gap-2"}>
            <input
              type="text"
              placeholder={"제목을 입력하세요"}
              value={postTitle}
              onChange={onPostTitleChange}
              className={
                "focus:outline-none font-bold text-[36px] placeholder:text-primary-weak text-primary-strong"
              }
            />
            <div className={"w-[50px] h-2 shrink-0 bg-primary-strong"}></div>
          </div>
          {isCategoriesPending ? (
            <div className={"flex gap-4"}>
              <div className={"px-4 py-1.5 rounded bg-primary-strong"}>
                <select
                  className={
                    "text-primary-white focus:outline-none font-bold bg-primary-strong"
                  }
                  onChange={(e) => {
                    setSelectedBlog(Number(e.target.value));
                  }}
                >
                  <option value={0}>불러오는 중</option>
                </select>
              </div>

              <div className={"px-4 py-1.5 rounded bg-primary-strong"}>
                <select
                  className={
                    "text-primary-white focus:outline-none font-bold bg-primary-strong"
                  }
                  onChange={(e) => {
                    setSelectedCategory(Number(e.target.value));
                  }}
                >
                  <option value={0}>불러오는 중</option>
                </select>
              </div>
            </div>
          ) : (
            <div className={"flex gap-4"}>
              <div className={"px-4 py-1.5 rounded bg-primary-strong"}>
                <select
                  className={
                    "text-primary-white focus:outline-none font-bold bg-primary-strong"
                  }
                  onChange={(e) => {
                    setSelectedBlog(Number(e.target.value));
                  }}
                >
                  {categoriesData?.map((blog) => (
                    <option value={blog.blogId} key={blog.blogId}>
                      {blog.blogName}
                    </option>
                  ))}
                </select>
              </div>

              <div className={"px-4 py-1.5 rounded bg-primary-strong"}>
                <select
                  className={
                    "text-primary-white focus:outline-none font-bold bg-primary-strong"
                  }
                  onChange={(e) => {
                    setSelectedCategory(Number(e.target.value));
                  }}
                >
                  {categoriesData
                    ?.find(({ blogId }) => selectedBlog === blogId)
                    ?.categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  <option value={0}>선택 없음</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <hr className={"py-2"} />

        <EditorContent
          editor={editor}
          className={"flex-1 overflow-y-auto text-primary-strong "}
        />
        <div className={"flex gap-4"}>
          <button
            onClick={() => {
              if (editor) {
                handleSavePost(editor.getJSON());
              }
            }}
            className={`px-4 py-1.5 rounded bg-primary-strong text-white brightness-100 hover:bg-primary-normal ${
              isUploadingPost ? "disabled" : ""
            }`}
          >
            {isUploadingPost ? "저장중..." : "저장"}
          </button>
          <button
            className={
              "px-4 py-1.5 rounded bg-primary-strong text-white brightness-100 hover:bg-primary-normal"
            }
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogEditor;
