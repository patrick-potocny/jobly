import React from "react";
import styles from "./LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
