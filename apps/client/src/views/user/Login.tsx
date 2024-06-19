import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "~/schemas/login";
import { LoginUser } from "~/interfaces/login.interface";
import { login } from "~/services/login";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Login() {
  const router = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.accessToken);

      queryClient.invalidateQueries(["user", "me"]);

      toast.success("Login successful");

      return router("/home", { replace: true });
    }
  });

  const handleSubmit = async (values: LoginUser) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: handleSubmit,
    validationSchema: loginSchema
  });

  return (
    <div className="card my-40">
      <div className="flex flex-col gap-6">
        <p className="text-2xl font-bold mx-auto">Sign in to your account</p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center gap-6"
        >
          <TextField
            id="email"
            placeholder="joe@email.com"
            name="email"
            label={
              <span>
                Email <span className="text-red-500 text-lg">*</span>
              </span>
            }
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            placeholder="password"
            id="password"
            name="password"
            label={
              <span>
                Password <span className="text-red-500 text-lg">*</span>
              </span>
            }
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <button
            className="button hover:bg-blue-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr />

        <p className="text-center">
          New User?
          <Link
            to="/register"
            className="px-2 decoration-0 italic font-medium text-blue-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
