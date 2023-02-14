import React from "react";
import Image from "next/image";
import screenshots from "@/public/images/screenshots.png";
import styles from "@/styles/components/AboutApp.module.scss";
import { motion } from "framer-motion";

export default function AboutApp() {
  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };


  return (
    <div className={styles.aboutAppDiv}>
      <div className={styles.wrapper}>
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .6, delay: 0.6, type: "spring" }}
        >
          <h1>Make job hunting easier</h1>
        </motion.div>
      </div>
      <div className={styles.wrapper}>
        <motion.div
          initial={{ y: "140%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .6, delay: 1.1, type: "spring" }}
        >
          <p>
            Jobly helps job seekers stay organized by tracking their job search.
            From reviewing postings to scheduling interviews, Jobly helps users
            to organize all necessary information.
          </p>
        </motion.div>
      </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .6, delay: 1.9, type: "spring" }}
        >
          <button onClick={scrollToBottom}>Get Started</button>
        </motion.div>
      <div className={styles.wrapper}>
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .6, delay: 1.5, type: "spring" }}
        >
          <Image src={screenshots} alt="Screenshots from the app" />
        </motion.div>
      </div>
    </div>
  );
}
