import { ModalProvider } from "@/components/providers/modal-provider";
import Navbar from "./_components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <ModalProvider />
    </>
  );
};

export default MainLayout;
