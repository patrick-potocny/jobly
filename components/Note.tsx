import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast, Toaster } from "react-hot-toast";
import styles from "@/styles/components/Job.module.scss";
import { NoteType } from "@/lib/types";
import { auth, db, delNote, saveNote } from "@/lib/firebase";
import del from "@/public/images/delete.svg";
import save from "@/public/images/save.svg";

type EventType =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>;

type Props = {
  setIsOpen: (value: boolean) => void;
  id: string | undefined;
};

const initialFormData: NoteType = {
  title: "",
  content: "",
};

// If the id is undefined, it is a new job and firestore autogenerates it
function Note({ setIsOpen, id }: Props) {
  const [formData, setFormData] = useState<NoteType | DocumentData>(
    initialFormData
  );
  const [user] = useAuthState(auth);

  // TODO: This runs twice, solve this
  useEffect(() => {
    async function getNote() {
      if (id && user) {
        const docRef = doc(db, `users/${user.uid}/notes`, id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) setFormData(docSnapshot.data());
      }
    }

    getNote();
  }, [id, user]);

  async function saveNoteData() {
    if (user?.email === "demouser@demo.com") {
      toast.error('You are using a demo account, you cannot modify example data.')
      return
    }
    await toast.promise(saveNote(formData, id, user?.uid), {
      loading: "Saving...",
      success: <b>Note saved!</b>,
      error: <b>Could not save, try again.</b>,
    });
    window.location.reload();
  }

  async function deleteNote() {
    if (user?.email === "demouser@demo.com") {
      toast.error('You are using a demo account, you cannot modify example data.')
      return
    }
    if (id && user) {
      await toast.promise(delNote(id, user.uid), {
        loading: "Deleting...",
        success: <b>Note deleted!</b>,
        error: <b>Could not delete try again.</b>,
      });
      window.location.reload();
    } else {
      setIsOpen(false);
    }
  }

  function handleChange(event: EventType) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className={styles.addJob}>
      <button className={styles.cancel} onClick={() => setIsOpen(false)}>
        &#x2715; Close
      </button>
      <form className={styles.inputs}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Note's title.."
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          id="content"
          placeholder="- Some useful notes.."
          value={formData.content}
          onChange={handleChange}
        ></textarea>
      </form>
      <div className={styles.actionButtons}>
        <button className={styles.delete} onClick={deleteNote}>
          <Image src={del} alt="Thrash" /> <span>Delete</span>
        </button>
        <button className={styles.save} onClick={saveNoteData}>
          <Image src={save} alt="Floppy disk icon" /> <span>Save</span>
        </button>
      </div>
      <Toaster />
    </div>
  );
}

Note.defaultProps = {
  id: undefined,
};

export default Note;
