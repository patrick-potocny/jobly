import React from 'react'
import styles from '@/styles/components/table/Fit.module.scss'

export default function Fit({value}: {value: number}) {
  return (
    <div className={styles.fit}>{value}&#9733;</div>
  )
}
