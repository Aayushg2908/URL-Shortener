import { handleRedirect } from "@/actions/links";
import { notFound, redirect } from "next/navigation";

const RedirectToLinkPage = async ({
  params,
}: {
  params: { domain: string };
}) => {
  const { domain } = params;

  const data = await handleRedirect(domain);
  if (data) {
    return redirect(data);
  }

  return notFound();
};

export default RedirectToLinkPage;
