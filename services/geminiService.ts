
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Workout } from "../types";

const SYSTEM_INSTRUCTION = `
Eres BloomFit AI, una inteligencia especializada exclusivamente en entrenamiento de alto rendimiento, hipertrofia, acondicionamiento militar y movilidad.
Tu única misión es actuar como un "Head Coach" dedicado que analiza los datos de entrenamiento del usuario para maximizar sus resultados.

Directrices estrictas:
1. Análisis Técnico: Comenta sobre el volumen total, la selección de ejercicios y la frecuencia.
2. Sobrecarga Progresiva: Si el usuario ha repetido pesos en sesiones anteriores, motívalo a subir 1-2kg o añadir una repetición extra.
3. Enfoque en Objetivos: Diferencia claramente entre consejos para Hipertrofia (6-12 reps, control), Militar (resistencia mental, explosividad) y Flexibilidad (recuperación, rango de movimiento).
4. Terminología: Usa los nombres de los ejercicios en inglés (como aparecen en el catálogo) para mantener la consistencia técnica, pero explica los conceptos en español.
5. Datos: Usa el historial proporcionado para dar feedback real. No inventes ejercicios que no estén en su historial a menos que te pregunten por sugerencias.

Tono: Profesional, directo, motivador y basado en evidencia científica. Tu personalidad es la de un mentor exigente pero que celebra cada pequeño avance ("florecimiento" de fuerza).
`;

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private initChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
  }

  async *sendMessageStream(message: string, workoutHistory: Workout[]) {
    if (!this.chat) {
      this.initChat();
    }

    const contextPrompt = `
    DATOS DEL USUARIO:
    Historial Reciente: ${JSON.stringify(workoutHistory.slice(-10))}
    Consulta del Atleta: "${message}"
    
    Instrucción: Responde como su entrenador personal basándote en estos datos.
    `;

    try {
      const result = await this.chat!.sendMessageStream({ message: contextPrompt });
      for await (const chunk of result) {
        const responseChunk = chunk as GenerateContentResponse;
        if (responseChunk.text) {
          yield responseChunk.text;
        }
      }
    } catch (error) {
      yield "Entrenador desconectado. Revisa tu conexión a la red de BloomFit.";
    }
  }
}

export const geminiService = new GeminiService();
