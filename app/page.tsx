import AddQuizzButton from "@/components/add-quizz-button";
import PaginationHome from "@/components/pagination-home";
import QuizzCardList from "@/components/quizz-card-list";
import Searchbar from "@/components/searchbar";
import React from "react";

export default async function Home() {
  return (
    <main className="flex flex-col gap-16">
      <div className="flex flex-col gap-8 items-center justify-center">
        <Searchbar />
        <AddQuizzButton />
      </div>
      <QuizzCardList />
      <PaginationHome />
    </main>
  );
}
