"use client";
import { LuBoxes, LuClipboardCheck, LuLayoutDashboard } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useOrganization, useSession, useUser } from "@clerk/nextjs";
import Image from "next/image";
import LandingPage from "@/components/LandingPage";
import { CardWithForm } from "@/components/CardWithForm";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Progress } from "@/components/ui/progress"
import { CreateTaskPopover } from "@/components/CreateTaskPopover";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { TaskCard } from "./taskCard";
import { UpdateTask } from "@/components/UpdateTask";
import { FileIcon } from "lucide-react";
import Link from "next/link";


export default function TasksPage() {
  const organization = useOrganization();
  const user = useUser()
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const Tasks = useQuery(api.tasks.getTasks, orgId ? { orgId } : 'skip')
  const createTask = useMutation(api.tasks.createTask)
  const session = useSession();
  return (
    <main className="">
      <SignedOut>
        <LandingPage></LandingPage>
      </SignedOut>
      <SignedIn>
        <div className=" mx-10 pt-12 ">
          <div className="flex justify-between items-center mb-10">
            <h1 className=" font-bold text-3xl text-indigo-600">Tasks</h1>
            <CreateTaskDialog />
          </div>
            

            <div className="w-full grid grid-cols-3 gap-4">
              {Tasks?.map((Task) => {
                return <TaskCard key={Task._id} Task={Task} />
              })}
            </div>


        </div></SignedIn>
    </main>
  );
}
