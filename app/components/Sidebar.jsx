import React from "react";
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="col-span-2 bg-slate-300">
      Sidebar
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/domains">Apontamentos</Link></li>
      </ul>
    </div>
  );
}
