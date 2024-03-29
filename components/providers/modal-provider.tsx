"use client";

import { useEffect, useState } from "react";
import CreateProjectModal from "../CreateProjectModal";
import LinkModal from "../LinkModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateProjectModal />
      <LinkModal />
    </>
  );
};
