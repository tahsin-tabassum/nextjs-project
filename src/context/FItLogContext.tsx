"use client";
import { createContext, useContext, useEffect, useState } from "react";
export type Workout={
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

type FitLogContextType = {
  plan: Workout[];
  saved:Workout[];
  hydrated: boolean;
  addToPlan:  (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
};

const FitLogContext = createContext<FitLogContextType | null >(null);

export function FitLogProvider ({
  children, 
}: {
  children: React.ReactNode ;

}) {
  const [plan, setPlan] = useState < Workout []> ([]);
  const [saved, setSaved] = useState < Workout []> ([]);
  const [hydrated, setHydrated] = useState(false);

  // data loading 

  useEffect (()=>{
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

 if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }
if(storedSaved){
  setSaved(JSON.parse(storedSaved));
}
setHydrated(true);
  },[]);

// saved today's plan
useEffect (() => {
  if (!hydrated) return;
  localStorage.setItem("fitlog-plan", JSON.stringify(plan));
}, [plan, hydrated]);

// saved saved workouts
 useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, hydrated]);

    // Add workout to Today's Plan
    const addToPlan = (workout: Workout)=> {
      if(plan.some((item)=> item.id=== workout.id)){
        return false;
      }
      if(plan.length>= 5){
        return false;
      }
       setPlan((current) => [...current, workout]);

    return true;
    };





 // Remove workout to Today's Plan

const removeFromPlan= (id: number) => {
  setPlan ((current) => 
  current.filter((item) => item.id !== id));
};

// save workout
const saveWorkout = (workout: Workout)=> {
  if(saved.some((item) => item.id === workout.id)){
    return false;
  }
  setSaved((current)=> [...current, workout]);
  return true;
};

// remove from saved

const removeFromSaved= (id: number) => {
  setSaved((current) =>
  current.filter((item) => item.id !==id));
};

return(
  <FitLogContext.Provider 
  value={{
    plan,
       saved,
        hydrated,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
  }} >
    {children}
  </FitLogContext.Provider>
);
}

export function useFitlog()
{
  const context = useContext(FitLogContext);

  if(!context){
    throw new Error (
      "useFitLog must be used inside FitLogProvider"
    );
  }
  return context;
}
