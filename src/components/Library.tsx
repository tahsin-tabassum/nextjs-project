import Link from "next/link";
type Workout ={
  id: number;
  name: string;
  image:

}


const Library = async () => {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="bg-[#0B0D0F] px-6 py-20"
    >

  </section>
  );
};

export default Library;