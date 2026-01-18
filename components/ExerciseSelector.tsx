import React, { useState, useMemo } from 'react';
import { X, Search, Plus, Check, Eye } from 'lucide-react';
import { EXERCISE_CATALOG, ExerciseInfo } from '../data/exercises';
import ExercisePreview from './ExercisePreview';

interface ExerciseSelectorProps {
    onClose: () => void;
    onSelect: (exercises: ExerciseInfo[]) => void;
    multiSelect?: boolean;
}

const CATEGORIES = ['Todos', 'Cuádriceps', 'Isquios y Glúteo', 'Empuje (Push)', 'Tracción (Pull)', 'Core y Blindaje', 'Carga y Cardio'];

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({ onClose, onSelect, multiSelect = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedExercises, setSelectedExercises] = useState<ExerciseInfo[]>([]);
    const [previewExercise, setPreviewExercise] = useState<ExerciseInfo | null>(null);

    const filteredCatalog = useMemo(() => {
        return EXERCISE_CATALOG.filter(e => {
            const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Todos' || e.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const toggleSelection = (exercise: ExerciseInfo) => {
        if (!multiSelect) {
            onSelect([exercise]);
            return;
        }

        if (selectedExercises.find(e => e.name === exercise.name)) {
            setSelectedExercises(selectedExercises.filter(e => e.name !== exercise.name));
        } else {
            setSelectedExercises([...selectedExercises, exercise]);
        }
    };

    const handleConfirm = () => {
        onSelect(selectedExercises);
    };

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] p-4 flex flex-col animate-in fade-in duration-300">
            {previewExercise && <ExercisePreview exercise={previewExercise} onClose={() => setPreviewExercise(null)} />}

            <div className="flex-1 bg-neutral-900 rounded-[2.5rem] overflow-hidden border border-emerald-900/20 flex flex-col shadow-2xl relative">
                <div className="p-6 border-b border-emerald-900/10 flex items-center justify-between bg-neutral-900/50 backdrop-blur z-10">
                    <h2 className="text-xl font-black uppercase tracking-tighter text-white">Catálogo Táctico</h2>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-white"><X /></button>
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

                <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-3">
                    {filteredCatalog.length > 0 ? (
                        filteredCatalog.map((info, idx) => {
                            const isSelected = selectedExercises.some(e => e.name === info.name);
                            return (
                                <div key={idx} className="flex gap-2">
                                    <button
                                        onClick={() => toggleSelection(info)}
                                        className={`flex-1 flex items-center justify-between p-5 border transition-all rounded-3xl group ${isSelected
                                                ? 'bg-emerald-900/30 border-emerald-500 ring-1 ring-emerald-500'
                                                : 'bg-neutral-800/30 border-emerald-900/5 hover:bg-emerald-900/20 hover:border-emerald-500/30'
                                            }`}
                                    >
                                        <div className="text-left">
                                            <p className={`font-bold text-base transition-colors ${isSelected ? 'text-white' : 'text-emerald-50'}`}>{info.name}</p>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-[9px] bg-emerald-950/30 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter border border-emerald-900/20">
                                                    {info.category}
                                                </span>
                                            </div>
                                        </div>
                                        {isSelected ? (
                                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
                                                <Check size={16} strokeWidth={4} />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full border-2 border-emerald-900/30 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                                                <Plus size={20} className="text-emerald-700 group-hover:text-emerald-500" />
                                            </div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setPreviewExercise(info)}
                                        className="p-5 bg-neutral-800/30 rounded-3xl border border-emerald-900/5 hover:bg-emerald-600 hover:text-white text-emerald-600 transition-all"
                                    >
                                        <Eye size={20} />
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div className="py-20 text-center text-neutral-600">Sin resultados</div>
                    )}
                </div>

                {/* Floating Action Button for Multi-select */}
                {multiSelect && selectedExercises.length > 0 && (
                    <div className="absolute bottom-6 left-6 right-6">
                        <button
                            onClick={handleConfirm}
                            className="w-full bg-emerald-500 text-white font-bold uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 animate-in slide-in-from-bottom-4"
                        >
                            <Plus size={24} strokeWidth={3} />
                            Añadir {selectedExercises.length} Ejercicios
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExerciseSelector;
