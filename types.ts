
export interface Set {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  type?: 'strength' | 'cardio' | 'bodyweight' | 'flexibility';
  metValue?: number;
}

export interface Routine {
  id: string;
  name: string;
  exercises: { id: string; name: string; setsCount: number }[];
}

export interface Workout {
  id: string;
  date: string;
  title: string;
  exercises: Exercise[];
  caloriesBurned: number;
  duration: number; // Duración en segundos
  notes?: string;
  mood?: 'great' | 'good' | 'neutral' | 'tired' | 'bad';
  weekNumber?: number;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  WORKOUTS = 'workouts',
  ROUTINES = 'routines',
  TRAINER = 'trainer',
  HISTORY = 'history'
}
