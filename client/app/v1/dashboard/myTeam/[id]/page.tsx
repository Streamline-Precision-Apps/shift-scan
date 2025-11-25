<<<<<<< HEAD
=======
"use client";
import { useUserStore } from "@/app/lib/store/userStore";
>>>>>>> 95da5110 (save no static)
import FormPageClient from "./FormPageClient";

<<<<<<< HEAD
// Static params generator for Next.js App Router
export async function generateStaticParams() {
  const ids = await getAllTeamIds();
  return ids.map((id: string) => ({ id }));
}

// Server Component: receives params and passes id to client component

const Page = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = await params; // unwrap the promise
  const id = resolvedParams.id;

=======
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
>>>>>>> 95da5110 (save no static)
  return <FormPageClient id={id} />;
}
