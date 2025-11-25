"use client";
import TeamMemberClientPage from "./_components/TeamMemberClientPage";

export default function TeamMemberPage({
  params,
}: {
  params: { id: string; employeeId: string };
<<<<<<< HEAD
}) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const employeeId = resolvedParams.employeeId;
  return <TeamMemberClientPage id={id} employeeId={employeeId} />;
};

export default TeamMemberPage;
=======
}) {
  return <TeamMemberClientPage id={params.id} employeeId={params.employeeId} />;
}
>>>>>>> 95da5110 (save no static)
