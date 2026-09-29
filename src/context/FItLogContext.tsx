"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  description: string;
  instructions: string[];
};

type FitLogContextType = {
  plan: Workout[];
  saved: Workout[];
  hydrated: boolean;

  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: Workout) => boolean;
  removeFromSaved: (id: number) => void;
};

const FitLogContext = createContext<FitLogContextType | null>(null);

export function FitLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved data
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setHydrated(true);
  }, []);

  // Save plan
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, hydrated]);

  // Save saved workouts
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, hydrated]);

  const addToPlan = (workout: Workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      return false;
    }

    if (plan.length >= 5) {
      return false;
    }

    setPlan((current) => [...current, workout]);

    return true;
  };

  const removeFromPlan = (id: number) => {
    setPlan((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const saveWorkout = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      return false;
    }

    setSaved((current) => [...current, workout]);

    return true;
  };

  const removeFromSaved = (id: number) => {
    setSaved((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        hydrated,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}