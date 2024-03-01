"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLinkModal } from "@/hooks/use-link-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
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
import { Loader } from "lucide-react";
import { createLink, updateLink } from "@/actions/links";

const linkSchema = z.object({
  longUrl: z.string().url(),
  shortUrlSlug: z.string().min(3).max(8),
});

const LinkModal = () => {
  const { type, link, projectId, isOpen, onClose } = useLinkModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      longUrl: link?.longUrl || "",
      shortUrlSlug: link?.shortUrlSlug || "",
    },
  });

  useEffect(() => {
    if (link) {
      form.reset({
        longUrl: link.longUrl,
        shortUrlSlug: link.shortUrlSlug,
      });
    }
  }, [link]);

  async function onSubmit(values: z.infer<typeof linkSchema>) {
    try {
      setIsLoading(true);
      if (type === "Create") {
        const data = await createLink(projectId, values);
        if (data.status === 400) {
          toast.error("Slug already exists");
        } else {
          toast.success("Link created successfully");
          onClose();
          form.reset();
        }
      } else {
        if (!link) return;
        const data = await updateLink(link.id, projectId, values);
        if (data.status === 400) {
          toast.error("Slug already exists");
        } else {
          toast.success("Link updated successfully");
          onClose();
          form.reset();
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      onClose();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "Create" ? "Create A New Link" : "Edit Link"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="longUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://ui.shadcn.com/components"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortUrlSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Link Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    Short link can be accessed by localhost:3000/shadcn
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="w-full flex items-center gap-x-1"
              type="submit"
            >
              {isLoading && <Loader className="w-6 h-6 animate-spin" />}
              {type === "Create" ? "Create Link" : "Edit Link"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkModal;
