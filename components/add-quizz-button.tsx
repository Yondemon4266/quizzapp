"use client";

import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

export default function AddQuizzButton() {
  return (
    <Link
      className={buttonVariants({ variant: "default" })}
      href={"/create-quizz"}
    >
      Add a quizz
    </Link>
  );
}
