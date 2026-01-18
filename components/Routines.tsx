
import React, { useState } from 'react';
import { Plus, Play, Trash2, ClipboardList, Edit2, X, ChevronRight } from 'lucide-react';
import { Routine } from '../types';
import ExerciseSelector from './ExerciseSelector';
import { ExerciseInfo } from '../data/exercises';

interface RoutinesProps {
  routines: Routine[];
  onAddRoutine: (routine: Routine) => void;
  onUpdateRoutine: (routine: Routine) => void;
  onStartRoutine: (routine: Routine) => void;
  onDeleteRoutine: (id: string) => void;
}

const Routines: React.FC<RoutinesProps> = ({ routines, onAddRoutine, onUpdateRoutine, onStartRoutine, onDeleteRoutine }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [routineName, setRoutineName] = useState('');
  const [routineExercises, setRoutineExercises] = useState<{ id: string; name: string; setsCount: number }[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const startCreating = () => {
    setEditingId(null);
    setRoutineName('');
    setRoutineExercises([]);
    setIsEditing(true);
  };

  const startEditing = (routine: Routine) => {
    setEditingId(routine.id);
    setRoutineName(routine.name);
    setRoutineExercises([...routine.exercises]);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!routineName.trim()) return;

    const newRoutine: Routine = {
      id: editingId || Math.random().toString(36).substr(2, 9),
      name: routineName,
      exercises: routineExercises
    };

    if (editingId) {
      onUpdateRoutine(newRoutine);
    } else {
      onAddRoutine(newRoutine);
    }

    setIsEditing(false);
  };

  const addExercises = (newExercises: ExerciseInfo[]) => {
    const formatted = newExercises.map(e => ({
      id: Math.random().toString(36).substr(2, 9),
      name: e.name,
      setsCount: 3
    }));
    setRoutineExercises([...routineExercises, ...formatted]);
    setShowSelector(false);
  };

  const removeExercise = (idx: number) => {
    const newEx = [...routineExercises];
    newEx.splice(idx, 1);
    setRoutineExercises(newEx);
  };

  if (isEditing) {
    return (
      <div className="p-6 bg-neutral-950 min-h-full space-y-6 animate-in fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-emerald-50">
            {editingId ? 'Editar Rutina' : 'Nueva Rutina'}
          </h2>
          <button onClick={() => setIsEditing(false)} className="p-2 bg-neutral-800 rounded-full text-white"><X /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest pl-2">Nombre</label>
            <input
              autoFocus
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              placeholder="Ej. Pierna Hipertrofia"
              className="w-full bg-neutral-900 border border-emerald-900/20 rounded-2xl p-4 text-lg font-bold outline-none focus:border-emerald-500/50 text-white mt-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-neutral-500 tracking-widest pl-2">Ejercicios ({routineExercises.length})</label>
            {routineExercises.length > 0 ? (
              <div className="bg-neutral-900 rounded-3xl overflow-hidden border border-emerald-900/10">
                {routineExercises.map((ex, idx) => (
                  <div key={ex.id} className="p-4 border-b border-neutral-800 flex items-center justify-between group">
                    <span className="font-semibold text-neutral-300">{ex.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-neutral-800 px-2 py-1 rounded-lg">
                        <span className="text-xs text-neutral-500 font-mono">Series:</span>
                        <input
                          type="number"
                          value={ex.setsCount}
                          onChange={(e) => {
                            const newEx = [...routineExercises];
                            newEx[idx].setsCount = parseInt(e.target.value) || 3;
                            setRoutineExercises(newEx);
                          }}
                          className="w-8 bg-transparent text-center outline-none text-emerald-400 font-bold"
                        />
                      </div>
                      <button onClick={() => removeExercise(idx)} className="text-neutral-600 hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center border-2 border-dashed border-neutral-800 rounded-3xl text-neutral-600 text-sm">
                Sin ejercicios añadidos
              </div>
            )}
          </div>

          <button
            onClick={() => setShowSelector(true)}
            className="w-full py-4 border border-emerald-900/30 rounded-2xl text-emerald-500 font-bold uppercase tracking-widest hover:bg-emerald-900/10 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Añadir Ejercicios
          </button>

          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={!routineName.trim()}
              className="w-full py-4 bg-emerald-600 rounded-2xl text-white font-black uppercase tracking-widest shadow-lg shadow-emerald-900/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 transition-all"
            >
              Guardar Rutina
            </button>
          </div>
        </div>

        {showSelector && (
          <ExerciseSelector
            onClose={() => setShowSelector(false)}
            onSelect={addExercises}
            multiSelect={true}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase italic tracking-tighter">Mis Rutinas</h2>
        <button
          onClick={startCreating}
          className="p-2 bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-colors text-white shadow-lg shadow-emerald-900/20"
        >
          <Plus size={20} />
        </button>
      </div>

      {routines.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center h-[50vh] opacity-50">
          <ClipboardList size={48} className="text-neutral-800 mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-600">No hay rutinas guardadas.</p>
          <button onClick={startCreating} className="mt-4 text-emerald-500 text-xs font-bold uppercase tracking-wide hover:underline">Crear primera rutina</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {routines.map((r) => (
            <div key={r.id} className="bg-neutral-900/50 border border-emerald-900/10 rounded-3xl p-5 flex items-center justify-between hover:border-emerald-500/30 transition-all group">
              <div onClick={() => startEditing(r)} className="flex-1 cursor-pointer">
                <h3 className="font-bold text-emerald-50 group-hover:text-emerald-400 transition-colors">{r.name}</h3>
                <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                  {r.exercises.length} Ejercicios <ChevronRight size={12} />
                </p>
              </div>
              <div className="flex gap-3 pl-4 border-l border-neutral-800">
                <button
                  onClick={() => startEditing(r)}
                  className="p-2 text-neutral-600 hover:text-emerald-400 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDeleteRoutine(r.id)}
                  className="p-2 text-neutral-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => onStartRoutine(r)}
                  className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/30 active:scale-90 transition-all"
                >
                  <Play size={18} fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Routines;
