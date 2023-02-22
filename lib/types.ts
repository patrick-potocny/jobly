export type JobType = {
  id: string;
  companyName: string;
  companyWebsite: string;
  jobTitle: string;
  pay: string;
  location: string;
  remote: "Remote" | "On Site" | "Hybrid";
  jobListingLink: string;
  fit: 1 | 2 | 3 | 4 | 5;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  progress: "Not Applied" | "Applied" | "Interview" | "Offer" | "Rejected";
  notes: string;
};

export type CompanyType = {
  companyName: string;
  companyWebsite: string;
}