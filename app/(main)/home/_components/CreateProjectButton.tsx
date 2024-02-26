"use client";

import { Button } from "@/components/ui/button";
import { useCreateProjectModal } from "@/hooks/use-createproject-modal";

const CreateProjectButton = () => {
  const { onOpen } = useCreateProjectModal();

  return (
    <Button onClick={() => onOpen()} className="font-bold">
      Create Project
    </Button>
  );
};

export default CreateProjectButton;
