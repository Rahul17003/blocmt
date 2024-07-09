"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import Image from "next/image";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const session = useSession();
  return (
    <main className="">
      <SignedOut>
      <LandingPage></LandingPage>
      </SignedOut>
      <SignedIn>
      <SignOutButton>
        <Button>Sign out</Button>
      </SignOutButton></SignedIn>
    </main>
  );
}
