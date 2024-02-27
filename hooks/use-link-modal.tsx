import { Link } from "@prisma/client";
import { create } from "zustand";

type Action = "Create" | "Edit";

interface LinkModalState {
  type: Action;
  projectId: string;
  link: Link | null;
  isOpen: boolean;
  onOpen: (projectId: string, type?: Action, link?: Link) => void;
  onClose: () => void;
}

export const useLinkModal = create<LinkModalState>((set) => ({
  type: "Create",
  projectId: "",
  link: null,
  isOpen: false,
  onOpen: (projectId, type, link) =>
    set(() => ({ projectId, isOpen: true, type, link })),
  onClose: () =>
    set(() => ({ isOpen: false, projectId: "", type: "Create", link: null })),
}));
