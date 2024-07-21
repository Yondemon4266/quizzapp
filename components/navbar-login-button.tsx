"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function NavbarLoginButton() {
  return (
    <Button asChild variant={"default"}>
      <Link href={"/login"}>Login</Link>
    </Button>
  );
}
