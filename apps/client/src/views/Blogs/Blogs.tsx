import ActionAreaCard from "~/components/Card";
import { GetBlogs } from "~/interfaces/blogs.interface";

interface BlogProps {
  blogs: GetBlogs[];
  isLoading: boolean;
  width?: number;
}

function Blogs(props: BlogProps) {
  const { blogs, isLoading, width } = props;

  if (isLoading) {
    return <>Data is loading...</>;
  }

  if (!blogs) {
    return <>No data</>;
  }

  return (
    <>
      {blogs.map((blog: GetBlogs) => (
        <ActionAreaCard
          key={blog.id}
          width={width}
          author={blog.author.username}
          title={blog.title}
          content={blog.content}
        />
      ))}
    </>
  );
}

export default Blogs;
