import { useFormik } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { addBlog } from "~/services/blogs";
import addBlogSchema from "~/schemas/blog";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AddBlogI } from "~/interfaces/blogs.interface";

function AddBlog() {
  const router = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: addBlog
  });

  const handleSubmit = async (values: AddBlogI) => {
    try {
      await mutateAsync(values);

      toast.success("Blog added successfully");

      router("/home", { replace: true });
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    },
    onSubmit: handleSubmit,
    validationSchema: addBlogSchema
  });

  return (
    <div className="card my-20">
      <div className="flex flex-col gap-6">
        <p className="text-2xl font-bold mx-auto">Add blog</p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center gap-6"
        >
          <TextField
            id="title"
            name="title"
            label={
              <span>
                title <span className="text-red-500 text-lg">*</span>
              </span>
            }
            placeholder="Lorem Ipsum "
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            id="content"
            name="content"
            label={
              <span>
                content <span className="text-red-500 text-lg">*</span>
              </span>
            }
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
            type="text"
            onChange={formik.handleChange}
            value={formik.values.content}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />

          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Add Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
