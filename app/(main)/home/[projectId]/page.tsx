import { getProjectById } from "@/actions/project";
import CreateLinkButton from "./_components/CreateLinkButton";
import { notFound } from "next/navigation";

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;

  const project = await getProjectById(projectId);
  if (!project) {
    return notFound();
  }

  return (
    <>
      <div className="h-[150px] w-full border-b border-b-gray-500 flex items-center justify-around">
        <h1 className="font-bold text-2xl md:text-4xl">My Links</h1>
        <CreateLinkButton projectId={projectId} />
      </div>
      {project.links.length > 0 ? (
        <div className="flex flex-col gap-y-2 w-full items-center">
          {project.links.map((link) => (
            <div key={link.id}>Links</div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center mt-10 font-bold text-3xl text-red-500">
          No Links found...
        </div>
      )}
    </>
  );
};

export default ProjectPage;
