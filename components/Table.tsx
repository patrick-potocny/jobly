// Disabling ts-check because react-table types are not up to date
/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { processJobs } from "@/lib/utils";
import { CompanyType } from "@/lib/types";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import EditJob from "@/components/table/EditJob";
import styles from "@/styles/components/Table.module.scss";
import Remote from "@/components/table/Remote";
import Image from "next/image";
import linkIcon from "@/public/images/link.svg";
import Fit from "@/components/table/Fit";
import Progress from "@/components/table/Progress";
import WebLink from "@/components/table/WebLink";
import Search from "@/components/Search";
import SelectedColumns from "@/components/SelectedColumns";
import Modal from "@/components/Modal";
import Job from "@/components/Job";
import NoneFound from "@/components/NoneFound";
import Loading from "./Loading";

export default function Table() {
  const [jobs, setJobs] = useState([]);
  const [noJobs, setNoJobs] = useState(false);
  const [user] = useAuthState(auth);
  const [addModal, setAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Error handling
    if (user) {
      async function getUserJobs() {
        setLoading(true);
        const jobsRef = collection(db, `users/${user.uid}/jobs`);
        const jobsDoc = await getDocs(jobsRef);
        const processedJobs = processJobs(
          jobsDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setNoJobs(false);
        if (processedJobs.length === 0) setNoJobs(true);

        setJobs(processedJobs);
        setLoading(false);
      }

      getUserJobs();
    }
  }, [user]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "id",
        Cell: ({ value }: { value: string }) => <EditJob id={value} />,
      },
      {
        Header: "Company",
        accessor: "company",
        Cell: ({ value }: { value: CompanyType }) => (
          <WebLink value={value.companyWebsite}>{value.companyName}</WebLink>
        ),
      },
      {
        Header: "Job Title",
        accessor: "jobTitle",
      },
      {
        Header: "Pay",
        accessor: "pay",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Remote",
        accessor: "remote",
        Cell: ({ value }: { value: string }) => <Remote value={value} />,
      },
      {
        Header: "Listing",
        accessor: "jobListingLink",
        Cell: ({ value }: { value: string }) => (
          <WebLink value={value}>
            <Image src={linkIcon} alt="Link" width={32} />
          </WebLink>
        ),
      },
      {
        Header: "Fit",
        accessor: "fit",
        Cell: ({ value }: { value: number }) => <Fit value={value} />,
      },
      {
        Header: "Contact",
        accessor: "contact",
        Cell: ({ value }: { value: string[] }) => (
          <div>
            {value.map((contact, i) => (
              <p key={i}>{contact}</p>
            ))}
          </div>
        ),
      },
      {
        Header: "Progress",
        accessor: "progress",
        Cell: ({ value }: { value: string }) => <Progress value={value} />,
      },
    ],
    []
  );

  const tableInstance = useTable(
    { columns, data: jobs },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    allColumns,
  } = tableInstance;

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <Search
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
        <div className={styles.right}>
          <SelectedColumns cols={allColumns} />
          <button onClick={() => setAddModal(true)} className={styles.addJob}>
            <span>+ Add Job</span>
          </button>
        </div>
      </div>
      {noJobs ? (
        <NoneFound>
          No jobs found, <br /> press the + Add Job button ➚
        </NoneFound>
      ) : loading ? <Loading /> : (
        <div className={styles.tableWrapper}>
          <table {...getTableProps()} className={styles.table}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(
                        column.getSortByToggleProps({ title: undefined })
                      )}
                    >
                      {column.render("Header")}
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={addModal} setIsOpen={setAddModal}>
        <Job setIsOpen={setAddModal} />
      </Modal>
    </div>
  );
}
