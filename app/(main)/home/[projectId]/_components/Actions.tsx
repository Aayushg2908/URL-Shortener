"use client";

import { deleteLink } from "@/actions/links";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLinkModal } from "@/hooks/use-link-modal";
import { Link } from "@prisma/client";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Actions = ({ link, projectId }: { link: Link; projectId: string }) => {
  const { onOpen } = useLinkModal();

  const handleEdit = () => {
    onOpen(projectId, "Edit", link);
  };

  const handleDelete = async () => {
    try {
      await deleteLink(link.id, link.projectId);
      toast.success("Link deleted successfully");
    } catch (error) {
      toast.error("Failed to delete the link");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreVertical className="w-4 h-4 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleEdit}
          className="cursor-pointer space-x-2"
        >
          <Edit className="w-6 h-6" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleDelete}
          className="cursor-pointer space-x-2 text-red-500 hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="w-6 h-6" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
