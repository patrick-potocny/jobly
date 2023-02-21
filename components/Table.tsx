// Disabling ts-check because react-table types are not up to date
/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { processJobs } from "@/lib/utils";
import { CompanyType } from "@/lib/types";
import { useSortBy, useTable } from "react-table";
import EditJob from "@/components/table/EditJob";
import styles from "@/styles/components/Table.module.scss";
import Remote from "@/components/table/Remote";
import Image from "next/image";
import linkIcon from "@/public/images/link.svg";
import Fit from "@/components/table/Fit";
import Progress from "@/components/table/Progress";
import WebLink from "@/components/table/WebLink";

export default function Table() {
  const [jobs, setJobs] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const getUserJobs = async () => {
        const jobsRef = collection(db, `users/${user.email}/jobs`);
        const jobsDoc = await getDocs(jobsRef);
        setJobs(
          processJobs(
            jobsDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      };

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

  const tableInstance = useTable({ columns, data: jobs }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
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
  );
}
