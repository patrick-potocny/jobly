import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { sendPasswordResetEmail } from "firebase/auth";
import styles from "@/styles/components/SignInCard.module.scss";
import { auth } from "@/lib/firebase";
import { SignInCardProps } from "@/lib/types";

export default function ResetPasswordCard({ setComponentToShow }: SignInCardProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
    }),
    onSubmit: (values) => {
      resetPassword(values.email);
    },
  });

  async function resetPassword(email: string) {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email has been sent");
    } catch (e: any) {
      if (e.code === "auth/invalid-email") setError("Invalid email");
      if (e.code === "auth/user-not-found") setError("User not found");
    }
  }

  return (
    <div className={styles.signInCard}>
      <p className={styles.title}>Reset Password</p>
      <p className={styles.resetInstructions}>
        Enter the email assiociated with your account and we&apos;ll send you
        instructions to reset your password.
      </p>
      <form noValidate onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inputDiv}>
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className={styles.error}>{formik.errors.email}</p>
          ) : null}
        </div>
        <button type="submit" className={`${styles.btn} ${styles.submitBtn}`}>
          <div>Send reset Email</div>
        </button>
        <p>
          <button
            onClick={() => setComponentToShow("login")}
            type="button"
            className={styles.signUp}
          >
            Back to Log In
          </button>
        </p>
      </form>
    </div>
  );
}
