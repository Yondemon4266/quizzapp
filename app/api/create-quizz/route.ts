import { auth } from "@/auth";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB in bytes

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  category: z
    .string()
    .min(2, { message: "Category must be at least 2 characters" }),
  difficulty: z
    .string()
    .min(2, { message: "Difficulty must be at least 2 characters" }),
  picture: z
    .instanceof(File, { message: "Picture is required" })
    .refine(
      (file) =>
        file &&
        file instanceof File &&
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      {
        message:
          "Picture is required and must be a .png, .jpg, .jpeg, or .webp file",
      }
    )
    .refine((file) => file && file.size <= MAX_FILE_SIZE, {
      message: `Picture size should not exceed ${
        MAX_FILE_SIZE / (1024 * 1024)
      } MB.`,
    }),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id || !session.user.name) {
      return new NextResponse("Unauthorized, user is not authenticated.", {
        status: 401,
      });
    } else {
      const formData = await request.formData();
      const validatedData = formSchema.safeParse(
        Object.fromEntries(formData.entries())
      );
      if (validatedData.success) {
        // Check if the title already exists
        const existingQuiz = await prisma.quizz.findUnique({
          where: {
            title: formData.get("title") as string,
          },
        });
        if (existingQuiz) {
          return NextResponse.json(
            {
              message: "A quiz with this title already exists.",
              tag: "quiz-title-already-exists",
            },
            { status: 400 }
          );
        }
        // CREATE THE QUIZZ IF IT DOESN'T EXIST
        await prisma.quizz.create({
          data: {
            title: formData.get("title") as string,
            category: formData.get("category") as string,
            description: formData.get("description") as string,
            difficulty: formData.get("difficulty") as string,
            picture: "https://via.placeholder.com/150",
            userId: session.user.id,
            userName: session.user.name,
          },
        });
        return new NextResponse("Quizz created", { status: 201 });
      } else {
        return NextResponse.json(
          {
            message: "Invalid initial quizz creating form data ? ",
          },
          { status: 400 }
        );
      }
    }
  } catch (e: any) {
    return new Response(e, { status: 500 });
  }
}
