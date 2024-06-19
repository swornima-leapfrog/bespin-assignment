import * as Yup from "yup";

const addBlogSchema = Yup.object().shape({
  title: Yup.string().required("Blog title is required"),
  content: Yup.string().min(10).required("Blog content is required")
});

export default addBlogSchema;
