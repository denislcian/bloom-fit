
import React from 'react';
import { LayoutDashboard, ClipboardList, Sparkles, History, Flower2 } from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  // Fix: Declare Historial before it is used in navItems to avoid block-scope initialization error
  const Historial = History; // Alias for clarity in translation context

  const navItems = [
    { id: AppTab.DASHBOARD, icon: LayoutDashboard, label: 'Inicio' },
    { id: AppTab.ROUTINES, icon: ClipboardList, label: 'Rutinas' },
    { id: AppTab.TRAINER, icon: Sparkles, label: 'Experto' },
    { id: AppTab.HISTORY, icon: Historial, label: 'Registro' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-neutral-950 text-white overflow-hidden shadow-2xl border-x border-emerald-900/20">
      {/* Cabecera */}
      <header className="px-6 py-4 border-b border-emerald-900/10 flex justify-between items-center bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-600 rounded-lg shadow-lg shadow-emerald-900/20">
            <Flower2 size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">BLOOM<span className="text-emerald-500">FIT</span></h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800/50 flex items-center justify-center text-xs font-bold text-emerald-400">
          U
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto scroll-smooth pb-24">
        {children}
      </main>

      {/* Navegación Inferior */}
      <nav className="fixed bottom-0 w-full max-w-md bg-neutral-950/90 backdrop-blur-xl border-t border-emerald-900/10 px-6 py-3 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === item.id ? 'text-emerald-400' : 'text-neutral-600'
            }`}
          >
            <item.icon size={22} className={activeTab === item.id ? 'scale-110 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : ''} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
