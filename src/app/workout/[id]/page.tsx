"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
import { useFitlog, Workout } from "@/context/FItLogContext";

export default function WorkoutDetails(){
    const params = useParams();
    const id = params.id;


const {
    addToPlan,
    saveWorkout, 
    plan, 
    saved,
} = useFitlog();

const [workout, setWorkout] = useState <Workout | null>(null);
const [loading, setLoading] = useState(true);
const [toast, setToast] = useState("");
useEffect(() =>{
    async function getWorkout() {
        try{
            const response = await fetch(
                 `https://api.abcz.workers.dev/api/fitlog/${id}`
            );
            if (!response.ok) {
                 throw new Error("Workout not found");
            }
            const data = await response.json();

            setWorkout(data);
        } catch (error){
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


getWorkout();

},[id]);

const showToast = (message: string) => {
    setToast(message);
    
    setTimeout(()=> {
        setToast("");
    },2000);
};
 const handleAddToPlan = () => {
    if(!workout) return;
    const added = addToPlan(workout);
    if(added) {
        showToast("Added to today's plan");
    }
    else if (plan.some((item) => item.id === workout.id)){
        showToast("Already in today's plan");
    }
    else{
        showToast("Today's plan is full");
    }
 };
const handleSave =() => {
    if(!workout) return;
    const savedSuccessfully = saveWorkout(workout);

    if (savedSuccessfully) {
      showToast("Saved for later");
    } else {
      showToast("Already saved");
    }
};

if(loading){
return(
    <main className="min-h-screen bg-[#0B0D0F] px-6 py-20 text-white">
<div className="mx-auto max-w-[1100px]">
    <p className="text-sm text-[#858B95]">
          Loading workout...
    </p>
</div>
    </main>
);
}

if(!workout) {

    return (
        <main className="min-h-screen bg-[#0B0D0F] px-6 py-20 text-white"> 
        <div className="mx-auto max-w-[1100px">
<h1 className="text-3xl font-black" >
 Workout not found
</h1>
<Link href="/"
className="mt-6 inline-block rounded-md bg-[#CCFF00] px-5 py-3 text-sm font-bold text-black">
 Go to workouts </Link>


        </div>
        </main>
    );
    }

// 

return(
    <main className="min-h-screen bg-[#0B0D0F] px-6 py-16 text-white">
<div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 lg:grid-cols-2">
<div className="flex min-h-[500px] items-center justify-center rounded-xl border border-[#292D33] bg-[#15181C] p-8">
    <img src={workout.image} alt={workout.name} className="max-h-[500px] w-full object-contain" />
</div>

<div>
    <div className="mb-4 flex flex-wrap gap-2">
{workout.muscleGroups.map((group) => (
    <span key={group}
                className="rounded-full border border-[#CCFF00] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#CCFF00]">
{group}
    </span>
))

}  </div>

<h1 className="text-4xl font-black uppercase leading-none md:text-5xl">{workout.name}</h1>

<p className="mt-5 text-sm leading-6 text-[#858B95]"> {workout.description}</p>

<div className="mt-8 overflow-hidden rounded-xl border border-[#292D33]">
    <div className="border-b border-[#292D33] px-5 py-4">
<h2 className="text-xs font-black uppercase tracking-[0.15em] text-[#CCFF00]">
                KEY SPECS
              </h2>
    </div>

<div className="grid grid-cols-2">
<Spec
label = "Equipment"
value={workout.equipment}
/>
<Spec
label = "Difficulty"
value={workout.difficulty}
/>

<Spec
label = "Sets"
value={String(workout.sets)}
/>
  <Spec
                label="Reps"
                value={workout.reps}
              />

              <Spec
                label="Duration"
                value={`${workout.duration} min`}
              />

<Spec
label= "Calories"
value={`${workout.caloriesBurned}kcal`}
/>
<Spec
label= "Rating"
value={`★ ${workout.rating}`}
/>

</div>
</div>

{/* Instructions */}
<div className="mt-8">
 <h2 className="text-xs font-black uppercase tracking-[0.15em] text-[#CCFF00]">
    INSTRUCTIONS
 </h2>

<ol className="mt-5 space-y-4">
{workout.instructions.map(
    (instruction, index) =>(
        <li 
        key={index} 
        className="flex gap-4 text-sm leading-6 text-[#B5BAC3]">
<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-xs font-black text-black">
                      {index + 1}
                    </span>
                     <span>{instruction}</span>
        </li>
    )
)}
</ol>

</div>

{/* button */}
<div className="mt-8 flex flex-wrap gap-3">
<button onClick={handleAddToPlan}
className="rounded-md bg-[#CCFF00] px-5 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#b8e600]">
＋ Add to today&apos;s plan
</button>


            <button
              onClick={handleSave}
              className="rounded-md border border-[#41454C] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
     >
              ♡ Save for later
            </button>


</div>


</div>


</div>

{toast && (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-1/2 rounded-lg border border-[#CCFF00] bg-[#15181C] px-5 py-3 text-sm font-semibold text-white shadow-lg ">
{toast}
    </div>
)}
 </main>
);

}


function Spec ({
    label,
    value,
}: {
    label: string ;
    value: string ;
}) {
    return (
        <div className="border-b border-r border-[#292D33] p-4">
<p className="text-[9px] font-bold uppercase tracking-wider text-[#70757E]">
    {label}
</p>
<p className="mt-1 text-sm font-semibold text-white">
    {value}
</p>

        </div>
    );
}


