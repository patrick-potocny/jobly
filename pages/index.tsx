import { useContext, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styles from "@/styles/pages/LandingPage.module.scss";
import SignInCards from "@/components/landing-page/SignInCards";
import AboutApp from "@/components/landing-page/AboutApp";
import { Dosis } from "@next/font/google";
import logo from "@/public/images/logo.png";
import { AuthContext } from "@/context/AuthContext";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const dosis = Dosis({ subsets: ["latin"], display: "swap" });

export default function LandingPage() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/jobs");
  }, [user, router]);

  return (
    <div className={`${styles.container} ${dosis.className}`}>
      <Image className={styles.logo} src={logo} alt="Jobly Logo" priority />
      <main className={styles.main}>
        {loading || user ? (
          <LoadingSpinner />
        ) : (
          <>
            <AboutApp /> <SignInCards />
          </>
        )}
      </main>
    </div>
  );
}
