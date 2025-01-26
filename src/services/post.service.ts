import { client } from "@/services/index.service";

interface UploadedImage {
  image: File;
  id: string;
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
