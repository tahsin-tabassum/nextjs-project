import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";

const Nav = () => {
    return (
        <nav className="sticky top-0 z-50 h-16 border-b border-[#202328] bg-[#0B0D0F]">
           
           <div className="mx-auto flex h-full max-w-275 items-center justify-between px-6">
           <div className="flex items-center gap-2">
           <Image src={logo} alt={'logo'}  />   <span className="text-lg font-extrabold tracking-wide text-white">
            FITLOG
          </span></div>
        
             
            {/* nav */}
            <div className="flex items-center gap-2 text-sm">
 <Link href="/" className="rounded-full bg-[#182000] px-4 py-2 font-medium text-[#CCFF00]"> 
 Workouts
 </Link>

  <Link href="/my-plan" className=" px-4 py-2  text-[#8B9099] transition hover:text-white">
   My Plan
 </Link>
            </div>


            <div className="flex items-center gap-6 text-xs">
                 <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[#B5BAC3]"
          > <span>Plan</span>
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#CCFF00] px-1 text-[9px] font-bold text-black">0</span>

          </Link>
           <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[#8B9099]"
          > <span>Saved</span>
<span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#CCFF00] px-1 text-[9px] font-bold text-black">0</span>


          </Link>
            </div>
</div>
        </nav>
    );
};

export default Nav;