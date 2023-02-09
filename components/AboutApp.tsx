import React from "react";
import Image from "next/image";
import screenshots from '@/public/images/screenshots.png'
import styles from '@/styles/components/AboutApp.module.scss'

export default function AboutApp() {
  return (
    <div className={styles.aboutAppDiv}>
      <h1>Make job hunting easier</h1>
      <p>
        Jobly helps job seekers stay organized by tracking their job search.
        From reviewing postings to scheduling interviews, Jobly helps users to 
        organize all necessary information.
      </p>
      <button>Get Started</button>
      <Image src={screenshots} alt="Screenshots from the app"/>
    </div>
  );
}
