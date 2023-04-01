import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ColumnInstance } from "react-table";
import styles from "@/styles/components/SelectedColumns.module.scss";
import columns from "@/public/images/columns.svg";

type Props = { cols: ColumnInstance<object>[] };

const variants = {
  open: { opacity: 1, y: 0, scale: 1 },
  closed: { opacity: 0, y: "-80%", scale: 0.01 },
};

export default function SelectedColumns({ cols }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.selectedColumns}>
      <button onClick={() => setIsOpen((prev) => !prev)} className={styles.btn}>
        <Image src={columns} alt="icon" />
        <span>Columns</span>
      </button>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ ease: "easeInOut" }}
        variants={variants}
        className={styles.selection}
      >
        {cols.map((col) => {
          if (col.Header === "") return;
          return (
            <div className={styles.col} key={col.id}>
              <label>
                <input type="checkbox" {...col.getToggleHiddenProps()} />
                {` ${col.Header}`}
              </label>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
