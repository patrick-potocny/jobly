import React, { useState } from "react";
import Image from "next/image";
import styles from "./EditJob.module.scss";
import Modal from "@/components/common/Modal";
import Job from "@/components/common/Job";
import expand from "@/public/images/expand.svg";

export default function EditJob({ id }: { id: string }) {
  const [editModal, setEditModal] = useState(false);

  return (
    <>
      <button className={styles.btn} onClick={() => setEditModal(true)}>
        <Image src={expand} alt="expand" height="32" />
      </button>
      <Modal isOpen={editModal} setIsOpen={setEditModal}>
        <Job setIsOpen={setEditModal} id={id}/>
      </Modal>
    </>
  );
}
