
import React, { useMemo } from 'react';
import { Calendar, ChevronRight, Zap, Box, Clock } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutHistoryProps {
  workouts: Workout[];
}

const getWeekNumber = (d: Date) => {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts }) => {
  const groupedWorkouts = useMemo(() => {
    const sorted = [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const groups: { [key: string]: Workout[] } = {};
    
    sorted.forEach(w => {
      const date = new Date(w.date);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let label = "";
      if (diffDays <= 7) label = "Esta Semana";
      else if (diffDays <= 14) label = "Semana Pasada";
      else {
        const month = date.toLocaleString('es-ES', { month: 'long' });
        label = month.charAt(0).toUpperCase() + month.slice(1);
      }

      if (!groups[label]) groups[label] = [];
      groups[label].push(w);
    });

    return groups;
  }, [workouts]);

  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <div className="w-24 h-24 bg-neutral-900/30 border border-dashed border-emerald-900/20 rounded-3xl flex items-center justify-center mb-6 text-emerald-900">
          <Box size={40} />
        </div>
        <h3 className="text-lg font-black uppercase tracking-tight text-neutral-300">Cuaderno Vacío</h3>
        <p className="text-xs font-bold text-neutral-600 mt-2 max-w-[200px] uppercase tracking-widest">Aún no has registrado sesiones. El crecimiento comienza con el primer paso.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tighter italic text-white">Historial</h2>
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{workouts.length} Sesiones</span>
      </div>
      
      <div className="space-y-10">
        {Object.entries(groupedWorkouts).map(([label, weekWorkouts]) => (
          <div key={label} className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 px-1 border-l-2 border-emerald-900 pl-3">
              {label}
            </h3>
            <div className="grid gap-4">
              {weekWorkouts.map((workout) => (
                <div key={workout.id} className="bg-neutral-900/40 border border-emerald-900/10 rounded-[2rem] p-6 hover:border-emerald-500/20 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-base text-emerald-50 group-hover:text-emerald-400 transition-colors">{workout.title}</h3>
                      <div className="flex items-center gap-3 mt-1.5 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} className="text-emerald-800" />
                          {new Date(workout.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-orange-600/80">
                          <Zap size={10} fill="currentColor" />
                          {workout.caloriesBurned} kCal
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-neutral-800 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {workout.exercises.slice(0, 3).map((ex, i) => (
                      <span key={i} className="text-[9px] bg-emerald-950/20 border border-emerald-900/10 px-2 py-1 rounded-lg text-emerald-600 font-bold uppercase tracking-wider">
                        {ex.name}
                      </span>
                    ))}
                    {workout.exercises.length > 3 && (
                      <span className="text-[9px] text-neutral-700 font-bold uppercase pt-1">
                        +{workout.exercises.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutHistory;
