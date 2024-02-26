"use client";

import { useEffect, useState } from "react";
import CreateProjectModal from "../CreateProjectModal";

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
    </>
  );
};
