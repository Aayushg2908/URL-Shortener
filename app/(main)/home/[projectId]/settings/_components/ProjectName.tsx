"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Project } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteProject, updateProject } from "@/actions/project";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1).max(20),
});

const ProjectName = ({ project }: { project: Project & { links: Link[] } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
    },
  });

  useEffect(() => {
    if (project.name === form.getValues("name")) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [project.name, form.getValues("name")]);

  useEffect(() => {
    form.reset({
      name: project.name,
    });
  }, [project.name]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await updateProject(project.id, values);
      toast.success("Project name updated!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProject(project.id);
      toast.success("Project deleted Successfully!");
      router.push("/home");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2 mt-8">
      <h1 className="font-bold text-2xl">Project Name</h1>
      <p>This is the Name of your project on Shorten.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading || isDisabled} type="submit">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
      <h1 className="text-red-500 font-bold text-2xl mt-8">Danger zone</h1>
      <p className="text-red-500">
        This is will permanentaly delete your project
      </p>
      <Button
        disabled={isLoading}
        onClick={handleDelete}
        className="w-fit bg-red-600 text-white hover:bg-red-700"
      >
        Delete Project
      </Button>
    </div>
  );
};

export default ProjectName;
