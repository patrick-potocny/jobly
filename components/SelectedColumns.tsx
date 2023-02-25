import React, { useState } from "react";
import Image from "next/image";
import columns from "@/public/images/columns.svg";
import styles from "@/styles/components/SelectedColumns.module.scss";
import { motion } from "framer-motion";
import { ColumnInstance } from "react-table";


const variants = {
  open: { opacity: 1, y: 0, display: "flex" },
  closed: { opacity: 0, y: 50, display: "none" },
};

export default function SelectedColumns({cols}: {cols: ColumnInstance<object>[]}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  function handleCheckboxChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { name, checked } = event.target;

    if (checked) {
      setCheckedList([...checkedList, name]);
    } else {
      setCheckedList(checkedList.filter((value: string) => value !== name));
    }
  }

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
          if (col.Header === "") return
          return (
          <div className={styles.col} key={col.id}>
            <label>
            <input type="checkbox" {...col.getToggleHiddenProps()}/>
            {` ${col.Header}`}
            </label>
          </div>
          )
        })}
      </motion.div>
    </div>
  );
}