import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import styles from "@/styles/pages/Tips.module.scss";
import Image from "next/image";
import jobSearch from "@/public/images/job-search.png";
import Head from "next/head";

export default function Tips() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading) router.push("/");
  }, [user, router, loading]);

  return (
    <>
      <Head>
        <title>Tips</title>
      </Head>
      <Layout>
        <article className={styles.article}>
          <Image src={jobSearch} alt="Guy searching for Job"></Image>
          <h1>Job Search Tips</h1>
          <p>
            Looking for a job can be a daunting and time-consuming process, but
            with the right job-search tips, you can make the process more
            manageable and even enjoyable. In this article, we&apos;ll share
            some of the most useful tips to help you find the right job and link
            to some helpful tools and websites that can aid you in your job
            search.
          </p>
          <h2>#1. Define your career goals and objectives</h2>
          <p>
            Before you start your job search, it&apos;s important to define what
            you&apos;re looking for in a job. This can help you narrow down your
            search and focus on opportunities that align with your career goals
            and objectives.
          </p>
          <p>
            Make a list of your career goals and objectives, including your
            ideal job title, industry, salary range, and location. This will
            help you stay focused and motivated during your job search.
          </p>
          <h2>#2. Update your resume and cover letter</h2>
          <p>
            Your resume and cover letter are your first impressions on potential
            employers, so it&apos;s important to ensure they&apos;re up to date
            and well-written. Make sure your resume includes your most recent
            work experience, education, and relevant skills. Use keywords that
            are relevant to the job you&apos;re applying for to increase your
            chances of getting noticed by recruiters. Similarly, ensure your
            cover letter is personalized and highlights your relevant experience
            and skills.
          </p>
          <h2>#3. Leverage your network</h2>
          <p>
            Networking is one of the most effective ways to find a job. Reach
            out to friends, family, former colleagues, and industry
            professionals to let them know you&apos;re looking for a job.
          </p>
          <p>
            Attend networking events, join industry groups and associations, and
            connect with people on social media platforms like{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/"
            >
              LinkedIn
            </a>
            . The more people you connect with, the higher your chances of
            finding a job.
          </p>
          <h2>#4. Utilize job boards and company websites</h2>
          <p>
            Job boards and company websites are great resources for job seekers.
            Sites like{" "}
            <a target="_blank" rel="noreferrer" href="https://www.indeed.com/">
              Indeed
            </a>
            ,{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.glassdoor.com/"
            >
              Glassdoor
            </a>
            , and{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/"
            >
              LinkedIn
            </a>{" "}
            offer a vast selection of job opportunities in various industries
            and locations. Similarly, company websites often list their job
            openings and provide detailed information about their culture and
            values. Take advantage of these resources and create job alerts to
            receive notifications when relevant job opportunities arise.
          </p>
          <h2>#5. Prepare for interviews</h2>
          <p>
            Once you start applying for jobs, it&apos;s important to prepare for
            interviews. Research the company, its products or services, and the
            position you&apos;re applying for. Practice answering common
            interview questions and come up with questions to ask the
            interviewer. Dress appropriately, arrive early, and bring copies of
            your resume and cover letter. Remember to be confident,
            professional, and personable during the interview.
          </p>
          <h2>#6. Follow up</h2>
          <p>
            After the interview, follow up with the interviewer to thank them
            for their time and express your continued interest in the position.
            This shows your enthusiasm and professionalism, and it can also help
            keep you top of mind for the employer.
          </p>

          <h2>Helpful Tools and Websites:</h2>
          <ul>
            <li>
              <a target="_blank" rel="noreferrer" href="https://www.canva.com/">
                Canva
              </a>
              : Canva is a graphic design tool that can help you create
              professional-looking resumes and cover letters.
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/"
              >
                LinkedIn
              </a>
              : LinkedIn is a social media platform for professionals, offering
              networking opportunities and job postings.
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.glassdoor.com/"
              >
                Glassdoor
              </a>
              : Glassdoor offers company reviews, salary data, and job listings.
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.indeed.com/"
              >
                Indeed
              </a>
              : Indeed is a job search engine that aggregates job postings from
              various sources.
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.angellist.com/"
              >
                AngelList
              </a>
              : AngelList is a job board for startup companies and offers a wide
              range of job opportunities.
            </li>
          </ul>
        </article>
      </Layout>

      {loading && <Loading />}
    </>
  );
}
