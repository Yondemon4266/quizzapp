"use server";

import prisma from "@/prisma/db";
import { Question, Quizz } from "@prisma/client";
import {
  CreateInitialQuizzFormValuesType,
  formSchema,
} from "../create-quizz/create-quizz-form";

const QUIZZ_PER_PAGE = 5;

export async function getQuizzesByTitleOrAuthorAndByPage(
  query: string,
  page: number
) {
  try {
    const quizzes: (Quizz & { questions: Question[] })[] =
      await prisma.quizz.findMany({
        skip: (page - 1) * QUIZZ_PER_PAGE,
        take: QUIZZ_PER_PAGE,
        where: {
          OR: [
            {
              title: {
                contains: query,
              },
            },
            {
              userName: { mode: "insensitive", contains: query },
            },
          ],
        },
        include: { questions: true },
      });

    if (quizzes) {
      return quizzes;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuizzesQueryAndPageTotalPages(query: string) {
  try {
    const quizzesCount = await prisma.quizz.count({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            userName: { mode: "insensitive", contains: query },
          },
        ],
      },
    });
    const totalPages = Math.ceil(quizzesCount / QUIZZ_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createInitialQuizz(
  formData: CreateInitialQuizzFormValuesType
) {
  console.log(formData);

  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
}
