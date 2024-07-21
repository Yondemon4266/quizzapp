"use client";
import Image from "next/image";
import Link from "next/link";

import React from "react";

export default function NavbarTitleLogo() {
  return (
    <Link href="/">
      <Image src={"/textlogo.png"} alt="logo" width={140} height={50} />
    </Link>
  );
}
