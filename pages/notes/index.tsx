import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";

export default function Notes() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading) router.push("/");
  }, [user, router, loading]);

  return (
    <>
      <Layout>Notes</Layout>

      {loading && <Loading />}
    </>
  );
}
