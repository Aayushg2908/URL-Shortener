import { getProjectById } from "@/actions/project";
import Topbar from "./_components/Topbar";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

const ProjectLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const project = await getProjectById(params.projectId);
  if (!project) {
    return notFound();
  }

  return (
    <>
      <Topbar projectId={params.projectId} />
      {children}
    </>
  );
};

export default ProjectLayout;
