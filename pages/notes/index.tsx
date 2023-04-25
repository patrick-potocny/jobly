import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Head from "next/head";
import { toast, Toaster } from "react-hot-toast";
import Clipboard from "react-clipboard.js";
import styles from "./Notes.module.scss";
import { auth, db } from "@/lib/firebase";
import AppLayout from "@/components/layout/AppLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Modal from "@/components/common/Modal";
import Note from "@/components/common/Note";
import { NotesListType } from "@/lib/types";
import withAuth from "@/hoc/withAuth";
import plus from "@/public/images/plus.svg";
import copy from "@/public/images/copy.svg";

function Notes() {
  const [user] = useAuthState(auth);
  const [addModal, setAddModal] = useState(false);
  const [notes, setNotes] = useState<NotesListType>([]);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(true);

  useEffect(() => {
    // TODO: Error handling
    async function getUserNotes() {
      setLoadingNotes(true);
      const notesRef = collection(db, `users/${user?.uid}/notes`);
      const notesDoc = await getDocs(notesRef);
      const notes = notesDoc.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // @ts-ignore
      setNotes(notes);
      setLoadingNotes(false);
    }

    if (user) {
      getUserNotes();
    }
  }, [user]);

  async function stopPropagation(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    toast.success("Copied to clipboard!");
  }

  return (
    <>
      <Head>
        <title>Notes</title>
      </Head>
      <AppLayout>
        {loadingNotes ? (
          <LoadingSpinner />
        ) : (
          <div className={styles.notes}>
            {notes.map((note) => (
              <div
                className={styles.note}
                key={note.id}
                onClick={() => setEditNoteId(note.id)}
              >
                <h2 className={styles.title}>{note.title}</h2>
                <p className={styles.content}>{note.content}</p>
                <Clipboard
                  data-clipboard-text={note.content}
                  onClick={stopPropagation}
                  className={styles.copyButton}
                >
                  <Image src={copy} alt="Copy" />
                </Clipboard>
              </div>
            ))}
            <button className={styles.add} onClick={() => setAddModal(true)}>
              <Image src={plus} alt="Add" />
            </button>
          </div>
        )}
      </AppLayout>

      <Toaster />

      <Modal isOpen={editNoteId !== null} setIsOpen={() => setEditNoteId(null)}>
        <Note
          setIsOpen={() => setEditNoteId(null)}
          id={editNoteId || undefined}
        />
      </Modal>

      <Modal isOpen={addModal} setIsOpen={setAddModal}>
        <Note setIsOpen={setAddModal} />
      </Modal>
    </>
  );
}

export default withAuth(Notes);