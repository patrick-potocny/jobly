import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.scss";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, setIsOpen, children }: Props) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
