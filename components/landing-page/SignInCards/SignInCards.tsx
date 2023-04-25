import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import SignUpCard from "../SignUpCard";
import LogInCard from "../LogInCard";
import ResetPasswordCard from "../ResetPasswordCard";

export default function SignInCards() {
  const [componentToShow, setComponentToShow] = useState("login");

  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        {componentToShow === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
          >
            <LogInCard setComponentToShow={setComponentToShow} />
          </motion.div>
        )}
        {componentToShow === "signup" && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
          >
            <SignUpCard setComponentToShow={setComponentToShow} />
          </motion.div>
        )}
        {componentToShow === "resetpassword" && (
          <motion.div
            key="resetpassword"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
          >
            <ResetPasswordCard setComponentToShow={setComponentToShow} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
