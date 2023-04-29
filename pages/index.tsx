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

const dosis = Dosis({ subsets: ["latin"], display: "swap" });

export default function LandingPage() {
  const {user} = useContext(AuthContext)
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/jobs");
  }, [user, router]);

  return (
    <div className={dosis.className}>
      <div className={styles.container}>
        <Image className={styles.logo} src={logo} alt="Jobly Logo" priority />
        <main className={styles.main}>
          <div className={styles.aboutAppDiv}>
            <AboutApp />
          </div>
          <motion.div
            className={styles.signInDiv}
            initial={{ y: 20, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.6,
              duration: 1,
              type: "spring",
              stiffness: 50,
            }}
          >
            <SignInCards />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
