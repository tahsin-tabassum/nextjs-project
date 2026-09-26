import Image from "next/image";
import Banner  from "../assets/banner.png";
const Hero = () => {
    return (
        <section className="border-x border-[#1688C9] bg-[#0B0D0F] px-6 py-10">
        <div className="mx-auto max-w-262.5">
            <div className="relative overflow-hidden rounded-2xl border border-[#292D33] bg-[#15181C]">
<div className="grid min-h-90 grid-cols-1 items-center px-8 py-10 md:grid-cols-2 md:px-11">

{/* left side */}
<div>
    <p className="mb-5 text-[10px] font-bold tracking-[0.15em] text-[#CCFF00]">
WORKOUT LIBRARY
    </p>
    <h1 className="max-w-140 text-5xl font-black uppercase leading-[0.98] tracking-tight text-white md:text-[52px]">
                TRAIN WITH INTENT. LOG EVERY SET.
              </h1>

              <p className="mt-5 max-w-130 text-sm leading-6 text-[#8D939D]">
                FitLog is a dark, no-nonsense gym companion: pick a lift,
                lock it into today&apos;s plan, and watch the week&apos;s work
                add up.
              </p>
              {/* cta */}
              <a href="#library" className="mt-6  inline-flex items-center gap-2 rounded-md bg-[#CCFF00] px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-black transition hover:bg-[#b8e600]">
                   Browse Workouts
              </a>
</div>

{/* right */}
<div className="flex justify-center md:justify-end">
<Image src={Banner} alt="banner" className="w-70 object-contain md:w-82.5"/>
</div>
</div>
            </div>
        </div>
        </section>
    );
};

export default Hero;