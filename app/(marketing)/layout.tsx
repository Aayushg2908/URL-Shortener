import Example from "./_components/Example";
import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Example />
    </>
  );
};

export default MarketingLayout;
