import React from "react";
import Image from "next/image";
import googleIcon from "@/public/images/google-icon.svg";
import styles from "@/styles/components/SignInCard.module.scss";
import { SignInDemoUser, signInWithGoogle } from "@/lib/firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SignInCardProps } from "@/lib/types";

export default function LogInCard({ setComponentToShow }: SignInCardProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: (values) => {
      logIn(values.email, values.password);
    },
  });

  async function logIn(email: string, password: string) {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Logged in successfully");
    } catch (e: any) {
      if (e.code === "auth/wrong-password") setError("Incorrect password");
      if (e.code === "auth/invalid-email") setError("Incorrect email");
      if (e.code === "auth/user-not-found") setError("User not found");
    }
  }

  return (
    <div className={styles.signInCard}>
      <p className={styles.title}>Log In</p>
      <button className={styles.btn} onClick={() => signInWithGoogle()}>
        <div>
          <Image src={googleIcon} alt="google icon" />
          <span>Sign In with Google</span>
        </div>
      </button>
      <div className={styles.divider}>
        <hr />
        <span>or</span>
      </div>
      <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputDiv}>
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className={styles.error}>{formik.errors.email}</p>
          ) : null}
        </div>
        <div className={styles.inputDiv}>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className={styles.error}>{formik.errors.password}</p>
          ) : null}
        </div>
        <button
          onClick={() => setComponentToShow("resetpassword")}
          type="button"
          className={styles.forgotPassword}
        >
          Forgot password?
        </button>
        <button type="submit" className={`${styles.btn} ${styles.submitBtn}`}>
          <div>Log In</div>
        </button>
        <p>
          Dont have an account?{" "}
          <button
            onClick={() => setComponentToShow("signup")}
            type="button"
            className={styles.signUp}
          >
            Sign Up
          </button>
        </p>
      </form>

      <button
        onClick={SignInDemoUser}
        className={`${styles.btn} ${styles.demoBtn}`}
      >
        <div>Demo</div>
      </button>
    </div>
  );
}
