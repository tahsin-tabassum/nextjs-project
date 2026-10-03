import Image from "next/image";
import logo from "../assets/logo.png";
const Footer =() =>{
    return(
        <footer className="border-t border-[#1D2025] bg-[#171616]">
<div className="flex min-h-25   items-center justify-between px-6">

{/* {logo} */}
<div className="flex items-center gap-2">
           <Image src={logo} alt={'logo'}  />
    <span className="text-sm font-black tracking-wide text-white">
            FITLOG
          </span>

</div>
<p className="text-sm text-[#777D86]"> © 2026 FitLog — Workout Library. Train hard, log honest.</p>
</div>
        </footer>
    );
};


export default Footer;