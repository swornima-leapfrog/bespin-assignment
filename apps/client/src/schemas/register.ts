import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  contactNumber: Yup.string()
    .matches(/^\d{10}$/, "Contact should be valid")
    .matches(/[9]\d{9}/, "Contact number should start from 9")
    .required("Contact number is required")
});

export default registerSchema;
