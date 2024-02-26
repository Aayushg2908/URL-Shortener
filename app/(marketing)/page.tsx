import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MarketingPage = () => {
  return (
    <main className="relative mt-20 flex flex-col items-center gap-y-8">
      <h1 className="font-bold text-4xl sm:text-5xl md:text-7xl flex flex-col items-center">
        <span>Short Links With</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-400">
          Superpowers
        </span>
      </h1>
      <p className="text-base md:text-xl text-center">
        Shorten is the open-source link management <br /> infrastructure for
        modern marketing teams.
      </p>
      <Link
        href="/sign-in"
        className={cn(
          buttonVariants({
            className: "rounded-full font-extrabold",
          })
        )}
      >
        Start for free
      </Link>
      <div className="-z-10 -inset-0.5 absolute m-auto h-[360px] w-[360px] opacity-40 bg-orange-500/90 blur-3xl rounded-full md:h-[450px] md:w-[550px]" />
    </main>
  );
};

export default MarketingPage;
