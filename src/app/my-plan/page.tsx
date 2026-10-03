"use client";
import Link from "next/link";
import { useState } from "react";
import { useFitlog } from "@/context/FItLogContext";
import Image from "next/image";


type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating" ;


export default function MyPlan () {
    const {
        plan,
    saved,
    removeFromPlan,
    removeFromSaved, 
    } = useFitlog();

const [activeTab, setActiveTab] = useState<Tab> ("plan");
const [sortBy, setSortBy] = 
useState <SortOption>("duration");

const [toast, setToast] = useState("");

//  Loading state


const totalMinutes = plan.reduce((total, workout) => total + workout.duration, 
0
);

const totalCalories = plan.reduce (
    (total, workout) => total + workout.caloriesBurned,
    0
);


const currentWorkouts = activeTab === "plan" ? plan: saved;

const sortedWorkouts = [...currentWorkouts].sort(


(a, b)=> {
if(sortBy === "duration"){
    return a.duration - b.duration;
}

if(sortBy === "calories"){
    return a.caloriesBurned - b.caloriesBurned;
}
  if (sortBy === "rating") {
        return b.rating - a.rating;
      }

return 0;

}
);

// toast

const showToast= (message: string) =>{
    setToast(message);

    setTimeout(()=> {
        setToast("");
    }, 2000);
};

// marked done

const handleDone = (id: number)=>{
    removeFromPlan(id);
    showToast("Workout marked as done");
};

// remove


const handleRemove = (id: number)=> {
    if(activeTab=== "plan"){
        removeFromPlan(id);
    }
    else{
        removeFromSaved(id);
    }
    showToast ("Workout removed");
};

return (
    <main className="min-h-screen bg-[#0B0D0F] text-white">
{/* toast */}
{toast && (
    <div className="fixed right-6 top-20 z-50 rounded-md bg-[#CCFF00] px-5 py-3 text-xs font-bold text-black shadow-lg">
{toast}
    </div>
)
}
{/* main */}
<section className="mx-auto min-h-[calc(100vh-145px)] max-w-235 px-6 py-9">
    <div>
        <h1 className="text-[28px] font-black uppercase leading-none tracking-tight">
            MY PLAN
        </h1 >
        <p className="mt-2 text-[12px] text-[#858B95]">
    Cap of five lifts for today. Finish them,
            then load more.
        </p>
    </div>

<div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-[#24282E] bg-[#12151A]">
<Metric
label = "Exercised"
value = {plan.length}
highlight
/>

   <Metric
            label="Minutes"
            value={totalMinutes}
          />

             <Metric
            label="Calories"
            value={totalCalories}
          />
</div>
<div className="mt-6 flex items-center justify-between">
<div className="flex rounded-xl border border-[#24282E] bg-[#111419] p-1">
<button 
onClick={()=> setActiveTab("plan")}
className={`rounded-md px-4 py-2 text-[10px] font-medium transition ${
    activeTab === "plan" ? "bg-[#20252D] text-[#CCFF00] shadow-sm" : "text-[#70757E] hover:text-white"
}`}

>
Today&apos;s Plan
</button>

<button 
onClick={()=> setActiveTab("saved")}
className={`rounded-md px-4 py-2 text-[10px] font-medium transition ${
    activeTab === "saved" ? "bg-[#20252D] text-[#CCFF00] shadow-sm" : "text-[#70757E] hover:text-white"
}`}>
Saved
</button>


</div>

<div className="flex items-center gap-2">
    <span className="text-[10px] text-[#858B95]">
Sort By
    </span>

<select value={sortBy}
onChange={(e) =>
    setSortBy(
        e.target.value as SortOption
    )
}  className="rounded-lg border border-[#24282E] bg-[#111419] px-3 py-2 text-[10px] text-white outline-none">

<option value="duration">Duration</option>
<option value="calories">Calories</option>
<option value="Rating">Rating</option> </select>
</div>
</div>

{sortedWorkouts.length===0?(
    <div className="mt-5 flex min-h-59.5 flex-col items-center justify-center rounded-xl border border-dashed border-[#24282E] bg-[#0D1014] text-center">
<h2 className="text-[16px] font-black uppercase">NOTHING HERE YET</h2>

<p className="mt-2 text-[10px] text-[#858B95]">
     Browse the library and add a lift to get
              today moving.
</p>
<Link
              href="/"
              className="mt-5 rounded-full bg-[#CCFF00] px-5 py-2.5 text-[10px] font-bold text-black transition hover:bg-[#b8e600]"
            >
              Go to workouts
            </Link>
    </div>
):(
    <div className="mt-5 space-y-3">
{sortedWorkouts.map((workout)=>(
    <div
    key={workout.id} className="flex min-h-23 items-center gap-4 rounded-xl border border-[#24282E] bg-[#14171D] px-3 py-3">
<div className="h-17 w-29 shrink-0 overflow-hidden rounded-lg bg-[#20242A]">
<Image src={workout.image}
 alt={workout.name}
 className="h-full w-full object-cover" />
</div>


<div className="min-w-0 flex-1">

<h3 className="truncate text-[13px] font-black uppercase text-white">
    {workout.name}
</h3>
<p className="mt-1 text-[10px] text-[#858B95]">{workout.equipment}</p>

<div className="mt-2 flex items-center gap-3 text-[9px] text-[#A2A7AF]">
<span className="flex items-center gap-1">
<span className="text-[#CCFF00]"> ◷</span>
{workout.duration} min
</span>


<span className="flex items-center gap-1">
  <span className="text-[#CCFF00]">
                        ♨
                      </span>
                  {workout.caloriesBurned}kcal    
</span>
 <span className="flex items-center gap-1">
                      <span className="text-[#CCFF00]">
                        ★
                      </span>
                      {workout.rating}
                    </span>

</div>
</div>

<div className="flex shrink-0 items-center gap-2">

 <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-full border border-[#343A43] px-4 py-2 text-[9px] font-medium text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
                  >
                    View Details
                  </Link>

{activeTab === "plan" && (
    <button
    onClick={()=> 
        handleDone(workout.id)
    } 
    className="rounded-full bg-[#CCFF00] px-4 py-2 text-[9px] font-bold text-black transition hover:bg-[#b8e600]" >
✓ &nbsp;Mark as Done
    </button>
)}
<button
                    onClick={() =>
                      handleRemove(workout.id)
                    }
                    aria-label="Remove workout"
                    className="px-1 text-lg text-[#626873] transition hover:text-white"
                  >
                    ×
                  </button>
</div>

    </div>
))}
    </div>
)}

</section>
    </main> )
    // metric compo

    function Metric({
        label,
        value,
        highlight=false,
    }: {
          label:string;
        value:number;
        highlight?:boolean;
    }) {
        return(
            <div className="border-r border-[#24282E] px-5 py-6 last:border-r-0">
 <p className="text-[9px] text-[#858B95]">
    {label}
 </p>

<p className={`mt-2 text-[28px] font-black leading-none ${
    highlight
    ? "text-[#CCFF00]"
            : "text-white"
}`}>
{value}
</p>

            </div>
        );
    }















}