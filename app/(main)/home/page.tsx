import { getAllProjects } from "@/actions/project";
import CreateProjectButton from "./_components/CreateProjectButton";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2Icon, LinkIcon } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
  const projects = await getAllProjects();

  return (
    <>
      <div className="h-[150px] w-full border-b border-b-gray-500 flex items-center justify-around">
        <h1 className="font-bold text-2xl md:text-4xl">My Projects</h1>
        <CreateProjectButton />
      </div>
      {projects.length > 0 ? (
        <div className="mt-10 flex flex-col items-center sm:flex-row sm:flex-wrap gap-4 max-w-5xl mx-auto px-2">
          {projects.map((project) => {
            const clickCount = project.links.reduce(
              (acc, link) => acc + link.clicks,
              0
            );

            return (
              <Link href={`/home/${project.id}`} key={project.id}>
                <Card className="cursor-pointer hover:shadow-gray-500 hover:shadow-lg transition-all duration-400 w-[250px] border border-gray-500">
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardFooter className="flex gap-x-6">
                    <div className="flex gap-x-1">
                      <LinkIcon className="h-5 w-5" /> {project.links.length}{" "}
                      {project.links.length === 1 ? "link" : "links"}
                    </div>
                    <div className="flex gap-x-1">
                      <BarChart2Icon className="h-5 w-5" /> {clickCount}{" "}
                      {clickCount === 1 ? "click" : "clicks"}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center mt-10 font-bold text-3xl text-red-500">
          No projects found...
        </div>
      )}
    </>
  );
};

export default HomePage;
