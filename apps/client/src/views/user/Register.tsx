import { useFormik } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { createUser } from "~/services/users";
import registerSchema from "~/schemas/register";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "~/interfaces/register.interface";

function Register() {
  const router = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createUser
  });

  const handleSubmit = async (values: RegisterUser) => {
    try {
      await mutateAsync(values);

      toast.success("Registered successfully");

      router("/login", { replace: true });
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      contactNumber: ""
    },
    onSubmit: handleSubmit,
    validationSchema: registerSchema
  });

  return (
    <div className="card my-20">
      <div className="flex flex-col gap-6">
        <p className="text-2xl font-bold mx-auto">Sign Up</p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center gap-6"
        >
          <TextField
            id="username"
            name="username"
            label={
              <span>
                Username <span className="text-red-500 text-lg">*</span>
              </span>
            }
            placeholder="John Doe"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            id="email"
            name="email"
            label={
              <span>
                Email <span className="text-red-500 text-lg">*</span>
              </span>
            }
            placeholder="joe@email.com"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            id="password"
            name="password"
            label={
              <span>
                Password <span className="text-red-500 text-lg">*</span>
              </span>
            }
            placeholder="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            id="contactNumber"
            name="contactNumber"
            label={
              <span>
                ContactNumber <span className="text-red-500 text-lg">*</span>
              </span>
            }
            placeholder="contactNumber"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.contactNumber}
            error={
              formik.touched.contactNumber &&
              Boolean(formik.errors.contactNumber)
            }
            helperText={
              formik.touched.contactNumber && formik.errors.contactNumber
            }
          />

          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </form>

        <hr />

        <p className="text-center">
          Already have an account?
          <Link
            to="/login"
            className="px-2 decoration-0 italic font-medium text-blue-600 hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
