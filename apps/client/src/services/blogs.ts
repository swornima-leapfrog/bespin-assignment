import http from "~/utils/http";

export interface createBlog {
  title: string;
  content: string;
}

export const addBlog = async (formData: createBlog) => {
  const data = await http.post("/blogs", formData);

  return data;
};

export const getBlogs = async () => {
  const { data } = await http.get("/blogs");

  return data;
};

export const getBlogsById = async (id: number) => {
  const { data } = await http.get(`/blogs/${id}`);

  return data;
};

export const getBlogsByAuthorId = async (id: number) => {
  const { data } = await http.get(`/blogs/user/${id}`);

  return data;
};
