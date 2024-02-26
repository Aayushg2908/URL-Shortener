import { auth } from "@clerk/nextjs";
import Example from "./_components/Example";
import Navbar from "./_components/Navbar";
import { redirect } from "next/navigation";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (userId) {
    return redirect("/home");
  }

  return (
    <>
      <Navbar />
      {children}
      <Example />
    </>
  );
};

export default MarketingLayout;
