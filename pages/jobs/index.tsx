import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Head from "next/head";
import { auth } from "@/lib/firebase";
import Layout from "@/components/Layout";
import Table from "@/components/Table";

export default function Jobs() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading) router.push("/");
  }, [user, router, loading]);

  return (
    <>
      <Head>
        <title>Jobs</title>
      </Head>
      <Layout>
        <Table />
      </Layout>
    </>
  );
}
