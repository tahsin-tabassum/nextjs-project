import Link from "next/link";
import Image from "next/image";
type Workout ={
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
equipment: string;
difficulty: string;
duration: number;
caloriesBurned: number;
sets: number;
 reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch (
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );
  if(!res.ok){
    throw new Error ("Failed to fetch workouts");
  }
  return res.json();

}


const Library = async () => {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="bg-[#0B0D0F] px-6 py-20"
    >
<div className="mx-auto max-w-275">
  {/* heading */}
  <div className="mb-10">
<h2 className="text-4xl font-black uppercase tracking-tight text-white">
  THE LIBRARY
</h2>
<p className="mt-2 text-md text-[#858B95]">
  Twelve lifts covering every major muscle group.
</p>
  </div>
  {/* card */}
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
{workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workout/${workout.id}`}
              className="group overflow-hidden rounded-xl border border-[#292D33] bg-[#15181C] transition hover:-translate-y-1 hover:border-[#CCFF00]"
            >
              <div className="flex h-80 items-center justify-center bg-[#1B1F23]">

             
              <Image src={workout.image}  alt={workout.name} width={400} height={400}
   className=" h-full w-full object-cover transition duration-300 group-hover:scale-105" /> 
              </div>
              {/* content */}
              <div className="p-5">
                <div className="mb-3 flex flex-wrap gap-2">
 {workout.muscleGroups.map((group) => (
  <span key={group}
  className="rounded-full border border-[#3A3F46] px-2 py-1 text-[10px] font-bold uppercase tracking-wide bg-[#CCFF00]"
  >
{group}
  </span>
  ))} </div>
  <h3 className="text-md font-black uppercase text-white">
    {workout.name}
  </h3>
  <p className="mt-2 text-sm text-[#858B95]">
    {workout.equipment}
  </p>
  <div className="mt-5 flex items-center gap-4 border-t border-[#292D33] pt-4 text-xs text-[#A2A7AF]">
 <span>
                    ⏱ {workout.duration} min
                  </span>

                  <span>
                    🔥 {workout.caloriesBurned} kcal
                  </span>

                  <span>
                    ★ {workout.rating}
                  </span>
  </div>
              </div>
            </Link>
))}

  </div>
</div>
  </section>
  );
};

export default Library;