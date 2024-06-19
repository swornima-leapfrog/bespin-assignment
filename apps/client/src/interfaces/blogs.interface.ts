export interface AddBlogI {
  title: string;
  content: string;
}

export interface GetBlogs {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    username: string;
  };
}
