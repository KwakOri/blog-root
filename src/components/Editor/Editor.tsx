"use client";

import { publicUrlPrefix } from "@/constants/constant";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Editor, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const BlogEditor = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
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
  const onSave = (json: JSONContent) => {
    console.log(changeSrcToPublicUrl(json));
  };
  const insertImage = (currentEditor: Editor, file: File) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      currentEditor
        .chain()
        .insertContentAt(currentEditor.state.selection.anchor, {
          type: "image",
          attrs: {
            src: fileReader.result,
            title: uuidv4(),
          },
        })
        .focus()
        .run();
    };
  };
  const extractImages = (node: JSONContent): string[] => {
    const images: string[] = [];

    if (node.type === "image" && node.attrs?.title) {
      images.push(node.attrs.title);
    }

    if (node.content) {
      node.content.forEach((child: JSONContent) => {
        images.push(...extractImages(child));
      });
    }

    return images;
  };
  const onImageDrop = (currentEditor: Editor, files: File[]) => {
    files.forEach((file) => {
      insertImage(currentEditor, file);
    });
  };
  const onImagePaste = (
    currentEditor: Editor,
    files: File[],
    htmlContent: string | undefined
  ) => {
    files.forEach((file) => {
      if (htmlContent) {
        // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
        // you could extract the pasted file from this url string and upload it to a server for example
        console.log(htmlContent); // eslint-disable-line no-console
        return false;
      }
      insertImage(currentEditor, file);
    });
  };
  const onEditorUpdate = ({ editor }: { editor: Editor }) => {
    const json = editor.getJSON();

    const foundImages = extractImages(json);

    const addedImages = foundImages.filter(
      (image) => !imageUrls.includes(image)
    );
    const removedImages = imageUrls.filter(
      (image) => !foundImages.includes(image)
    );

    if (addedImages.length > 0 || removedImages.length > 0) {
      console.log("추가된 이미지:", addedImages);
      console.log("삭제된 이미지:", removedImages);
      setImageUrls(foundImages);
    }
  };

  const editor = useEditor({
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
