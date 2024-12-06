'use client'

import "@/app/admin/admin.css"

import { signOut } from "next-auth/react";

export default function LogOut() {
  return <button onClick={() => signOut()} className="adminButton standard" style={{marginBottom:".5em"}}>Sign out</button>;
}
