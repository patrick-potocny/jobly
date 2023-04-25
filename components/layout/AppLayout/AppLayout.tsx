import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./AppLayout.module.scss";
import { auth } from "@/lib/firebase";
import BurgerMenu from "../BurgerMenu";
import logo from "@/public/images/logo.png";
import signOut from "@/public/images/sign-out.svg";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  const router = useRouter();
  const { pathname } = router;
  // Extract the text after the last `/`
  const currentPage = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Image src={logo} alt="Jobly logo" className={styles.logo} priority/>
        <nav>
          <ul role="navigation" className={styles.nav}>
            <li className={currentPage === "jobs" ? styles.selected : ""}>
              <Link href="/jobs">Jobs</Link>
            </li>
            <li className={currentPage === "notes" ? styles.selected : ""}>
              <Link href="/notes">Notes</Link>
            </li>
            <li className={currentPage === "tips" ? styles.selected : ""}>
              <Link href="/tips">Tips</Link>
            </li>
          </ul>
        </nav>
        <button className={styles.signOut} onClick={() => auth.signOut()}>
          <Image src={signOut} alt="Log out icon" /> Log Out
        </button>
        <BurgerMenu />
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  );
}