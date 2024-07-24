import { QuizzWithQuestionsType } from "@/app/types";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";

export default function QuizzCard({
  quizz,
}: {
  quizz: QuizzWithQuestionsType;
}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{quizz.title}</CardTitle>
        <CardDescription></CardDescription>
        <AspectRatio ratio={16 / 9}>
          <Image src={quizz.picture} alt={`${quizz.title} picture`} fill />
        </AspectRatio>
      </CardHeader>
      <CardContent>{quizz.description}</CardContent>
      <CardFooter className="flex justify-end">
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
