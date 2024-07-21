import React from "react";
import QuizzCard from "./quizz-card";

export default function QuizzCardList() {
  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center">
      {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
        <QuizzCard key={letter} />
      ))}
    </div>
  );
}
