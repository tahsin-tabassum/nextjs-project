"use client";

import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitlog } from "@/context/FItLogContext";

const Nav = () => {

const pathname = usePathname();

const {plan, saved} = useFitlog();

// const isPlanPage = pathname === "/my-plan";
// const isWorkoutPage = pathname === "/" || pathname.startsWith ("/workout/");

    return (
        <nav className="sticky top-0 z-50 h-16 border-b border-[#202328] bg-[#0B0D0F]">
           
           <div className="mx-auto flex h-full max-w-275 items-center justify-between px-6">
           <div className="flex items-center gap-2">
           <Image src={logo} alt={'logo'} width={32}
            height={32}
            className="object-contain" />   <span className="text-lg font-extrabold tracking-wide text-white">
            FITLOG
          </span></div>
        
             
            {/* nav */}
            <div className="flex items-center gap-2 text-sm">
 <Link href="/" className={`rounded-full px-4 py-2 transition ${
 pathname=== "/"   ? "bg-[#182000] font-medium text-[#CCFF00]"
                : "text-[#8B9099] hover:text-white"
 }`}> 
 Workouts
 </Link>

  <Link href="/my-plan" className={`rounded-full px-4 py-2 transition ${
    pathname=== "/my-plan" 
     ? "bg-[#182000] font-medium text-[#CCFF00]"
                : "text-[#8B9099] hover:text-white"
  }`}>
   My Plan
 </Link>
            </div>


            <div className="flex items-center gap-6 text-xs">
                 <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[#B5BAC3]"
          > <span>Plan</span>

          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#CCFF00] px-1 text-[9px] font-bold text-black">{plan.length}</span>

          </Link>

           <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[#8B9099]"
          > <span>Saved</span>
<span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#CCFF00] px-1 text-[9px] font-bold text-black">{saved.length}</span>


          </Link>
            </div>
</div>
        </nav>
    );
};

export default Nav;