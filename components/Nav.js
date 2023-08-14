import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="bg-white p-5 min-w-[640px]">
      <ul className="flex flex-row gap-x-2">
        <li className="ml-auto">
          <Link href="#">Home</Link>
        </li>
        <li>
          <Link href="#">About</Link>
        </li>
        <li>
          <Link href="#">Jikan API</Link>
        </li>
      </ul>
    </nav>
  );
}
