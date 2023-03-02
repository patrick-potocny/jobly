import React, { ReactNode, useEffect, useState } from "react";
import styles from "@/styles/components/table/WebLink.module.scss";

type Props = {
  value: string;
  children: ReactNode;
};

export default function WebLink({ value, children }: Props) {
  const [url, setUrl] = useState<string>(value);

  useEffect(() => {
    let updatedUrl = value;
    if (!updatedUrl) {
      updatedUrl = "#";
    } else if (!updatedUrl.startsWith("https://")) {
      updatedUrl = "https://" + updatedUrl;
    }
    setUrl(updatedUrl);
  }, [value]);

  return (
    <a
      className={styles.webLink}
      href={url}
      target={url === "#" ? "" : "_blank"}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
