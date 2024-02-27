"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createLink = async (
  projectId: string,
  values: { longUrl: string; shortUrlSlug: string }
) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const shortUrlSlugExists = await db.link.findFirst({
    where: {
      shortUrlSlug: values.shortUrlSlug,
    },
  });
  if (shortUrlSlugExists) {
    return {
      status: 400,
    };
  }

  const link = await db.link.create({
    data: {
      longUrl: values.longUrl,
      shortUrlSlug: values.shortUrlSlug,
      projectId,
      userId,
    },
  });

  revalidatePath(`/home`);
  revalidatePath(`/home/${projectId}`);

  return {
    status: 200,
  };
};
