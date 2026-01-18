# Bloom Fit 🌸💪

Bloom Fit es una aplicación web moderna de seguimiento de entrenamiento físico impulsada por Inteligencia Artificial. Diseñada para ser tu entrenador personal digital, te permite registrar tus rutinas, monitorear tu progreso y recibir asesoramiento personalizado, todo en una interfaz estética y fácil de usar.

## 🚀 Características Principales

- **Dashboard Intuitivo**: Visualiza tu progreso semanal y estadísticas clave de un vistazo.
- **Registro de Entrenamientos (Logger)**: Interfaz fluida para registrar series, repeticiones y pesos durante tu sesión.
- **Gestión de Rutinas**: Crea, guarda y carga tus rutinas personalizadas para empezar a entrenar rápidamente.
- **Historial de Entrenamientos**: Revisa todas tus sesiones pasadas y analiza tu constancia.
- **AI Trainer Inteligente**: Integración con Google Gemini para responder preguntas sobre fitness, nutrición y técnica de ejercicios.
- **Modo Oscuro/Claro**: Diseño responsivo y visualmente atractivo.

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido con un stack tecnológico moderno para garantizar rendimiento y escalabilidad:

- **[React](https://react.dev/)**: Biblioteca de JavaScript para construir interfaces de usuario.
- **[Vite](https://vitejs.dev/)**: Herramienta de construcción frontend de próxima generación.
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript con tipado estático para un código más robusto.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidades CSS para un diseño rápido y personalizado.
- **[Google GenAI SDK](https://ai.google.dev/)**: Para las funcionalidades de Inteligencia Artificial.
- **Lucide React**: Iconografía moderna y consistente.

## 💻 Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina local:

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 16 o superior) instalado.

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/denislcian/bloom-fit.git
   cd bloom-fit
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto. Necesitarás una API Key de Google Gemini.
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   ```
   > 💡 Puedes obtener tu API Key en [Google AI Studio](https://aistudio.google.com/).

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   Visita `http://localhost:3000` (o el puerto que te indique la consola) para ver la aplicación.

## 🌐 Despliegue en Vercel

Desplegar Bloom Fit en Vercel es muy sencillo. Sigue estos pasos para tener tu app online en minutos:

1. **Subir a GitHub**: Asegúrate de que tus cambios estén subidos a tu repositorio en GitHub.

2. **Crear cuenta en Vercel**: Si no tienes una, regístrate en [Vercel](https://vercel.com/).

3. **Importar Proyecto**:
   - En tu dashboard de Vercel, haz clic en **"Add New..."** > **"Project"**.
   - Selecciona tu repositorio `bloom-fit` de la lista y haz clic en **"Import"**.

4. **Configurar el Proyecto**:
   - **Framework Preset**: Vercel debería detectar automáticamente que es **Vite**.
   - **Root Directory**: Déjalo como `./` (por defecto).

5. **Variables de Entorno (IMPORTANTE)**:
   - Despliega la sección **"Environment Variables"**.
   - Añade la siguiente variable:
     - **Key**: `GEMINI_API_KEY`
     - **Value**: *Tu API Key de Google Gemini* (la misma que usaste localmente).

6. **Desplegar**:
   - Haz clic en **"Deploy"**.
   - Espera unos segundos mientras Vercel construye tu aplicación.

¡Listo! 🚀 Tu aplicación ahora está online y puedes compartir la URL con quien quieras.
