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
      links: true,
    },
  });

  return projects;
};
