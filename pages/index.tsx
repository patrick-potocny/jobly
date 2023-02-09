import Image from "next/image";
import logo from "@/public/images/logo.png";
import styles from "@/styles/LandingPage.module.scss";
import SignInCard from "@/components/SignInCard";
import AboutApp from '@/components/AboutApp';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <Image className={styles.logo} src={logo} alt="Jobly Logo" />
      <main className={styles.main}>
        <div className={styles.signInDiv}>
          <SignInCard />
        </div>
        <div className={styles.aboutAppDiv}><AboutApp /></div>
      </main>
    </div>
  );
}
