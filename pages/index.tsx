import Image from "next/image";
import logo from "@/public/images/logo.png";
import styles from "@/styles/pages/LandingPage.module.scss";
import SignInCards from "@/components/SignInCards";
import AboutApp from "@/components/AboutApp";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { Dosis } from "@next/font/google";

const inter = Dosis({ subsets: ["latin"] });

export default function LandingPage() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/jobs");
  }, [user, router]);

  return (
    <div className={inter.className}>
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
          <div className={styles.aboutAppDiv}>
            <AboutApp />
          </div>
        </main>
      </div>
    </div>
  );
}
