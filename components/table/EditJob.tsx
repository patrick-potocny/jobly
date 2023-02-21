import React, { useState } from "react";
import expand from "@/public/images/expand.svg";
import Image from "next/image";
import styles from "@/styles/components/table/EditJob.module.scss";
import Modal from "@/components/Modal";
import Job from "@/components/Job";

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
