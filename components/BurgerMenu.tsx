import React, { useState } from "react";
import Hamburger from "hamburger-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import styles from "@/styles/components/BurgerMenu.module.scss";
import { auth } from "@/lib/firebase";
import signOut from "@/public/images/sign-out.svg";

const variants: Variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-200%" },
};

const listVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function BurgerMenu() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.burgerMenu}>
      <Hamburger
        rounded
        color="#03045E"
        onToggle={() => setOpen((prev) => !prev)}
      />
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ ease: "easeInOut" }}
        variants={variants}
        className={styles.menu}
      >
        <motion.ul className={styles.menuItems} variants={listVariants}>
          <motion.li variants={itemVariants}>
            <Link href="/jobs">Jobs</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/notes">Notes</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <Link href="/tips">Tips</Link>
          </motion.li>
          <motion.li variants={itemVariants}>
            <button className={styles.signOut} onClick={() => auth.signOut()}>
              <Image src={signOut} alt="Sign out icon" /> Log Out
            </button>
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
}
