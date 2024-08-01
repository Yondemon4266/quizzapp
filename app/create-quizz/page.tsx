import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CreateQuizzForm from "./create-quizz-form";

export default async function CreateQuizzPage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  } else {
    return (
      <div>
        <h2 className="text-center text-xl mb-6 uppercase">Quizz creation</h2>
        <CreateQuizzForm />
      </div>
    );
  }
}
