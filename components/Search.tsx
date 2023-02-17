import React from "react";
import Image from "next/image";
import magnifyingGlass from "@/public/images/magnifying-glass.svg";
import styles from "@/styles/components/Search.module.scss";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

export default function Search({ search, setSearch }: Props) {
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
