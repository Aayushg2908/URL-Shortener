"use client";

import { Button } from "@/components/ui/button";
import { useLinkModal } from "@/hooks/use-link-modal";

const CreateLinkButton = ({ projectId }: { projectId: string }) => {
  const { onOpen } = useLinkModal();

  return (
    <Button onClick={() => onOpen(projectId, "Create")} className="font-bold">
      Create Link
    </Button>
  );
};

export default CreateLinkButton;
