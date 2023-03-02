import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/global.scss";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jobly - Makes job hunting easier</title>
        <meta
          name="description"
          content="Jobly streamlines the job search process by organizing and tracking job postings, interviews, and other relevant information for job seekers."
        />

        <meta name="theme-color" content="#90E0EF" />

        <meta property="og:title" content="Make job hunting easier" />
        <meta
          property="og:description"
          content="Organizing and tracking job postings, interviews, and other relevant information for job seekers."
        />
        <meta property="og:image" content="/images/og-image.png" />

        <meta
          name="keywords"
          content="job search organization, job search tracking, job postings review, interview scheduling, job application management, job search management, job search optimization, job search productivity, career management, employment tracking"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
