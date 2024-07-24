import { Question, Quizz } from "@prisma/client";

export type QuizzListWithQuestionsType = (Quizz & { questions: Question[] })[];
export type QuizzWithQuestionsType = Quizz & { questions: Question[] };
