"use client";
import { workAsyncStorage } from "next/dist/server/app-render/work-async-storage.external";
import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { getHeapSnapshot } from "v8";


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
  addToPlan:  (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
};

type StorageStore={
  getSnapshot: ()=> string;
  getServerSnapshot: ()=> string;
  subscribe: (listener: ()=> void)=> ()=>void;
  set: (value: string) => void;
};

// local storage 

function createStorageStore (key: string): StorageStore{
  let value = "[]";


  if(typeof window !== "undefined"){
    value = localStorage.getItem(key)?? "[]";
  }


const listeners = new Set<() => void>();
const subscribe = (listener: ()=> void)=> {
listeners.add(listener);
return () => {
  listeners.delete(listener);
};
};
const getSnapshot =() => value;


const getServerSnapshot= () => "[]";

const set =(newValue: string) =>{
  value = newValue;
if(typeof window!=="undefined"){
  localStorage.setItem(key, newValue);
}
listeners.forEach((listener) => listener());
};

//
if(typeof window !== "undefined"){
  window.addEventListener("storage", (event)=> {
    if(event.key === key){
      value = event.newValue ?? "[]";
      listeners.forEach((listener) => listener());
    }
  }
);
}
  return {
    getSnapshot,
    getServerSnapshot,
    subscribe,
    set,
  };
}
//
const planStore = createStorageStore("fitlog-plan");
const savedStore = createStorageStore("fitlog-saved");



const FitLogContext = createContext<FitLogContextType | null >(null);



export function FitLogProvider ({
  children, 
}: {
  children: React.ReactNode ;

}) {
  const planJson = useSyncExternalStore(
    planStore.subscribe,
    planStore.getSnapshot,
    planStore.getServerSnapshot
  );
   const savedJson = useSyncExternalStore(
    savedStore.subscribe,
    savedStore.getSnapshot,
    savedStore.getServerSnapshot
  );
  const plan = useMemo < Workout []>(()=>{
    try{
      return JSON.parse(planJson);
    } catch {
      return[];
    }
  },[planJson]);

const saved = useMemo < Workout []>(()=>{
    try{
      return JSON.parse(savedJson);
    } catch {
      return[];
    }
  },[savedJson]);

    // Add to Today's Plan

const addToPlan = (workout:Workout)=>{
  const currentPlan: Workout[] = JSON.parse(
    planStore.getSnapshot()
  );

  if(
    currentPlan.some(
      (item) => item.id === workout.id
    )
  ){
    return false;
  }

if(currentPlan.length >=5){
  return false;
}
const updatedPlan = [
  ...currentPlan, 
  workout,
];
planStore.set(JSON.stringify(updatedPlan));
return true;
};

//  Remove from Today's Plan

const removeFromPlan = (id: number) => {
  const currentPlan: Workout[] = JSON.parse(
    planStore.getSnapshot()
  );

const updatedPlan = currentPlan.filter(
  (workout) => workout.id !== id
);
planStore.set(JSON.stringify(updatedPlan));

};

  // Save for Later

const saveWorkout = (workout: Workout) => {
  const currentSaved: Workout[] = JSON.parse (savedStore.getSnapshot());

 if (
      currentSaved.some(
        (item) => item.id === workout.id
      )
    ) {
      return false;
    }

    const updatedSaved = [
      ...currentSaved,
      workout,
    ];

savedStore.set(JSON.stringify(updatedSaved));
return true;
};

  // Remove from Saved

const removeFromSaved = (id: number) => {
  const currentSaved: Workout[] = JSON.parse(
    savedStore.getSnapshot()
  );

  const updatedSaved = currentSaved.filter (
    (workout) => workout.id !== id
  );
  savedStore.set (JSON.stringify(updatedSaved));
};

return (<FitLogContext.Provider
  value={{
    plan,
        saved,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
  }} >{children}</FitLogContext.Provider>
);

}

export function useFitlog() {
  const context = useContext(FitLogContext);

  if(!context){
    throw new Error (
      "useFitLog must be used inside FitLogProvider"
    );
  }
  return context;
}


  