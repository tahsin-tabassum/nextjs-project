import { group } from "console";

type Props = {
    params : Promise <{
        id: string;
    
    }>;
};

async function getWorkout(id: string) {
    const res = await fetch (
        `https://api.abcz.workers.dev/api/fitlog/${id}`,
        {
            cache: 'no-store',
        }
    );
    if (!res.ok) {
    throw new Error("Workout not found");
  }

  return res.json();
}

export default async function WorkoutDetails({params}:Props) {
    const {id} = await params;
    const workout= await getWorkout (id);
    return(
        <main className="min-h-screen bg-[#0B0D0F] px-6 py-16 text-white">
<div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 lg:grid-cols-2">
{/* img */}
 <div className="flex min-h-[500px] items-center justify-center rounded-xl border border-[#292D33] bg-[#15181C] p-8">
          <img
            src={workout.image}
            alt={workout.name}
            className="max-h-[500px] w-full object-contain"
          />
        </div>
        <div>
            <div className="mb-4 flex flex-wrap gap-2">
{
    workout.muscleGroups.map((group:string)=>(
      <span
                key={group}
                className="rounded-full border border-[#CCFF00] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#CCFF00]"
              >{group}</span>  
    ))
}
            </div>
            <h1 className="text-4xl font-black uppercase leading-none md:text-5xl">
{workout.name}
            </h1>

            <p className="mt-5 text-sm leading-6 text-[#858B95] ">
            {workout.description}
          </p>
          <div className="mt-8 overflow-hidden rounded-xl border border-[#292D33]">
<div className="border-b border-[#292D33] px-5 py-4">
<h2 className="text-xs font-black uppercase tracking-[0.15em] text-[#CCFF00]">
KEY SPECS
</h2>
</div>
<div className="grid grid-cols-2">
 <Spec
                label="Equipment"
                value={workout.equipment}
              />
               <Spec
                label="Difficulty"
                value={workout.difficulty}
              />
               <Spec
                label="Sets"
                value={workout.sets}
              />
               <Spec
                label="Reps"
                value={workout.reps}
              /> <Spec
                label="Duration"
                value={`${workout.duration}min`}
              /> <Spec
                label="Calories"
                value={`${workout.caloriesBurned}kcal`}
              />
               <Spec
                label="Rating"
                value={`★ ${workout.rating}`}
              />
</div>
          </div>
          <div className="mt-8">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-[#CCFF00] ">
                INSTRUCTIONS
            </h2>
            <ol className="mt-5 space-y-4">
{workout.instructions.map(
    (
        instruction: string, index: number) => (
            <li key={index} className="flex gap-4 text-sm leading-6 text-[#B5BAC3]">
<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-xs font-black text-black">
{index + 1}
</span>
<span>{instruction}</span>
            </li>
        )
)

}
            </ol>
          </div>

<div className="mt-8 flex flex-wrap gap-3">
    <button className="rounded-md bg-[#CCFF00] px-5 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#b8e600]">
+ Add to today&apos;s plan
    </button>
    <button className="rounded-md border border-[#41454C] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]">
              ♡ Save for later
            </button>
</div>



        </div>
</div>
        </main>
    )
};
function Spec({
    label, 
    value,

}:{
    label: string;
    value: string;

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