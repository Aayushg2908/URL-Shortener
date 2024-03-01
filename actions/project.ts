"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createProject = async (name: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  await db.project.create({
    data: {
      name,
      userId,
    },
  });

  revalidatePath("/home");
};

export const getAllProjects = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const projects = await db.project.findMany({
    where: {
      userId,
    },
    include: {
      links: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return projects;
};

export const getProjectById = async (projectId: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const project = await db.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    include: {
      links: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return project;
};
