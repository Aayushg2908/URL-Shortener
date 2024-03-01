import { getProjectById } from "@/actions/project";
import CreateLinkButton from "./_components/CreateLinkButton";
import { notFound } from "next/navigation";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import CopyUrlButton from "./_components/CopyUrlButton";
import Actions from "./_components/Actions";

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const user = await currentUser();
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
        <div className="mt-10 flex flex-col gap-y-4 w-full items-center">
          {project.links.map((link) => (
            <div
              key={link.id}
              className="px-2 w-[320px] sm:w-[450px] md:w-[550px] h-[80px] border border-gray-500 rounded-xl transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-x-3">
                <Image
                  src={user?.imageUrl || ""}
                  alt="userlogo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-y-1">
                  <div className="flex items-center gap-x-2">
                    <Link
                      target="_blank"
                      href={`http://localhost:3000/${link.shortUrlSlug}`}
                      className="text-blue-500"
                    >
                      localhost:3000/{link.shortUrlSlug}
                    </Link>
                    <CopyUrlButton
                      link={`localhost:3000/${link.shortUrlSlug}`}
                    />
                  </div>
                  <Link
                    target="_blank"
                    href={link.longUrl}
                    className="text-sm text-gray-400 max-sm:w-[200px] line-clamp-2"
                  >
                    {link.longUrl}
                  </Link>
                </div>
              </div>
              <Actions link={link} projectId={projectId} />
            </div>
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
