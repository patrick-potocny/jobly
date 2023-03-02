import { DocumentData } from "firebase/firestore";

// processes data from db to be used in table 
export function processJobs(jobs: DocumentData) {
  const processedJobs = jobs.map((job: DocumentData) => {
    const {
      id,
      companyName,
      companyWebsite,
      jobTitle,
      pay,
      location,
      remote,
      jobListingLink,
      fit,
      contactName,
      contactEmail,
      contactPhone,
      progress
    } = job;
    return {
      id,
      company: { companyName, companyWebsite },
      jobTitle,
      pay,
      location,
      remote,
      jobListingLink,
      fit,
      contact: [contactName, contactEmail, contactPhone].filter((str) => str !== ""),
      progress,
    };
  });

  return processedJobs;
}
