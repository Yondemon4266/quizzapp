import React from "react";
import QuizzCard from "./quizz-card";
import { QuizzListWithQuestionsType } from "@/app/types";

export default function QuizzCardList({
  quizzes,
}: {
  quizzes: QuizzListWithQuestionsType;
}) {
  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center">
      {quizzes.map((quizz) => (
        <QuizzCard key={quizz.id} quizz={quizz} />
      ))}
    </div>
  );
}
