import Image from "next/image";
import logo from "@/public/images/logo.png";
import styles from "@/styles/pages/LandingPage.module.scss";
import SignInCard from "@/components/SignInCard";
import AboutApp from "@/components/AboutApp";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";

export default function LandingPage() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/jobs");
  }, [user, router]);

  return (
    <>
      <div className={styles.container}>
        <Image
          className={styles.logo}
          src={logo}
          alt="Jobly Logo"
          priority
        />
        <main className={styles.main}>
          <motion.div
            className={styles.signInDiv}
            initial={{ x: -500, scale: 0.2, opacity: 0 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 1,
              duration: 1,
              type: "spring",
              stiffness: 50,
            }}
          >
            <SignInCard />
          </motion.div>
          <div className={styles.aboutAppDiv}>
            <AboutApp />
          </div>
        </main>
      </div>
    </>
  );
}
