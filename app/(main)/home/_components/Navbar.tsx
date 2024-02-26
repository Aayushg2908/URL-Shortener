import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ProjectSwitcher from "./ProjectSwitcher";
import { getAllProjects } from "@/actions/project";

const Navbar = async () => {
  const projects = await getAllProjects();

  return (
    <nav className="border-b border-b-gray-500 h-[70px]">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <Link href="/home">
            <Image
              src="/logo.png"
              alt="logo"
              width={50}
              height={100}
              className="h-20 w-10"
            />
          </Link>
          <span className="text-2xl text-gray-400">/</span>
          <ProjectSwitcher projects={projects} />
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
