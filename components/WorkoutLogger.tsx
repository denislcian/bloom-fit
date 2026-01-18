
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Plus, Trash2, Save, X, Check, Search, Info, Eye, Clock } from 'lucide-react';
import { Workout, Exercise, Set } from '../types';
import { EXERCISE_CATALOG, ExerciseInfo } from '../data/exercises';
import ExercisePreview from './ExercisePreview';

interface WorkoutLoggerProps {
  onSave: (workout: Workout) => void;
  onCancel: () => void;
  history: Workout[];
  routineToLoad?: any;
}

const CATEGORIES = ['Todos', 'Cuádriceps', 'Isquios y Glúteo', 'Empuje (Push)', 'Tracción (Pull)', 'Core y Blindaje', 'Carga y Cardio'];

const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ onSave, onCancel, history, routineToLoad }) => {
  const SESSION_KEY = 'bloom_active_session_v1';

  // Lazy init for persistence
  const [title, setTitle] = useState(() => {
    if (routineToLoad) return routineToLoad.name;
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved).title : 'Sesión Táctica';
  });

  const [exercises, setExercises] = useState<Exercise[]>(() => {
    if (routineToLoad) {
      return routineToLoad.exercises?.map((e: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: e.name,
        sets: Array.from({ length: e.setsCount || 3 }).map(() => ({
          id: Math.random().toString(36).substr(2, 9), weight: 0, reps: 0, completed: false
        }))
      })) || [];
    }
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved).exercises : [];
  });

  const [seconds, setSeconds] = useState(() => {
    if (routineToLoad) return 0;
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved).seconds : 0;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showCatalog, setShowCatalog] = useState(false);
  const [previewExercise, setPreviewExercise] = useState<ExerciseInfo | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Persistence effect
  useEffect(() => {
    const data = { title, exercises, seconds };
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }, [title, exercises, seconds]);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s: number) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredCatalog = useMemo(() => {
    return EXERCISE_CATALOG.filter(e => {
      const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || e.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getPreviousPerformance = (exerciseName: string) => {
    for (let i = history.length - 1; i >= 0; i--) {
      const ex = history[i].exercises.find(e => e.name === exerciseName);
      if (ex) return ex;
    }
    return null;
  };

  const addExerciseFromCatalog = (info: ExerciseInfo) => {
    const prev = getPreviousPerformance(info.name);
    const newEx: Exercise = {
      id: Math.random().toString(36).substr(2, 9),
      name: info.name,
      type: info.type,
      metValue: info.met,
      sets: prev ? prev.sets.map(s => ({
        id: Math.random().toString(36).substr(2, 9),
        weight: s.weight,
        reps: s.reps,
        completed: false
      })) : [{ id: Math.random().toString(36).substr(2, 9), weight: 0, reps: 0, completed: false }]
    };
    setExercises([...exercises, newEx]);
    setShowCatalog(false);
    setSearchTerm('');
  };

  const addSet = (exId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        return {
          ...ex,
          sets: [...ex.sets, {
            id: Math.random().toString(36).substr(2, 9),
            weight: lastSet?.weight || 0,
            reps: lastSet?.reps || 0,
            completed: false
          }]
        };
      }
      return ex;
    }));
  };

  const updateSet = (exId: string, setId: string, updates: Partial<Set>) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exId) {
        return {
          ...ex,
          sets: ex.sets.map(s => s.id === setId ? { ...s, ...updates } : s)
        };
      }
      return ex;
    }));
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleSave = () => {
    if (exercises.length === 0) return;
    const calories = exercises.reduce((acc, ex) => acc + (ex.metValue || 5.0) * 75 * (ex.sets.length * 3 / 60), 0);
    const workout: Workout = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      title,
      exercises,
      caloriesBurned: Math.round(calories),
      duration: seconds
    };
    localStorage.removeItem(SESSION_KEY); // Clear session
    onSave(workout);
  };

  const handleCancelClick = () => {
    if (exercises.length > 0) {
      setShowExitConfirm(true);
    } else {
      localStorage.removeItem(SESSION_KEY);
      onCancel();
    }
  };

  const confirmExit = () => {
    localStorage.removeItem(SESSION_KEY);
    onCancel();
  };

  return (
    <div className="p-6 space-y-6 bg-neutral-950 min-h-full pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {previewExercise && <ExercisePreview exercise={previewExercise} onClose={() => setPreviewExercise(null)} />}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-red-900/30 p-6 rounded-3xl max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-red-50 uppercase italic">¿Cancelar entrenamiento?</h3>
            <p className="text-sm text-neutral-400">Se perderá el progreso de la sesión actual.</p>
            <div className="flex gap-3">
              <button onClick={confirmExit} className="flex-1 py-3 bg-red-600/20 text-red-500 font-bold uppercase tracking-widest rounded-xl hover:bg-red-600 hover:text-white transition-all">Sí, Salir</button>
              <button onClick={() => setShowExitConfirm(false)} className="flex-1 py-3 bg-neutral-800 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-700 transition-all">Continuar</button>
            </div>
          </div>
        </div>
      )}

      <div className="sticky top-0 bg-neutral-950/90 backdrop-blur-md z-20 pb-4 border-b border-emerald-900/20 pt-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <Clock size={14} className="animate-pulse" />
            <span className="text-xs font-mono font-bold">{formatTime(seconds)}</span>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCancelClick} className="p-2 text-neutral-600 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <button
              onClick={handleSave}
              disabled={exercises.length === 0}
              className="p-2 bg-emerald-600 rounded-2xl text-white disabled:opacity-30 transition-all hover:bg-emerald-500 shadow-lg shadow-emerald-900/30"
            >
              <Save size={24} />
            </button>
          </div>
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent text-xl font-black outline-none w-full border-b border-transparent focus:border-emerald-500 transition-colors placeholder:text-neutral-800 text-white"
          placeholder="Nombre del entrenamiento"
        />
      </div>

      <div className="space-y-8 mt-6">
        {exercises.map((ex) => {
          const prev = getPreviousPerformance(ex.name);
          const catalogInfo = EXERCISE_CATALOG.find(ci => ci.name === ex.name);
          return (
            <div key={ex.id} className="bg-neutral-900/40 rounded-3xl border border-emerald-900/10 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-emerald-100">{ex.name}</h3>
                    {catalogInfo && (
                      <button
                        onClick={() => setPreviewExercise(catalogInfo)}
                        className="text-emerald-700 hover:text-emerald-400 p-1"
                      >
                        <Eye size={14} />
                      </button>
                    )}
                  </div>
                  {prev && (
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                      <Info size={10} /> Anterior: {prev.sets[0]?.weight}kg x {prev.sets[0]?.reps} reps
                    </p>
                  )}
                </div>
                <button onClick={() => removeExercise(ex.id)} className="text-neutral-700 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-4 text-[10px] font-bold text-neutral-700 uppercase tracking-widest px-2">
                  <span>Serie</span>
                  <span>Peso</span>
                  <span>Reps</span>
                  <span className="text-right">Ok</span>
                </div>

                {ex.sets.map((set, setIdx) => (
                  <div key={set.id} className="grid grid-cols-4 items-center gap-3">
                    <span className="text-xs font-mono text-neutral-600 pl-2">{setIdx + 1}</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={set.weight || ''}
                      placeholder="0"
                      onChange={(e) => updateSet(ex.id, set.id, { weight: parseFloat(e.target.value) || 0 })}
                      className="bg-neutral-800/40 rounded-xl p-3 text-center text-sm outline-none border border-neutral-800 focus:border-emerald-500/50 transition-colors placeholder:text-neutral-700 text-white"
                    />
                    <input
                      type="number"
                      inputMode="numeric"
                      value={set.reps || ''}
                      placeholder="0"
                      onChange={(e) => updateSet(ex.id, set.id, { reps: parseInt(e.target.value) || 0 })}
                      className="bg-neutral-800/40 rounded-xl p-3 text-center text-sm outline-none border border-neutral-800 focus:border-emerald-500/50 transition-colors placeholder:text-neutral-700 text-white"
                    />
                    <div className="flex justify-end pr-1">
                      <button
                        onClick={() => updateSet(ex.id, set.id, { completed: !set.completed })}
                        className={`w-7 h-7 rounded-xl border transition-all flex items-center justify-center ${set.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-neutral-800 hover:border-neutral-600'
                          }`}
                      >
                        {set.completed && <Check size={16} strokeWidth={4} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addSet(ex.id)}
                className="w-full py-2 bg-emerald-950/30 border border-emerald-900/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-emerald-700 hover:bg-emerald-900/10 transition-colors"
              >
                + Añadir Serie
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setShowCatalog(true)}
        className="w-full flex items-center justify-center gap-2 p-6 border-2 border-dashed border-emerald-900/10 rounded-3xl text-emerald-700 hover:border-emerald-500 hover:text-emerald-400 transition-all active:scale-[0.98] bg-emerald-950/5"
      >
        <Plus size={24} />
        <span className="font-bold uppercase tracking-widest text-xs">Añadir Ejercicio Táctico</span>
      </button>

      {/* Modal de Catálogo */}
      {showCatalog && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] p-4 flex flex-col animate-in fade-in duration-300">
          <div className="flex-1 bg-neutral-900 rounded-[2.5rem] overflow-hidden border border-emerald-900/20 flex flex-col shadow-2xl">
            <div className="p-6 border-b border-emerald-900/10 flex items-center justify-between bg-neutral-900/50 backdrop-blur">
              <h2 className="text-xl font-black uppercase tracking-tighter text-white">Catálogo Táctico</h2>
              <button onClick={() => setShowCatalog(false)} className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-white"><X /></button>
            </div>

            <div className="p-6 space-y-4 bg-neutral-900/30">
              <div className="flex items-center gap-3 bg-black/40 rounded-2xl px-4 py-3 border border-emerald-900/10 focus-within:border-emerald-500/50 transition-colors">
                <Search size={18} className="text-emerald-700" />
                <input
                  autoFocus
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar ejercicio..."
                  className="bg-transparent border-none outline-none text-sm w-full text-white"
                />
              </div>

              <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                        : 'bg-neutral-800/50 text-neutral-500 hover:bg-neutral-800'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
              {filteredCatalog.length > 0 ? (
                filteredCatalog.map((info, idx) => (
                  <div key={idx} className="flex gap-2">
                    <button
                      onClick={() => addExerciseFromCatalog(info)}
                      className="flex-1 flex items-center justify-between p-5 bg-neutral-800/30 hover:bg-emerald-900/20 border border-emerald-900/5 hover:border-emerald-500/30 transition-all rounded-3xl group"
                    >
                      <div className="text-left">
                        <p className="font-bold text-base text-emerald-50 group-hover:text-emerald-400 transition-colors">{info.name}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[9px] bg-emerald-950/30 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter border border-emerald-900/20">
                            {info.category}
                          </span>
                        </div>
                      </div>
                      <Plus size={20} className="text-emerald-500" />
                    </button>
                    <button
                      onClick={() => setPreviewExercise(info)}
                      className="p-5 bg-neutral-800/30 rounded-3xl border border-emerald-900/5 hover:bg-emerald-600 hover:text-white text-emerald-600 transition-all"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-neutral-600">Sin resultados</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutLogger;
