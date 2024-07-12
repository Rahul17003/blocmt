// import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuClipboardCheck, LuLayoutDashboard, LuBoxes } from "react-icons/lu";
// import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Blobo",
//   description: "Construction management tool",
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" flex flex-row">
    <div className="w-2/12 flex flex-col gap-6  mx-2 mt-12">
    <Link href="/dashboard/tasks">
      <Button variant={"link"} className="text-xl font-normal items-center gap-1"><LuClipboardCheck className="text-indigo-600" /> Tasks</Button>
    </Link>

    <Link href="/dashboard/analytics">
      <Button variant={"link"} className="text-xl font-normal  items-center gap-1"><LuLayoutDashboard className="text-indigo-600" /> Analytics</Button>
    </Link>

    <Link href="/dashboard/materials">
      <Button variant={"link"} className="text-xl font-normal items-center gap-1"><LuBoxes className="text-indigo-600" /> Materials</Button>
    </Link>
  </div>
  <div className="w-full ">
    {children}
  </div>
  </main>
  );
}
