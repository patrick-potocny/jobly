import React, { useEffect, useState } from 'react'
import styles from './Progress.module.scss'

export default function Progress({value}: {value: string}) {
  const [color, setColor] = useState(styles.notApplied)

  useEffect(() => {
    if (value === 'Not Applied') setColor(styles.notApplied)
    if (value === 'Applied') setColor(styles.applied)
    if (value === 'Interview') setColor(styles.interview)
    if (value === 'Offer') setColor(styles.offer)
    if (value === 'Rejected') setColor(styles.rejected)
  }, [value])
  
  return (
    <div className={color}>{value}</div>
  )
}
