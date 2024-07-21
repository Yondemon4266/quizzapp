"use client";
import React from "react";
import { Input } from "@/components/ui/input";

export default function Searchbar() {
  return (
    <Input
      type="text"
      placeholder="Search a quizz..."
      className="w-fit text-center placeholder:text-center"
    />
  );
}
