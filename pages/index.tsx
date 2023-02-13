import Image from "next/image";
import logo from "@/public/images/logo.png";
import styles from "@/styles/LandingPage.module.scss";
import SignInCard from "@/components/SignInCard";
import AboutApp from "@/components/AboutApp";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <>
    <div className={styles.container}>
      <Image className={styles.logo} src={logo} alt="Jobly Logo" />
      <main className={styles.main}>
        <motion.div
          className={styles.signInDiv}
          initial={{ x: -500, scale: 0.2, opacity: 0 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: 2,
            duration: 1.5,
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
    <motion.div 
      className={styles.overlay}
      animate={{ x: "-100vw" }}
      transition={{ duration: 1 }}
    />
    </>
  );
}
