import React, { useEffect, useState } from 'react'
import styles from '@/styles/components/table/Remote.module.scss'

export default function Remote({ value }: { value: string }) {
  const [color, setColor] = useState(styles.remote)

  useEffect(() => {
    if (value === 'Remote') setColor(styles.remote)
    if (value === 'On Site') setColor(styles.onSite)
    if (value === 'Hybrid') setColor(styles.hybrid)
  }, [value])

  return (
    <div className={color}>{value}</div>
  )
}
