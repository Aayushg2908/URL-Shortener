"use client";

import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

const CopyUrlButton = ({ link }: { link: string }) => {
  return (
    <CopyIcon
      onClick={() => {
        navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard");
      }}
      className="w-4 h-4 cursor-pointer"
    />
  );
};

export default CopyUrlButton;
