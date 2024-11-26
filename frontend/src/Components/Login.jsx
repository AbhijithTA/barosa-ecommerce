import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TextInput from "./Utils/TextInput";
import PasswordInput from "./Utils/PasswordInput";
import * as Yup from "yup";
import { useState } from "react";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("onSubmit", values);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is Required")
        .email("Invalid email address"),
      password: Yup.string().required("Password is Required "),
    }),

    // validate:(values) => {
    //   const errors = {}
    //   if (!values.email){
    //     errors.email= "Email is required"
    //   }
    //   if (!values.password){
    //     errors.password= "Password is required"
    //   }
    //   return errors
    // }
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);


  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" h-40 flex justify-center items-center flex-col p-10">
        <div className="w-[29vw] border-b-2 border-black">
          <h1 className="text-2xl font-semibold pb-3 text-center">
            Login or Sign-up
          </h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center justify-center">
          <TextInput
            name="email"
            type="text"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div>
            {formik.errors.email && formik.touched.email && formik.errors.email}
          </div>

          <PasswordInput
            name="password"
            placeholder="Password"
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div>
            {formik.errors.password &&
              formik.touched.password &&
              formik.errors.password}
          </div>
          <div>
          <button type="submit" className="w-[29vw] bg-black my-3 text-white py-3">Submit</button>

          </div>
        </form>
        <p>{`Don't have an account?`} <Link to="/register" className="hover:underline">Create one</Link>  </p>
        <Link to="#" className="text-sm hover:underline">Forget Password?</Link>
      </div>
    </div>
  );
}

export default Login;
