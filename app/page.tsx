import { auth } from "@/auth";
import AddQuizzButton from "@/components/add-quizz-button";
import PaginationHome from "@/components/pagination-home";
import QuizzCardList from "@/components/quizz-card-list";
import Searchbar from "@/components/searchbar";
import React from "react";
import {
  getQuizzesByTitleOrAuthorAndByPage,
  getQuizzesQueryAndPageTotalPages,
} from "./actions/quizz-actions";
import { QuizzListWithQuestionsType } from "./types";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const session = await auth();
  const quizzes: QuizzListWithQuestionsType | null =
    await getQuizzesByTitleOrAuthorAndByPage(query, currentPage);
  const totalPages = await getQuizzesQueryAndPageTotalPages(query);

  return (
    <main className="flex flex-col gap-16">
      <div className="flex flex-col gap-8 items-center justify-center">
        <Searchbar />
        {session?.user?.id && <AddQuizzButton />}
      </div>

      {quizzes && <QuizzCardList quizzes={quizzes} />}
      {!quizzes && <p>No quizzes found</p>}
      {quizzes && <PaginationHome totalPages={totalPages} />}
    </main>
  );
}
