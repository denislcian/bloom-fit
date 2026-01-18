
import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Zap, History, ChevronRight, Flower2 } from 'lucide-react';
import { Workout } from '../types';

interface DashboardProps {
  workouts: Workout[];
  onStartTraining: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ workouts, onStartTraining }) => {
  const lastWorkout = workouts[workouts.length - 1];
  
  const chartData = workouts.slice(-7).map(w => ({
    name: new Date(w.date).toLocaleDateString('es-ES', { weekday: 'short' }),
    calories: w.caloriesBurned || 0,
    volume: w.exercises.reduce((acc, ex) => 
      acc + ex.sets.reduce((sAcc, set) => sAcc + (set.weight * set.reps), 0), 0
    )
  }));

  const totalCalories = workouts.reduce((acc, w) => acc + (w.caloriesBurned || 0), 0);
  const thisWeekWorkouts = workouts.filter(w => {
    const date = new Date(w.date);
    const now = new Date();
    return (now.getTime() - date.getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Tarjeta Hero */}
      <div className="relative p-6 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-[2.5rem] overflow-hidden shadow-xl shadow-emerald-950/40 group">
        <div className="relative z-10">
          <h2 className="text-3xl font-black italic tracking-tighter mb-1">FORJA TU <br/>MEJOR VERSIÓN.</h2>
          <p className="text-xs font-bold text-emerald-100/70 mb-6 uppercase tracking-[0.2em]">El éxito se entrena a diario</p>
          <button 
            onClick={onStartTraining}
            className="bg-white text-emerald-800 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            Nueva Sesión <Zap size={14} fill="currentColor" />
          </button>
        </div>
        <div className="absolute right-[-10%] bottom-[-10%] text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
          <Flower2 size={240} />
        </div>
      </div>

      {/* Rejilla de Estadísticas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-900/50 p-5 rounded-3xl border border-emerald-900/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
              <Activity size={18} />
            </div>
            <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Actividad</span>
          </div>
          <div className="text-3xl font-black text-emerald-50">{thisWeekWorkouts}</div>
          <div className="text-[10px] text-emerald-600 mt-1 font-bold uppercase tracking-widest">Sesiones esta semana</div>
        </div>
        <div className="bg-neutral-900/50 p-5 rounded-3xl border border-emerald-900/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
              <Zap size={18} />
            </div>
            <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Energía</span>
          </div>
          <div className="text-3xl font-black text-emerald-50">{Math.round(totalCalories / 100) / 10}k</div>
          <div className="text-[10px] text-orange-600 mt-1 font-bold uppercase tracking-widest">Calorías Totales</div>
        </div>
      </div>

      {/* Gráfico de Quema */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-600">Progresión de Calorías</h2>
          <span className="text-[10px] bg-emerald-900/20 px-2 py-1 rounded-full text-emerald-500 border border-emerald-900/20 font-bold">ÚLTIMOS 7 DÍAS</span>
        </div>
        <div className="h-48 w-full bg-neutral-900/20 rounded-[2rem] border border-emerald-900/10 p-4 relative overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', fontSize: '10px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="calories" stroke="#10b981" fillOpacity={1} fill="url(#colorBurn)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Registro Reciente */}
      <section>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-600 mb-4 px-1">Sesiones Recientes</h2>
        {lastWorkout ? (
          <div className="bg-neutral-900 rounded-3xl border border-emerald-900/10 p-4 flex items-center justify-between hover:bg-neutral-800/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-950/30 rounded-[1.2rem] border border-emerald-900/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                <History size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-emerald-50">{lastWorkout.title}</h3>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{new Date(lastWorkout.date).toLocaleDateString()} • {lastWorkout.caloriesBurned} kcal</p>
              </div>
            </div>
            <ChevronRight className="text-neutral-700 group-hover:text-emerald-500" size={20} />
          </div>
        ) : (
          <div className="bg-neutral-900/20 border border-dashed border-emerald-900/20 rounded-[2rem] p-10 text-center">
            <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest">Sin actividad registrada aún.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
