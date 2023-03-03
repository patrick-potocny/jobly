import React from "react";
import Image from "next/image";
import screenshots from "@/public/images/screenshots.png";
import styles from "@/styles/components/AboutApp.module.scss";
import { motion } from "framer-motion";

export default function AboutApp() {
  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.aboutAppDiv}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 3, delay: 0.3, type: "spring" }}
      >
        <h1>Make job hunting easier</h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 3, delay: 0.8, type: "spring" }}
      >
        <p>
          Jobly helps job seekers stay organized by tracking their job search.
          From reviewing postings to scheduling interviews, Jobly helps users to
          organize all necessary information. Experience the ease of organizing
          your job search process with Jobly and take your job search to the
          next level!
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3, type: "spring" }}
        onClick={scrollToBottom}
      >
        Get Started
      </motion.button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 3, delay: 1.2, type: "spring" }}
      >
        <Image
          src={screenshots}
          alt="Screenshots from the app"
          priority={true}
        />
      </motion.div>
    </div>
  );
}
