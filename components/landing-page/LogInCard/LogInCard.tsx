import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@/styles/components/SignInCard.module.scss";
import { auth, getErrorMessage } from "@/lib/firebase";
import { SignInCardProps } from "@/lib/types";
import googleIcon from "@/public/images/google-icon.svg";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});
type FormData = Yup.InferType<typeof schema>;

export default function LogInCard({ setComponentToShow }: SignInCardProps) {
  const [
    signInWithEmailAndPassword,
    emailPasswordUser,
    emailPasswordLoading,
    emailPasswordError,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // displaying loading even if user has logged in becasue he will be
  // redirected to the dashboard
  if (emailPasswordLoading || googleLoading || googleUser || emailPasswordUser)
    return <LoadingSpinner />;

  const logIn = (values: FormData) =>
    signInWithEmailAndPassword(values.email, values.password);

  return (
    <div className={styles.signInCard}>
      <p className={styles.title}>Log In</p>
      <button className={styles.btn} onClick={() => signInWithGoogle()}>
        <div>
          <Image src={googleIcon} alt="google icon" />
          <span>Sign In with Google</span>
        </div>
      </button>
      <p className={styles.error}>{getErrorMessage(googleError?.code)}</p>
      <div className={styles.divider}>
        <hr />
        <span>or</span>
      </div>
      <p className={styles.error}>
        {getErrorMessage(emailPasswordError?.code)}
      </p>
      <form onSubmit={handleSubmit(logIn)} className={styles.form}>
        <div className={styles.inputDiv}>
          <p className={styles.error}>{errors.email?.message}</p>
          <input {...register("email")} placeholder="Email" />
        </div>
        <div className={styles.inputDiv}>
          <p className={styles.error}>{errors.password?.message}</p>
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
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
        onClick={() =>
          signInWithEmailAndPassword("demouser@demo.com", "demouser123")
        }
        className={`${styles.btn} ${styles.demoBtn}`}
      >
        <div>Demo</div>
      </button>
    </div>
  );
}
