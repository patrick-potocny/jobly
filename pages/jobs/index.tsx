import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import styles from "@/styles/pages/Jobs.module.scss";
import Search from "@/components/Search";
import SelectedColumns from "@/components/SelectedColumns";
import Modal from "@/components/Modal";
import AddJob from "@/components/AddJob";

export default function Jobs() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [search, setSearch] = useState('');
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    if (!user && !loading) router.push("/");
  }, [user, router, loading]);

  return (
    <>
      <Layout>
        <div className={styles.controls}>
          <Search search={search} setSearch={setSearch}/>
          <div className={styles.right}>
            <SelectedColumns />
            <button onClick={() => setAddModal(true)} className={styles.addJob}><span>+ Add Job</span></button>
          </div>
        </div>
      </Layout>

      <Modal isOpen={addModal} setIsOpen={setAddModal}><AddJob setIsOpen={setAddModal}/></Modal>
      {loading && <Loading />}
    </>
  );
}
