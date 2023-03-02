// Disabling ts-check because react-table types are not up to date
// @ts-nocheck

import React, { useState } from "react";
import Image from "next/image";
import magnifyingGlass from "@/public/images/magnifying-glass.svg";
import styles from "@/styles/components/Search.module.scss";
import { useAsyncDebounce } from "react-table";
import 'regenerator-runtime/runtime'

export default function Search({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);
  // Debounce the search for the specified amount of time
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <div className={styles.search}>
      <Image
        src={magnifyingGlass}
        alt="Magnifying glass"
        className={styles.icon}
      />
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
