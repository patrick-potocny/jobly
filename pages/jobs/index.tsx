import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import withAuth from "@/hoc/withAuth";

function Jobs() {
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

export default withAuth(Jobs);
