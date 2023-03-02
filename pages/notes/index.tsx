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
import { toast, Toaster } from "react-hot-toast";
import copy from "@/public/images/copy.svg";
import Head from "next/head";
import Clipboard from "react-clipboard.js";

export default function Notes() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [addModal, setAddModal] = useState(false);
  const [notes, setNotes] = useState<NotesListType>([]);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(true);

  useEffect(() => {
    if (!user && !loading) router.push("/");
  }, [user, router, loading]);

  useEffect(() => {
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
      <Layout>
        {loadingNotes ? <Loading /> : (<div className={styles.notes}>
          {notes.map((note) => (
            <div
              className={styles.note}
              key={note.id}
              onClick={() => setEditNoteId(note.id)}
            >
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <Clipboard
                data-clipboard-text={note.content}
                onClick={stopPropagation}
              >
                <Image src={copy} alt="Copy" />
              </Clipboard>
            </div>
          ))}
          <button className={styles.add} onClick={() => setAddModal(true)}>
            <Image src={plus} alt="Add" />
          </button>
        </div>)}
      </Layout>

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
