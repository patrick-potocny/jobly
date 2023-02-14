import React from "react";
import styles from "@/styles/components/Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.wrapper}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <span>Loading</span>
      </div>
    </div>
  );
}
