import React from "react";
import styles from "@/styles/components/SignInCard.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SignInCardProps } from "@/lib/types";

export default function LogInCard({ setComponentToShow }: SignInCardProps) {
  const [error, setError] = React.useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      secondPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string()
        .required("Password is Required")
        .min(8, "Password must be at least 8 characters long"),
      secondPassword: Yup.string()
        .required("Password is Required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      signUp(values.email, values.password);
    },
  });

  async function signUp(email: string, password: string) {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setComponentToShow("login");
    } catch (e: any) {
      if (e.code === "auth/email-already-in-use")
        setError("Email already in use");
      if (e.code === "auth/invalid-email") setError("Invalid email");
      if (e.code === "auth/weak-password") setError("Weak password");
    }
  }

  return (
    <div className={styles.signInCard}>
      <p className={styles.title}>Sign Up</p>
      <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputDiv}>
          {error && <p className={styles.error}>{error}</p>}
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
        <div className={`${styles.inputDiv} ${styles.secondPassword}`}>
          <input
            id="secondPassword"
            name="secondPassword"
            type="password"
            placeholder="Confirm Password"
            value={formik.values.secondPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.secondPassword && formik.touched.secondPassword ? (
            <p className={styles.error}>{formik.errors.secondPassword}</p>
          ) : null}
        </div>
        <button type="submit" className={`${styles.btn} ${styles.submitBtn}`}>
          <div>Sign Up</div>
        </button>
        <p>
          Already have an account?{" "}
          <button
            onClick={() => setComponentToShow("login")}
            type="button"
            className={styles.signUp}
          >
            Log In
          </button>
        </p>
      </form>
    </div>
  );
}
