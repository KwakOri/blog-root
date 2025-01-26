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

const BlogEditor = () => {
  const [imageFiles, setImageFiles] = useState<{ image: File; id: string }[]>(
    []
  );

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
    <div className="flex flex-col w-full p-4">
      <input
        type="text"
        placeholder={"제목을 입력하세요"}
        className={"focus:outline-none"}
      />
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
  );
};

export default BlogEditor;
