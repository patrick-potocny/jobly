import React from "react";
import Head from "next/head";
import AppLayout from "@/components/layout/AppLayout";
import Table from "@/components/jobs/Table";
import withAuth from "@/hoc/withAuth";

function Jobs() {
  return (
    <>
      <Head>
        <title>Jobs</title>
      </Head>
      <AppLayout>
        <Table />
      </AppLayout>
    </>
  );
}

export default withAuth(Jobs);
