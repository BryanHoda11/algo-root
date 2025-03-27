"use client";

import { useEffect } from "react";
import { SignInButton, SignUpButton, SignedOut, SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/Dashboard"); // Redirect to dashboard
    }
  }, [isSignedIn, router]);

  return (
    <>
      <div className="w-[80%] flex flex-col mt-20 items-center justify-center gap-3 mx-auto">
        <h2 className="text-2xl sm:text-3xl text-center font-semibold animate-pulse">Welcome to Algo Root!</h2>

        <div className="flex flex-col gap-3 justify-center w-full sm:w-1/2 items-center my-5 p-4">
          <SignedOut>
            <SignInButton>
              <button className='bg-gray-700 w-full sm:w-[40%] hover:bg-gray-800 rounded-lg px-3 py-2 cursor-pointer'>Sign in</button>
            </SignInButton>
            <hr className="w-[25%] opacity-75 mx-auto my-4 border-t border-gray-600" />
            <SignUpButton>
              <button className='bg-gray-700 w-full sm:w-[40%] hover:bg-gray-800 rounded-lg px-3 py-2 cursor-pointer'>Sign up</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </>
  );
}
