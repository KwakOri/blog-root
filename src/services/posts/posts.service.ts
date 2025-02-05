import { client } from "@/services/index.service";

interface UploadedImage {
  image: File;
  id: string;
}

interface UploadPost {
  blogId: number;
  categoryId: number;
  title: string;
  content: string;
}

export const uploadImages = async (files: UploadedImage[]) => {
  // API 호출 함수들을 배열로 만들어
  const responses = files.map((file) => {
    const formData = new FormData();
    formData.append("image", file.image);
    formData.append("id", file.id);

    return client.post("/r2/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  });

  // Promise.all로 모든 API 호출을 동시에 처리
  try {
    const results = await Promise.all(responses);
    return results; // 모든 응답을 배열로 반환
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error; // 오류가 발생하면 처리
  }
};

export const uploadPost = async ({
  blogId,
  categoryId,
  title,
  content,
}: UploadPost) => {
  const body = { categoryId, title, content };

  const res = await client.post(`/posts?blogId=${blogId}`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const getAllPosts = async () => {
  const res = await client.get("/posts");
  return res.data;
};

export const getPosts = async (blogId: number) => {
  const res = await client.get(`/posts?blogId=${blogId}`);
  return res.data;
};

export const getPost = async (blogId: number, postId: number) => {
  const res = await client.get(`/posts/${postId}?blogId=${blogId}`);
  return res.data;
};
