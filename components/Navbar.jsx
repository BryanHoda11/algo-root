'use client'
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {

    return (
        <>
            <div className='flex justify-between items-center px-5 sm:px-10 py-5'>
                <Link href='/' className="text-xl font-semibold cursor-pointer">ALGO-ROOT</Link>

                <div className='flex gap-3 items-center'>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </>
    )
}

export default Navbar
