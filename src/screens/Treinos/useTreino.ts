import { create } from "zustand";

interface ITreino {
  exercises: string | any;
  setExercises: React.Dispatch<React.SetStateAction<string | any>>;
}

export const useTreino = create<ITreino>((set) => ({
  exercises: '',
  setExercises: (value) => set({ exercises: value }),
}));
