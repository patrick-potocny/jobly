import React, { ReactNode } from 'react'
import styles from '@/styles/components/NoneFound.module.scss'

export default function NoneFound({ children }: { children: ReactNode }) {
  return (
    <div className={styles.noJobs}>{children}</div>
  )
}
