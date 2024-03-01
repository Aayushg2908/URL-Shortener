import { getProjectById } from "@/actions/project";
import ProjectName from "./_components/ProjectName";
import { notFound } from "next/navigation";

const SettingsPage = async ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;

  const project = await getProjectById(projectId);
  if (!project) return notFound();

  return (
    <div className="mt-10 w-full max-w-5xl mx-auto px-2">
      <h1 className="font-bold text-3xl sm:text-5xl text-center">Settings</h1>
      <ProjectName project={project} />
    </div>
  );
};

export default SettingsPage;
