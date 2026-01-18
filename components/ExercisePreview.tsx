
import React from 'react';
import { X, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { ExerciseInfo } from '../data/exercises';

interface ExercisePreviewProps {
  exercise: ExerciseInfo;
  onClose: () => void;
}

const ExercisePreview: React.FC<ExercisePreviewProps> = ({ exercise, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-neutral-900 w-full max-w-md rounded-[2.5rem] border border-emerald-900/20 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
        {/* Cabecera Visual Animada (Representación del movimiento) */}
        <div className="h-48 bg-gradient-to-b from-emerald-900/20 to-neutral-900 relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent animate-pulse" />
          </div>
          
          {/* Animación Minimalista del Ejercicio */}
          <div className="relative w-32 h-32 border-4 border-emerald-500/20 rounded-full flex items-center justify-center">
             <div className="absolute w-20 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDuration: '2s' }} />
             <div className="text-[10px] font-black uppercase text-emerald-500/50 tracking-tighter">Patrón: {exercise.type}</div>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-neutral-800/80 rounded-full text-white hover:bg-emerald-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-500 rounded text-[9px] font-black uppercase tracking-widest border border-emerald-900/30">
                {exercise.category}
              </span>
              <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">MET: {exercise.met}</span>
            </div>
            <h2 className="text-2xl font-black italic tracking-tighter text-white">{exercise.name}</h2>
          </div>

          {exercise.description && (
            <p className="text-sm text-neutral-400 leading-relaxed italic">
              "{exercise.description}"
            </p>
          )}

          {exercise.steps && (
            <div className="space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                <Info size={12} /> Guía de ejecución
              </h3>
              <div className="space-y-2">
                {exercise.steps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <span className="text-[10px] font-mono text-emerald-700 mt-1">{i + 1}.</span>
                    <p className="text-xs text-neutral-300 group-hover:text-emerald-400 transition-colors">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePreview;
