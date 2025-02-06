export interface TPost {
  authorId: number | null;
  blogId: number;
  categoryId: number;
  content: string;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  categories: {
    name: string;
  };
  blogs: {
    name: string;
  };
}
