"use server";

import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
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

  const shortUrlSlugExists = await db.link.findUnique({
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

export const deleteLink = async (linkId: string, projectId: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const link = await db.link.delete({
    where: {
      userId,
      id: linkId,
    },
  });

  redis.del(`link:${link.shortUrlSlug}`);

  revalidatePath(`/home`);
  revalidatePath(`/home/${projectId}`);
};

export const updateLink = async (
  linkId: string,
  projectId: string,
  values: {
    longUrl: string;
    shortUrlSlug: string;
  }
) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const shortUrlSlugExists = await db.link.findUnique({
    where: {
      shortUrlSlug: values.shortUrlSlug,
    },
  });
  if (shortUrlSlugExists) {
    return {
      status: 400,
    };
  }

  const link = await db.link.findUnique({
    where: {
      id: linkId,
      userId,
    },
  });
  if (!link) {
    throw new Error("Link not found");
  }

  redis.del(`link:${link.shortUrlSlug}`);

  await db.link.update({
    where: {
      id: linkId,
      userId,
      projectId,
    },
    data: {
      longUrl: values.longUrl,
      shortUrlSlug: values.shortUrlSlug,
    },
  });

  revalidatePath(`/home`);
  revalidatePath(`/home/${projectId}`);

  return {
    status: 200,
  };
};

export const handleRedirect = async (domain: string) => {
  const redisLink = await redis.get(`link:${domain}`);
  if (redisLink) {
    return redisLink;
  }

  const link = await db.link.findUnique({
    where: {
      shortUrlSlug: domain,
    },
  });
  if (!link) {
    return null;
  }

  await db.link.update({
    where: {
      shortUrlSlug: domain,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  if (link.clicks > 5) {
    redis.set(`link:${domain}`, link.longUrl);
  }

  return link.longUrl;
};
