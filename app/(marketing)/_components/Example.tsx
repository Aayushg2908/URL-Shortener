"use client";

import { CopyIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const Example = () => {
  return (
    <div className="mt-20 w-full flex justify-center">
      <div className="border-t border-t-orange-500 rounded-md h-[70px] w-fit sm:w-[400px] flex gap-x-4 p-2 shadow-lg shadow-orange-500/50">
        <Image src="/logo.png" alt="logo" width={50} height={100} />
        <div className="ml-2 flex flex-col gap-y-1">
          <div className="flex gap-x-2 items-center">
            <Link href="http://localhost:3000/try" className="text-blue-500">
              localhost:3000/try
            </Link>
            <CopyIcon
              onClick={() => {
                navigator.clipboard.writeText("localhost:3000/try");
                toast.success("Copied to clipboard!");
              }}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
          <Link href="/sign-in" className="text-sm hover:underline">
            http://localhost:3000/sign-in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Example;
