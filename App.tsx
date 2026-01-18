
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import WorkoutLogger from './components/WorkoutLogger';
import AiTrainer from './components/AiTrainer';
import WorkoutHistory from './components/WorkoutHistory';
import RoutinesTab from './components/Routines';
import { Workout, AppTab, Routine } from './types';

const STORAGE_KEY = 'bloomfit_data_v2';
const ROUTINES_KEY = 'bloomfit_routines_v1';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLogging, setIsLogging] = useState(false);
  const [loadedRoutine, setLoadedRoutine] = useState<Routine | undefined>(undefined);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedRoutines = localStorage.getItem(ROUTINES_KEY);
    if (saved) {
      try { setWorkouts(JSON.parse(saved)); } catch (e) {}
    }
    if (savedRoutines) {
      try { setRoutines(JSON.parse(savedRoutines)); } catch (e) {}
    }
  }, []);

  const saveWorkout = (newWorkout: Workout) => {
    const updated = [...workouts, newWorkout];
    setWorkouts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsLogging(false);
    setLoadedRoutine(undefined);
    setActiveTab(AppTab.HISTORY);
  };

  const addRoutine = (r: Routine) => {
    const updated = [...routines, r];
    setRoutines(updated);
    localStorage.setItem(ROUTINES_KEY, JSON.stringify(updated));
  };

  const deleteRoutine = (id: string) => {
    const updated = routines.filter(r => r.id !== id);
    setRoutines(updated);
    localStorage.setItem(ROUTINES_KEY, JSON.stringify(updated));
  };

  const startTraining = (routine?: Routine) => {
    setLoadedRoutine(routine);
    setIsLogging(true);
  };

  const renderContent = () => {
    if (isLogging) {
      return (
        <WorkoutLogger 
          onSave={saveWorkout} 
          onCancel={() => { setIsLogging(false); setLoadedRoutine(undefined); }} 
          history={workouts}
          routineToLoad={loadedRoutine}
        />
      );
    }

    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard workouts={workouts} onStartTraining={() => setActiveTab(AppTab.WORKOUTS)} />;
      case AppTab.WORKOUTS:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center h-[70vh]">
            <div className="w-24 h-24 bg-emerald-600/10 rounded-full flex items-center justify-center mb-6 relative">
               <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-10" />
               <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20" /></svg>
               </div>
            </div>
            <h2 className="text-2xl font-black uppercase italic mb-2">Supérate hoy</h2>
            <p className="text-sm text-neutral-500 mb-8 max-w-xs leading-relaxed">Cada repetición cuenta. Elige cómo quieres empezar.</p>
            <div className="flex flex-col gap-3 w-full max-w-[200px]">
              <button 
                onClick={() => startTraining()}
                className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-500 transition-all active:scale-95 shadow-xl shadow-emerald-900/40"
              >
                Entreno Libre
              </button>
              <button 
                onClick={() => setActiveTab(AppTab.ROUTINES)}
                className="px-8 py-3 bg-neutral-900 text-emerald-500 border border-emerald-900/20 rounded-2xl font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all"
              >
                Cargar Rutina
              </button>
            </div>
          </div>
        );
      case AppTab.ROUTINES:
        return (
          <RoutinesTab 
            routines={routines} 
            onAddRoutine={addRoutine} 
            onDeleteRoutine={deleteRoutine}
            onStartRoutine={startTraining} 
          />
        );
      case AppTab.TRAINER:
        return <AiTrainer workoutHistory={workouts} />;
      case AppTab.HISTORY:
        return <WorkoutHistory workouts={workouts} />;
      default:
        return <Dashboard workouts={workouts} onStartTraining={() => setActiveTab(AppTab.WORKOUTS)} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
