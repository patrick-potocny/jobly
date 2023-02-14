import Image from "next/image";
import React, { ReactNode } from "react";
import logo from "@/public/images/logo.png";
import signOut from "@/public/images/sign-out.svg";
import Link from "next/link";
import styles from "@/styles/components/Layout.module.scss";
import {auth} from "@/lib/firebase";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  const router = useRouter();
  const { pathname } = router;
  // Extract the text after the last `/`
  const currentPage = pathname.substring(pathname.lastIndexOf('/') + 1);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Image src={logo} alt="Jobly logo" className={styles.logo} />
        <nav>
          <ul role="navigation" className={styles.nav}>
            <li className={currentPage === 'jobs' ? styles.selected : ''}>
              <Link href="/jobs">Jobs</Link>
            </li>
            <li className={currentPage === 'notes' ? styles.selected : ''}>
              <Link href="/notes">Notes</Link>
            </li>
            <li className={currentPage === 'tips' ? styles.selected : ''}>
              <Link href="/tips">Tips</Link>
            </li>
          </ul>
        </nav>
        <button className={styles.signOut} onClick={() => auth.signOut()}>
          <Image src={signOut} alt="Sign out icon" /> Sign Out
        </button>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
