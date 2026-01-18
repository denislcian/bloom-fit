
import React, { useState } from 'react';
import { Plus, Play, Trash2, ClipboardList } from 'lucide-react';
import { Routine } from '../types';

interface RoutinesProps {
  routines: Routine[];
  onAddRoutine: (routine: Routine) => void;
  onStartRoutine: (routine: Routine) => void;
  onDeleteRoutine: (id: string) => void;
}

const Routines: React.FC<RoutinesProps> = ({ routines, onAddRoutine, onStartRoutine, onDeleteRoutine }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');

  const createRoutine = () => {
    if (!newRoutineName.trim()) return;
    const routine: Routine = {
      id: Math.random().toString(36).substr(2, 9),
      name: newRoutineName,
      exercises: []
    };
    onAddRoutine(routine);
    setNewRoutineName('');
    setIsCreating(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black uppercase italic tracking-tighter">Mis Rutinas</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className="p-2 bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {isCreating && (
        <div className="bg-neutral-900 border border-emerald-900/20 p-5 rounded-3xl animate-in slide-in-from-top-4 duration-300">
          <input 
            autoFocus
            value={newRoutineName}
            onChange={(e) => setNewRoutineName(e.target.value)}
            placeholder="Nombre de la Rutina (ej. Torso/Pierna)"
            className="w-full bg-black/40 border border-emerald-900/10 rounded-2xl p-4 text-sm mb-4 outline-none focus:border-emerald-500/50 text-white"
          />
          <div className="flex gap-2">
            <button 
              onClick={createRoutine}
              className="flex-1 py-3 bg-emerald-600 rounded-2xl text-xs font-bold uppercase tracking-widest"
            >
              Crear
            </button>
            <button 
              onClick={() => setIsCreating(false)}
              className="px-6 py-3 bg-neutral-800 rounded-2xl text-xs font-bold uppercase tracking-widest"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {routines.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center h-[50vh] opacity-50">
          <ClipboardList size={48} className="text-neutral-800 mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-600">No hay rutinas guardadas.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {routines.map((r) => (
            <div key={r.id} className="bg-neutral-900/50 border border-emerald-900/10 rounded-3xl p-5 flex items-center justify-between hover:border-emerald-500/30 transition-all group">
              <div>
                <h3 className="font-bold text-emerald-50">{r.name}</h3>
                <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-1">
                  {r.exercises.length} Ejercicios planificados
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => onDeleteRoutine(r.id)}
                  className="p-2 text-neutral-700 hover:text-red-500 transition-colors"
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
