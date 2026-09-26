import Logo from "../assets/logo.png";
import Banner from "../assets/banner.png";

import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Library from '../components/Library';

export default function Home() {
  return (
    <main>
<Nav/>
<Hero/>
<section id="library" className="min-h-125 bg-[#0B0D0F] px-6 py-20">
<div className="mx-auto max-w-262.5">
   <h2 className="text-3xl font-bold text-white">
            Workout Library
          </h2>
</div>
</section>
<Library/>
    </main>

    
  );
}
