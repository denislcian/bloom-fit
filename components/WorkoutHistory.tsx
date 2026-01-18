
import React, { useMemo, useState } from 'react';
import { Calendar, ChevronRight, Zap, Box, Clock, ChevronDown } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutHistoryProps {
  workouts: Workout[];
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatDuration = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}h ${remMins}m`;
  };

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
        <p className="text-xs font-bold text-neutral-600 mt-2 max-w-[200px] uppercase tracking-widest">Aún no has registrado sesiones.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 pb-32">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tighter italic text-white">Historial Táctico</h2>
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
                <div 
                  key={workout.id} 
                  onClick={() => setExpandedId(expandedId === workout.id ? null : workout.id)}
                  className={`bg-neutral-900/40 border transition-all cursor-pointer group overflow-hidden ${
                    expandedId === workout.id 
                    ? 'border-emerald-500/40 rounded-[2rem]' 
                    : 'border-emerald-900/10 rounded-[2rem] hover:border-emerald-500/20'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-base text-emerald-50 group-hover:text-emerald-400 transition-colors">{workout.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-neutral-500 text-[9px] font-black uppercase tracking-widest">
                          <div className="flex items-center gap-1">
                            <Calendar size={10} className="text-emerald-800" />
                            {new Date(workout.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={10} className="text-emerald-800" />
                            {formatDuration(workout.duration || 0)}
                          </div>
                          <div className="flex items-center gap-1 text-orange-600/80">
                            <Zap size={10} fill="currentColor" />
                            {workout.caloriesBurned} kCal
                          </div>
                        </div>
                      </div>
                      {expandedId === workout.id ? (
                        <ChevronDown className="text-emerald-500" size={20} />
                      ) : (
                        <ChevronRight className="text-neutral-800 group-hover:text-emerald-500 transition-all" size={20} />
                      )}
                    </div>

                    {!expandedId || expandedId !== workout.id ? (
                      <div className="flex flex-wrap gap-1.5">
                        {workout.exercises.slice(0, 3).map((ex, i) => (
                          <span key={i} className="text-[8px] bg-emerald-950/20 border border-emerald-900/10 px-2 py-0.5 rounded-lg text-emerald-600 font-bold uppercase tracking-wider">
                            {ex.name}
                          </span>
                        ))}
                        {workout.exercises.length > 3 && (
                          <span className="text-[8px] text-neutral-700 font-bold uppercase pt-0.5">
                            +{workout.exercises.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="mt-6 pt-6 border-t border-emerald-900/10 space-y-4 animate-in slide-in-from-top-2">
                        {workout.exercises.map((ex, idx) => (
                          <div key={idx} className="space-y-1">
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{ex.name}</p>
                            <div className="flex flex-wrap gap-2">
                              {ex.sets.map((s, sidx) => (
                                <div key={sidx} className="bg-black/20 px-2 py-1 rounded-lg border border-neutral-800">
                                  <span className="text-[9px] font-mono text-neutral-500 mr-2">{sidx + 1}</span>
                                  <span className="text-[10px] font-bold text-neutral-300">{s.weight}kg x {s.reps}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
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
