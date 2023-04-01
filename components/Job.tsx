import React, { useState, ChangeEvent, useEffect } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast, Toaster } from "react-hot-toast";
import styles from "@/styles/components/Job.module.scss";
import { JobType } from "@/lib/types";
import { auth, db, delJob, saveJob } from "@/lib/firebase";
import del from "@/public/images/delete.svg";
import save from "@/public/images/save.svg";

type EventType =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

type Props = {
  setIsOpen: (value: boolean) => void;
  id: string | undefined;
};

const initialFormData: JobType = {
  companyName: "",
  companyWebsite: "",
  jobTitle: "",
  pay: "",
  location: "",
  remote: "Remote",
  jobListingLink: "",
  fit: 5,
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  progress: "Not Applied",
  notes: "",
};

// If the id is undefined, it is a new job and firestore autogenerates it
function Job({ setIsOpen, id }: Props) {
  const [formData, setFormData] = useState<JobType | DocumentData>(
    initialFormData
  );
  const [user] = useAuthState(auth);

  // TODO: This runs twice, solve this
  useEffect(() => {
    async function getJob() {
      if (id && user) {
        const docRef = doc(db, `users/${user.uid}/jobs`, id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) setFormData(docSnapshot.data());
      }
    }

    getJob();
  }, [id, user]);

  async function saveJobData() {
    if (user?.email === "demouser@demo.com") {
      toast.error(
        "You are using a demo account, you cannot modify example data."
      );
      return;
    }
    await toast.promise(saveJob(formData, id, user?.uid), {
      loading: "Saving...",
      success: <b>Job saved!</b>,
      error: <b>Could not save, try again.</b>,
    });
    window.location.reload();
  }

  async function deleteJob() {
    if (user?.email === "demouser@demo.com") {
      toast.error(
        "You are using a demo account, you cannot modify example data."
      );
      return;
    }
    if (id && user) {
      await toast.promise(delJob(id, user.uid), {
        loading: "Deleting...",
        success: <b>Job deleted!</b>,
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
          name="companyName"
          id="companyName"
          placeholder="Company Name..."
          value={formData.companyName}
          onChange={handleChange}
        />
        <input
          type="url"
          name="companyWebsite"
          id="companyWebsite"
          placeholder="www.company-website.com"
          value={formData.companyWebsite}
          onChange={handleChange}
        />
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          placeholder="Job Title..."
          value={formData.jobTitle}
          onChange={handleChange}
        />
        <input
          type="number"
          name="pay"
          id="pay"
          placeholder="Pay..."
          value={formData.pay}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Location..."
          value={formData.location}
          onChange={handleChange}
        />
        <select
          name="remote"
          id="remote"
          value={formData.remote}
          onChange={handleChange}
        >
          <option value="Remote">Remote</option>
          <option value="On Site">On Site</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <input
          type="url"
          name="jobListingLink"
          id="jobListingLink"
          placeholder="www.job-listing-link.com"
          value={formData.jobListingLink}
          onChange={handleChange}
        />
        <select
          name="fit"
          id="fit"
          value={formData.fit}
          onChange={handleChange}
        >
          <option value="1">1&#9733;</option>
          <option value="2">2&#9733;</option>
          <option value="3">3&#9733;</option>
          <option value="4">4&#9733;</option>
          <option value="5">5&#9733;</option>
        </select>
        <input
          type="text"
          name="contactName"
          id="contactName"
          placeholder="Contact Name..."
          value={formData.contactName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="contactEmail"
          id="contactEmail"
          placeholder="contactemail@email.com"
          value={formData.contactEmail}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="contactPhone"
          id="contactPhone"
          placeholder="+023 111 334 23"
          value={formData.contactPhone}
          onChange={handleChange}
        />
        <select
          name="progress"
          id="progress"
          value={formData.progress}
          onChange={handleChange}
        >
          <option value="Not Applied">Not Applied</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <h2>Company info/Notes:</h2>
        <textarea
          name="notes"
          id="notes"
          placeholder="- Some useful notes.."
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
      </form>
      <div className={styles.actionButtons}>
        <button className={styles.delete} onClick={deleteJob}>
          <Image src={del} alt="Thrash" /> <span>Delete</span>
        </button>
        <button className={styles.save} onClick={saveJobData}>
          <Image src={save} alt="Floppy disk icon" /> <span>Save</span>
        </button>
      </div>
      <Toaster />
    </div>
  );
}

Job.defaultProps = {
  id: undefined,
};

export default Job;
