import { auth, signIn, signOut } from "@/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) {
    return redirect("/");
  } else {
    return (
      <section className="h-full w-full flex items-center justify-center">
        <div className="w-[1000px] h-[600px] border-2 p-4">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button type="submit">Sign in</button>
          </form>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
          {children}
        </div>
      </section>
    );
  }
}
