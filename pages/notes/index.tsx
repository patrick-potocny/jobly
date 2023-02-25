import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db } from "@/lib/firebase";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import plus from "@/public/images/plus.svg";
import styles from "@/styles/pages/Notes.module.scss";
import Modal from "@/components/Modal";
import Note from "@/components/Note";
import { NotesListType } from "@/lib/types";

export default function Notes() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [addModal, setAddModal] = useState(false);
  const [notes, setNotes] = useState<NotesListType>([]);

  useEffect(() => {
    if (!user && !loading) router.push("/");
  }, [user, router, loading]);

  useEffect(() => {
    async function getUserNotes() {
      const notesRef = collection(db, `users/${user?.email}/notes`);
      const notesDoc = await getDocs(notesRef);
      const notes = notesDoc.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // @ts-ignore
      setNotes(notes);
    }

    if (user) {
      getUserNotes();
    }
  }, [user]);

  return (
    <>
      <Layout>
        <div className={styles.notes}>
          <button className={styles.add} onClick={() => setAddModal(true)}>
            <Image src={plus} alt="Add" />
          </button>
          {notes.map((note) => (
            <div className={styles.note} key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </Layout>

      <Modal isOpen={addModal} setIsOpen={setAddModal}>
      <Note setIsOpen={setAddModal} />
      </Modal>

      {loading && <Loading />}
    </>
  );
}
