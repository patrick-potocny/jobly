import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db } from "@/lib/firebase";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import Head from "next/head";

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
      {loading && <Loading />}
    </>
  );
}
