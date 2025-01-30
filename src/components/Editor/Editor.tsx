"use client";

import { publicUrlPrefix } from "@/constants/constant";
import { uploadImages } from "@/services/post.service";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Editor, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./editor.css";

interface TCategory {
  id: number;
  blogId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
interface TCategories {
  blogId: number;
  blogName: string;
  categories: TCategory[];
}

const dummyCategoriesData: TCategories[] = [
  { blogId: 1, blogName: "entertain", categories: [] },
  {
    blogId: 2,
    blogName: "it",
    categories: [
      {
        id: 1,
        blogId: 2,
        name: "apple",
        createdAt: "2025-01-03T17:59:17.643Z",
        updatedAt: "2025-01-03T17:59:17.643Z",
      },
      {
        id: 2,
        blogId: 2,
        name: "samsung",
        createdAt: "2025-01-03T17:59:17.643Z",
        updatedAt: "2025-01-03T17:59:17.643Z",
      },
    ],
  },
  {
    blogId: 4,
    blogName: "development",
    categories: [
      {
        id: 3,
        blogId: 4,
        name: "react",
        createdAt: "2025-01-29T03:02:52.999Z",
        updatedAt: "2025-01-29T03:02:52.999Z",
      },
      {
        id: 4,
        blogId: 4,
        name: "next",
        createdAt: "2025-01-29T03:03:13.280Z",
        updatedAt: "2025-01-29T03:03:13.280Z",
      },
      {
        id: 5,
        blogId: 4,
        name: "node",
        createdAt: "2025-01-29T03:03:22.918Z",
        updatedAt: "2025-01-29T03:03:22.918Z",
      },
      {
        id: 6,
        blogId: 4,
        name: "express",
        createdAt: "2025-01-29T03:03:32.573Z",
        updatedAt: "2025-01-29T03:03:32.573Z",
      },
    ],
  },
];

const BlogEditor = () => {
  const [imageFiles, setImageFiles] = useState<{ image: File; id: string }[]>(
    []
  );
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  console.log(selectedCategory);
  console.log(imageFiles);

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
    console.log("POST CONTENT => ", changeSrcToPublicUrl(json));
    console.log("IMAGE FILES =>", imageFiles);
    const res = await uploadImages(imageFiles);
    console.log(res);
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
    content: "<p>Hello World! 🌎️</p>",
    onUpdate: onEditorUpdate,
  });

  return (
    <>
      <div className="flex flex-col w-full p-4">
        <div className="flex flex-col gap-5 w-full justify-center py-5">
          <div className={"flex flex-col gap-2"}>
            <input
              type="text"
              placeholder={"제목을 입력하세요"}
              className={
                "focus:outline-none font-bold text-[36px] placeholder:text-primary-weak text-primary-strong"
              }
            />
            <div className={"w-[50px] h-2 shrink-0 bg-primary-strong"}></div>
          </div>
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
                {dummyCategoriesData.map((blog) => (
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
                {dummyCategoriesData
                  .find(({ blogId }) => selectedBlog === blogId)
                  ?.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
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
                onSave(editor.getJSON());
              }
            }}
            className={
              "px-4 py-1.5 rounded bg-primary-strong text-white brightness-100 hover:bg-primary-normal"
            }
          >
            저장
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
