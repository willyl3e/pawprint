'use client'

import styles from '@/app/admin/admin.module.css'
import { signOut } from "next-auth/react";

export default function LogOut() {
  return <button onClick={() => signOut()} className={`${styles.adminButton} ${styles.standard}`} style={{marginBottom:".5em"}}>Sign out</button>;
}
