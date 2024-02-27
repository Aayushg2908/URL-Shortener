"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Topbar = ({ projectId }: { projectId: string }) => {
  const pathname = usePathname();

  const isLinks = pathname === `/home/${projectId}`;
  const isAnalytics = pathname === `/home/${projectId}/analytics`;
  const isSettings = pathname === `/home/${projectId}/settings`;

  return (
    <nav className="border-b border-b-gray-500 w-full">
      <div className="h-[50px] max-w-5xl mx-auto flex items-center gap-x-10 justify-start pl-2">
        <Link
          href={`/home/${projectId}`}
          className={cn(isLinks && "text-blue-500 font-bold")}
        >
          Links
        </Link>
        <Link
          href={`/home/${projectId}/analytics`}
          className={cn(isAnalytics && "text-blue-500 font-bold")}
        >
          Analytics
        </Link>
        <Link
          href={`/home/${projectId}/settings`}
          className={cn(isSettings && "text-blue-500 font-bold")}
        >
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Topbar;
