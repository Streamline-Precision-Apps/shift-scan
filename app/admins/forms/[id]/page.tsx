import { getAllFormTemplatesIds } from "../edit/[id]/formTemplates";
import FormPageClient from "./FormPageClient";

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
  const { id } = params;
  return <FormPageClient id={id} />;
};

export default FormPage;
