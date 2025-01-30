import { client } from "@/services/index.service";

export const getAllCategories = async () => {
  const response = await client.get('"/categories"');
  return response.data;
};
