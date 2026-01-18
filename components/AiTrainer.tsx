
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Message, Workout } from '../types';

interface AiTrainerProps {
  workoutHistory: Workout[];
}

const AiTrainer: React.FC<AiTrainerProps> = ({ workoutHistory }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "¡Hola! Soy BloomFit AI, tu experto personal en entrenamiento. ¿Cómo puedo optimizar tu rendimiento hoy?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let fullResponse = '';
      const responseStream = geminiService.sendMessageStream(input, workoutHistory);
      
      setMessages(prev => [...prev, { role: 'model', content: '', timestamp: Date.now() }]);

      for await (const chunk of responseStream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = fullResponse;
          return newMsgs;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Lo siento, tuve problemas para procesar eso. Revisa tu conexión.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 relative overflow-hidden">
      {/* Resplandor de Fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-600/10 blur-[100px] pointer-events-none" />

      {/* Mensajes */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth z-10"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                msg.role === 'user' 
                ? 'bg-neutral-800 border-neutral-700 text-emerald-400' 
                : 'bg-emerald-600 border-emerald-500 text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-neutral-900 border border-neutral-800 rounded-tr-none' 
                : 'bg-neutral-900 border border-neutral-800 rounded-tl-none text-neutral-200'
              }`}>
                {msg.content || (isLoading && i === messages.length - 1 ? <Loader2 size={16} className="animate-spin text-emerald-500" /> : '')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Área de Entrada */}
      <div className="p-4 bg-neutral-950 border-t border-neutral-900 sticky bottom-0 z-20">
        <div className="flex items-center gap-2 bg-neutral-900 rounded-2xl p-2 border border-neutral-800 focus-within:border-emerald-500/50 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pide consejos, planes o análisis..."
            className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white transition-all active:scale-95 disabled:grayscale disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-neutral-600 mt-2 font-medium tracking-wide">
          <Sparkles size={8} className="inline mr-1" /> POTENCIADO POR GEMINI PRO
        </p>
      </div>
    </div>
  );
};

export default AiTrainer;
