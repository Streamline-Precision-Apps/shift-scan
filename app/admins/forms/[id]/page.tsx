"use client";
import FormPageClient from "./FormPageClient";

<<<<<<< HEAD:app/admins/forms/[id]/page.tsx
interface PageProps {
  params: { id: string };
}

// Static params generator for Next.js App Router
export async function generateStaticParams() {
  const ids = await getAllFormTemplatesIds();
  return ids.map((id: string) => ({ id }));
}

// Server Component: receives params and passes id to client component
const FormPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;

=======
export default function FormPage({ params }: { params: { id: string } }) {
  const { id } = params;
>>>>>>> 95da5110 (save no static):client/app/admins/forms/[id]/page.tsx
  return <FormPageClient id={id} />;
}
