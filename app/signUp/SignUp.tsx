"use client";
import Link from "next/link";
import "./signUp.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
  });

  let resultTexts = "";
  function makeid(length: any) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      resultTexts += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
      counter += 1;
    }
    return resultTexts;
  }
  makeid(5);

  const handleSubmit = async (values: any) => {
    localStorage.setItem("formInf", JSON.stringify(values));
    console.log(values);
    try {
      let res = await axios.post("https://0001.uz/signup", values);
      let data = await res.data;
      console.log(res);
      toast.success(
        "You have successfully registered and you have to go to the Sign In"
      );
    } catch (error) {
      console.log(error);
    }
    // location.reload();
  };
  return (
    <div className="signUp">
      <div className="signUp-box">
        <h1>Sign Up</h1>
        <a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=527812706492-f63ob427ei5uru7jton0bn4b8aeon0i6.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fauth.wordtune.com%2F__%2Fauth%2Fhandler&state=AMbdmDmVW8ACH3RggQot7J21myCBWRUV8yzOxUerd1FHlJtHokKL7oyHBhqt1fkYnwFfYQ6Qkf7t55wLy4tUwg-cB3d0tW-8Bl-1w_UvU1EvLdkkHKL3IxMDr31YHmoOa0p0k-IRZf0quyEfNV8ZLMOsk3cQbWsDa43nmrj9e-QKDZtCShacJG0sTWIb27_Ph9ZKdTUPHOUSJlj51xZDYJAScg9YRFEfkWndzDebh13TBhaYB9EenA2_xssZE0Yodv4l4hOt3GMpCtixBXOhivT20BtZNXP-10zYTfEUzYE4gqsbOuZwc_DwC1c&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&context_uri=https%3A%2F%2Fapp.wordtune.com&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow">
          <button>
            <img src="./social-logos.svg" alt="Eror" />
            <h3>Continue with Google</h3>{" "}
          </button>
        </a>
        <a href="https://www.facebook.com/login.php?skip_api_login=1&api_key=672176943498521&kid_directed_site=0&app_id=672176943498521&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv8.0%2Fdialog%2Foauth%3Fresponse_type%3Dcode%252Cgranted_scopes%26client_id%3D672176943498521%26redirect_uri%3Dhttps%253A%252F%252Fauth.wordtune.com%252F__%252Fauth%252Fhandler%26state%3DAMbdmDnwjCGiLr_kLiNujQL984fweOxM_TTVCKEUIKJPKifoVTzEEevSAr4fw3p4LSAZOIe-HoFr6bZq-wAPbfRAchdd9uWRC6VDu2SjxlJXExOrsCF256sPa47xkqhwHSRGzt0I31YN1AysczToOFkW-hMs-sg059Z5QdJxCnWiyN6AGQLYwHMNp3KKdzFf-jHH_xc38h11Uo_JX6rjmttZYwAJk04tfXhUaB50nbgFRXhoksDkw8Xz3pKHfIx4mpC-srAxnwsMQ8xhoZLjAHxekhJDy4qAC18MNTRhjX3mMoVBTg6FjAQ6iBadOQyT0q7G2g%26scope%3Dpublic_profile%252Cemail%26context_uri%3Dhttps%253A%252F%252Fapp.wordtune.com%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D339c7251-fbae-415c-a9c3-884403fd854d%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fauth.wordtune.com%2F__%2Fauth%2Fhandler%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3DAMbdmDnwjCGiLr_kLiNujQL984fweOxM_TTVCKEUIKJPKifoVTzEEevSAr4fw3p4LSAZOIe-HoFr6bZq-wAPbfRAchdd9uWRC6VDu2SjxlJXExOrsCF256sPa47xkqhwHSRGzt0I31YN1AysczToOFkW-hMs-sg059Z5QdJxCnWiyN6AGQLYwHMNp3KKdzFf-jHH_xc38h11Uo_JX6rjmttZYwAJk04tfXhUaB50nbgFRXhoksDkw8Xz3pKHfIx4mpC-srAxnwsMQ8xhoZLjAHxekhJDy4qAC18MNTRhjX3mMoVBTg6FjAQ6iBadOQyT0q7G2g%23_%3D_&display=page&locale=ru_RU&pl_dbl=0">
          <button className="btn2">
            <img src="./social-logos2.svg" alt="Eror" />
            <h3>Continue with Facebook</h3>{" "}
          </button>
        </a>
        <Formik
          initialValues={{
            name: "",
            email: "",
            username: "",
            secret: resultTexts,
            key: resultTexts + 1232,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
          }}
        >
          {() => (
            <Form>
              {/* Your form fields */}
              <div className="input1 input">
                <h4>Your Name</h4>
                <Field type="text" name="name" placeholder="Enter Your Name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="input2 input">
                <h4>Your Email</h4>
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter Your Email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="input3 input">
                <h4>Your Username</h4>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter Your Username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>
              {/* <Link href="/signIn"> */}
              <button type="submit" className="signUp-submit">
                Submit
              </button>
              {/* </Link> */}
            </Form>
          )}
        </Formik>
        <p>
          Already signed up? <Link href="/signIn">Go to sign in.</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
