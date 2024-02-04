"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./signIn.scss";
import { json } from "stream/consumers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Page = () => {
  const [serverError, setServerError] = useState("");
  const [submited, setSubmited] = useState<any>(false);
  const router = useRouter();
  let getFormInf = JSON.parse(localStorage.getItem("formInf")!);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let inputValues = values;
      try {
        if (
          getFormInf.name == values.name &&
          getFormInf.email == values.email &&
          getFormInf.username == values.username
        ) {
          if (toast.success("You have successfully")) {
            setSubmited(true);
            router.push("/bookList");
          } else {
            setSubmited(false);
          }
        } else {
          toast.error("Your information in the registry did not match");
        }
      } catch (error) {
        setServerError("An error occurred while submitting the form");
      }
    },
  });

  // const handleInputChange = () => {
  //   if (
  //     getFormInf.name == inputValues.name &&
  //     getFormInf.email == inputValues.email &&
  //     getFormInf.username == inputValues.username
  //   ) {
  //     setSubmited(true);
  //   } else {
  //     console.log("false");
  //   }
  // };

  // useEffect(() => {
  //   handleInputChange();
  // }, []);

  const handleDelete = () => {
    localStorage.removeItem("formInf");
  };

  return (
    <div className="signUp">
      <div className="signUp-box" style={submited ? { height: "50rem" } : {}}>
        <h1>Sign In</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="input1 input">
            <h4>Your Name</h4>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              {...formik.getFieldProps("name")}
              // onChange={(e) => setInputsValues({ name: e.target.value })}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="input2 input">
            <h4>Your Email</h4>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              {...formik.getFieldProps("email")}
              // onChange={(e) => setInputsValues({ email: e.target.value })}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="input3 input">
            <h4>Your Username</h4>
            <input
              type="text"
              id="username"
              placeholder="Enter Your Username"
              {...formik.getFieldProps("username")}
              // onChange={(e) => setInputsValues({ username: e.target.value })}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="input4 input">
            <h4>Your Password</h4>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              {...formik.getFieldProps("password")}
              // onChange={(e) => setInputsValues({ password: e.target.value })}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          {serverError && <div className="error">{serverError}</div>}
          <button type="submit" className="signUp-submit">
            Submit
          </button>
        </form>
        <p>
          Already signed up?{" "}
          <Link href="/" onClick={handleDelete}>
            Go to sign up.
          </Link>
        </p>
        {submited ? (
          <Link href="/bookList">
            <button style={submited ? { marginTop: "2rem" } : {}}>
              Go to the HomePage
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
