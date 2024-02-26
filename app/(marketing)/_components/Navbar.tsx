import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between w-full px-4 h-[70px]">
      <div className="flex gap-x-2">
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={100}
          className="h-12 w-10"
        />
        <h1 className="font-extrabold text-3xl sm:text-4xl">Shorten</h1>
      </div>
      <div className="flex gap-x-2">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "rounded-full",
              size: "sm",
            })
          )}
        >
          Login
        </Link>
        <Link
          className={cn(
            buttonVariants({
              className: "rounded-full",
              size: "sm",
            })
          )}
          href="/sign-up"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
