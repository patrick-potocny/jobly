import React from 'react'
import styles from '@/styles/pages/404.module.scss'
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  function backToHomePage() {
    router.push('/');
  }

  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={backToHomePage}>Back to HomePage</button>
    </div>
  )
}
