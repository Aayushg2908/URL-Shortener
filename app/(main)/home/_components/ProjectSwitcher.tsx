"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateProjectModal } from "@/hooks/use-createproject-modal";
import { cn } from "@/lib/utils";
import { Link, Project } from "@prisma/client";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectSwitcherProps {
  projects: (Project & { links: Link[] })[];
}

const ProjectSwitcher = ({ projects }: ProjectSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const { onOpen } = useCreateProjectModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = projects.map((project) => ({
    label: project.name,
    value: project.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.projectId
  );

  const onStoreSelect = (project: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${project.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className="w-[200px] justify-between"
        >
          {currentStore ? currentStore.label : "Select a Project"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Project..." />
            <CommandEmpty>No Project found</CommandEmpty>
            <CommandGroup heading="Projects">
              {formattedItems.map((project) => (
                <CommandItem
                  key={project.value}
                  onSelect={() => onStoreSelect(project)}
                  className="text-sm cursor-pointer"
                >
                  {project.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === project.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onOpen();
                }}
                className="cursor-pointer"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectSwitcher;
