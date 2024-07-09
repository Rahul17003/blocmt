"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useOrganization, useSession } from "@clerk/nextjs";
import Image from "next/image";
import LandingPage from "@/components/LandingPage";
import { CardWithForm } from "@/components/CardWithForm";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Progress } from "@/components/ui/progress"

export default function Home() {
  const { organization } = useOrganization();
  const Tasks = useQuery(api.tasks.getTasks, organization?.id ? { orgId: organization.id } : 'skip')
  const createTask = useMutation(api.tasks.createTask)
  const session = useSession();
  return (
    <main className="">
      <SignedOut>
      <LandingPage></LandingPage>
      </SignedOut>


      <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        {Tasks?.map((Task)=>{
          return <div key={Task._id}>
            {Task.taskName}
            <Progress value={Task.workDone} />
            </div>
        })}

        <Button onClick={()=>{
          if(!organization) return;
          createTask({
            orgId: organization?.id,
            taskName: 'Interior Painting',
            taskCategory: 'Painting',
            dueDate: '12-10-2024',
            workDone: 68, 
            skilledWorkers: 4,
            unSkilledWorkers: 2,
            assignedTo: 'Dog',
            priority: 'High' ,
            remarks: 'Complete soon',
          })
        }}>Create Task</Button>
      </SignedIn>
      </div>
    </main>
  );
}
