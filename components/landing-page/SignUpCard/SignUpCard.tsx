import React from "react";
import * as Yup from "yup";
import styles from "@/styles/components/SignInCard.module.scss";
import { auth, getErrorMessage } from "@/lib/firebase";
import { SignInCardProps } from "@/lib/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Password must be at least 8 characters long"),
  secondPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
type FormData = Yup.InferType<typeof schema>;

export default function SignUpCard({ setComponentToShow }: SignInCardProps) {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const signUp = (values: FormData) =>
    createUserWithEmailAndPassword(values.email, values.password);

  // displaying loading even if user has logged in becasue he will be
  // redirected to the dashboard
  if (loading || user) return <LoadingSpinner />;

  return (
    <div className={styles.signInCard}>
      <p className={styles.title}>Sign Up</p>
      <p className={styles.error}>{getErrorMessage(error?.code)}</p>
      <form onSubmit={handleSubmit(signUp)} className={styles.form}>
        <div className={styles.inputDiv}>
          <p className={styles.error}>{errors.email?.message}</p>
          <input {...register("email")} placeholder="Email" />
        </div>
        <div className={styles.inputDiv}>
          <p className={styles.error}>{errors.password?.message}</p>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className={`${styles.inputDiv} ${styles.secondPassword}`}>
          <p className={styles.error}>{errors.secondPassword?.message}</p>
          <input
            {...register("secondPassword")}
            type="password"
            placeholder="Confirm Password"
          />
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
