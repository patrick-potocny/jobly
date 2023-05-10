import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@/styles/components/SignInCard.module.scss";
import { auth, getErrorMessage } from "@/lib/firebase";
import { SignInCardProps } from "@/lib/types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { FirebaseError } from "firebase/app";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
});
type FormData = Yup.InferType<typeof schema>;

export default function ResetPasswordCard({
  setComponentToShow,
}: SignInCardProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // checking if resetError is an instance of FirebaseError because
    // it can be normal Error and that doesnt have code property
    // we can translate to a message
    if (resetError instanceof FirebaseError) {
      setError("email", {
        type: "custom",
        message: getErrorMessage(resetError.code),
      });
    } else if (resetError) {
      setError("email", {
        type: "custom",
        message: "Something went wrong. Please try again.",
      });
    }
  }, [setError, resetError]);

  const resetPassword = async (values: FormData) => {
    await sendPasswordResetEmail(values.email);
    setMessage("Email has been sent.");
  };

  if (sending) return <LoadingSpinner />;

  return (
    <div className={styles.signInCard}>
      <h2 className={styles.title}>Reset Password</h2>
      <p className={styles.instructions}>
        Enter the email assiociated with your account and we&apos;ll send you
        instructions to reset your password.
      </p>
      <form onSubmit={handleSubmit(resetPassword)} className={styles.form}>
        <div className={styles.inputDiv}>
          <p className={styles.success}>{!resetError && message}</p>
          <p className={styles.error}>{errors.email?.message}</p>
          <input {...register("email")} placeholder="Email" />
        </div>
        <button type="submit" className={`${styles.btn} ${styles.submitBtn}`}>
          <div className={styles.btnText}>Send reset Email</div>
        </button>
        <p>
          <button
            onClick={() => setComponentToShow("login")}
            type="button"
            className={styles.link}
          >
            Back to Log In
          </button>
        </p>
      </form>
    </div>
  );
}
