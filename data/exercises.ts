
export interface ExerciseInfo {
  name: string;
  type: 'strength' | 'cardio' | 'bodyweight' | 'flexibility';
  category: string;
  met: number;
  description?: string;
  steps?: string[];
}

export const EXERCISE_CATALOG: ExerciseInfo[] = [
  // 1. TREN INFERIOR - CUÁDRICEPS
  {
    name: 'Sentadilla Hack', type: 'strength', category: 'Cuádriceps', met: 7.5,
    description: 'Ejercicio principal de empuje. Marca actual: 168-188 kg.',
    steps: ['Coloca los hombros bajo las almohadillas.', 'Pies a media altura en la plataforma.', 'Desciende hasta que tus muslos rompan la paralela.', 'Empuja explosivamente.']
  },
  { name: 'Prensa de Piernas Inclinada', type: 'strength', category: 'Cuádriceps', met: 6.0, description: 'Enfoque en volumen y densidad muscular.', steps: ['Pies a anchura de caderas.', 'Baja el peso controladamente.', 'Evita el bloqueo total de rodillas.'] },
  { name: 'Sentadilla Búlgara', type: 'strength', category: 'Cuádriceps', met: 7.0, description: 'Clave para estabilidad unilateral y glúteo.', steps: ['Un pie elevado en banco tras de ti.', 'Mantén el torso ligeramente inclinado.', 'Baja verticalmente.'] },
  { name: 'Extensiones de Cuádriceps', type: 'strength', category: 'Cuádriceps', met: 3.5, description: 'Aislamiento puro para la parte anterior del muslo.', steps: ['Ajusta el rodillo sobre los tobillos.', 'Extiende las piernas por completo.', 'Sujeta las asas para evitar que la cadera se levante.'] },
  { name: 'Zancadas (Walking Lunges)', type: 'strength', category: 'Cuádriceps', met: 6.5, description: 'Transferencia directa al rucking. Usar sacos o chaleco.', steps: ['Paso largo hacia adelante.', 'La rodilla trasera casi toca el suelo.', 'Mantén el core estable ante el peso.'] },

  // 2. TREN INFERIOR - CADENA POSTERIOR
  { name: 'Curl Femoral Sentado/Tumbado', type: 'strength', category: 'Isquios y Glúteo', met: 4.0, description: 'Punto fuerte. Marca actual: 50 kg.', steps: ['Ajusta la máquina para que el eje coincida con la rodilla.', 'Contracción máxima en el punto más bajo.'] },
  { name: 'Hiperextensiones', type: 'strength', category: 'Isquios y Glúteo', met: 3.5, description: 'Variante segura para lumbar con carga en pecho.', steps: ['Ajusta el soporte bajo la cadera.', 'Baja el torso con espalda neutra.', 'Sube usando glúteos e isquios.'] },
  { name: 'Cable Pull-throughs', type: 'strength', category: 'Isquios y Glúteo', met: 4.0, description: 'Bisagra de cadera segura en polea baja.', steps: ['De espaldas a la polea.', 'Lleva el peso entre las piernas.', 'Extiende la cadera con fuerza.'] },
  { name: 'Peso Muerto Rumano (RDL)', type: 'strength', category: 'Isquios y Glúteo', met: 7.0, description: 'Solo incluir si no hay fatiga lumbar.', steps: ['Baja la barra pegada a las piernas.', 'Siente el estiramiento en los isquios.', 'No bajes más allá de la flexibilidad de tu cadera.'] },
  { name: 'Elevación de Gemelos de pie', type: 'strength', category: 'Isquios y Glúteo', met: 3.0, description: 'Ejercicio crítico. Marca actual: 220 kg.', steps: ['Máxima extensión del tobillo.', 'Pausa un segundo en el estiramiento.', 'Contracción explosiva.'] },

  // 3. TREN SUPERIOR - EMPUJE
  { name: 'Press Militar en Máquina', type: 'strength', category: 'Empuje (Push)', met: 5.5, description: 'Marca actual: 50 kg.', steps: ['Espalda bien apoyada.', 'Codos ligeramente hacia adelante.', 'Extiende sobre la cabeza.'] },
  { name: 'Arnold Press', type: 'strength', category: 'Empuje (Push)', met: 5.5, description: 'Para hombro 3D y estabilidad de la articulación.', steps: ['Palmas hacia ti al inicio.', 'Rota las mancuernas mientras subes.', 'Palmas hacia afuera al final.'] },
  { name: 'Press Convergente de Pecho', type: 'strength', category: 'Empuje (Push)', met: 5.0, description: 'Fuerza horizontal máxima.', steps: ['Ajusta el asiento para que el agarre esté a la altura del pezón.', 'Empuja hacia el centro.'] },
  { name: 'Aperturas en Polea', type: 'strength', category: 'Empuje (Push)', met: 3.5, description: 'Aislamiento pectoral con tensión constante.', steps: ['Cables a altura media o alta.', 'Abraza un barril imaginario.', 'Contrae el pecho en el centro.'] },
  { name: 'Flexiones Tácticas (Push-ups)', type: 'bodyweight', category: 'Empuje (Push)', met: 8.0, description: 'Resistencia con peso corporal.', steps: ['Manos bajo los hombros.', 'Cuerpo como una tabla.', 'Codos pegados a 45 grados.'] },
  { name: 'Extensión de Tríceps en Polea (Cuerda)', type: 'strength', category: 'Empuje (Push)', met: 3.0, description: 'Aislamiento del tríceps.', steps: ['Separa la cuerda al final del movimiento.', 'No muevas los codos del sitio.'] },

  // 4. TREN SUPERIOR - TRACCIÓN
  { name: 'Dominadas Asistidas', type: 'strength', category: 'Tracción (Pull)', met: 8.0, description: 'Enfoque en progresión de fuerza vertical.', steps: ['Agarre ancho.', 'Pecho hacia la barra.', 'Controla el descenso.'] },
  { name: 'Jalón al Pecho', type: 'strength', category: 'Tracción (Pull)', met: 4.5, description: 'Marca actual: 75 kg.', steps: ['Lleva la barra a la parte superior del pecho.', 'Retrae las escápulas.'] },
  { name: 'Remo en Polea Baja', type: 'strength', category: 'Tracción (Pull)', met: 4.5, description: 'Densidad total de la espalda.', steps: ['Rodillas ligeramente flexionadas.', 'Tira hacia el ombligo.', 'No balancees el torso.'] },
  { name: 'Remo al Mentón (Sacos)', type: 'strength', category: 'Tracción (Pull)', met: 5.0, description: 'Trapecio y hombro lateral con material táctico.', steps: ['Agarra el saco/mancuerna.', 'Tira de los codos hacia el techo.', 'Mantén el peso cerca del cuerpo.'] },
  { name: 'Curl Martillo con Mancuernas', type: 'strength', category: 'Tracción (Pull)', met: 3.0, description: 'Braquial y agarre. Marca actual: 20 kg.', steps: ['Palmas enfrentadas.', 'No gires las muñecas.', 'Controla la bajada.'] },
  { name: 'Face Pulls', type: 'strength', category: 'Tracción (Pull)', met: 3.0, description: 'Salud del hombro y deltoide posterior.', steps: ['Polea a la altura de la cara.', 'Tira de la cuerda hacia la frente.', 'Separa las manos al final.'] },
  { name: 'Pájaros (Bent-over Lateral Raise)', type: 'strength', category: 'Tracción (Pull)', met: 3.0, description: 'Aislamiento de deltoide posterior.', steps: ['Inclina el torso 90 grados.', 'Lanza las manos hacia los lados.', 'Pequeña pausa arriba.'] },

  // 5. CORE Y ESTABILIZACIÓN
  { name: 'Hanging Leg Raises', type: 'bodyweight', category: 'Core y Blindaje', met: 4.0, description: 'Elevación de piernas colgado para core inferior.', steps: ['Cuélgate de la barra.', 'Sube las piernas estiradas o rodillas al pecho.', 'Evita el balanceo.'] },
  { name: 'Crunches en Polea Alta', type: 'strength', category: 'Core y Blindaje', met: 3.0, description: 'Abdominales con carga pesada.', steps: ['De rodillas frente a la polea.', 'Encógete llevando los codos a los muslos.', 'Fuerza abdominal pura.'] },
  { name: 'Plancha con Saco (Weighted Plank)', type: 'bodyweight', category: 'Core y Blindaje', met: 3.5, description: 'Estabilidad específica para rucking.', steps: ['Peso sobre la zona lumbar/dorsal.', 'Mantén la línea recta.', 'Respira profundamente bajo tensión.'] },
  { name: 'Deadbug', type: 'bodyweight', category: 'Core y Blindaje', met: 2.0, description: 'Control motor y salud lumbar.', steps: ['Boca arriba, brazos y piernas arriba.', 'Baja brazo y pierna contraria lentamente.', 'Pega la lumbar al suelo.'] },

  // 6. CARGA Y CONDICIONAMIENTO
  { name: 'Paseo del Granjero (Farmer\'s Walk)', type: 'strength', category: 'Carga y Cardio', met: 6.5, description: 'Brute force agarre y estabilidad sistémica.', steps: ['Pesos pesados en cada mano.', 'Pasos cortos y rápidos.', 'Torso erguido.'] },
  { name: 'Rucking', type: 'cardio', category: 'Carga y Cardio', met: 8.5, description: 'Disciplina principal: 10 kg chaleco / 5.5 km/h.', steps: ['Carga bien distribuida.', 'Ritmo constante.', 'Calzado adecuado.'] },
  { name: 'Caminata LISS (Inclinación)', type: 'cardio', category: 'Carga y Cardio', met: 5.0, description: 'Recuperación activa sin carga articular.', steps: ['Inclinación de 5-10%.', 'Paso moderado.', 'Sin sujetarse a la máquina.'] },

  // 7. BÍCEPS Y ANTEBRAZO
  { name: 'Curl con Barra (Barbell Curl)', type: 'strength', category: 'Tracción (Pull)', met: 4.0, description: 'Constructor de masa clásico.', steps: ['Codos pegados al cuerpo.', 'Sin balanceo de espalda.', 'Aprieta arriba.'] },
  { name: 'Curl Predicador (Scott Curl)', type: 'strength', category: 'Tracción (Pull)', met: 3.5, description: 'Aislamiento total del pico del bíceps.', steps: ['Axilas pegadas al banco.', 'Extensión completa del brazo.', 'No levantes el culo del asiento.'] },
  { name: 'Curl Inclinado con Mancuernas', type: 'strength', category: 'Tracción (Pull)', met: 3.5, description: 'Énfasis en la cabeza larga (estiramiento).', steps: ['Banco a 45-60 grados.', 'Brazos colgando detrás del cuerpo.', 'Mantén los codos atrás al subir.'] },
  { name: 'Curl Araña (Spider Curl)', type: 'strength', category: 'Tracción (Pull)', met: 3.5, description: 'Énfasis en la cabeza corta (contracción).', steps: ['Pecho apoyado en banco inclinado.', 'Brazos colgando verticales.', 'Sube sin mover los hombros.'] },
  { name: 'Paseo de Dedos (Finger Rolls)', type: 'strength', category: 'Tracción (Pull)', met: 3.0, description: 'Fuerza de agarre extrema.', steps: ['Barra pesada en las manos.', 'Deja rodar la barra hasta las puntas de los dedos.', 'Cierra la mano explosivamente.'] },

  // 8. TRÍCEPS
  { name: 'Press Francés (Skullcrushers)', type: 'strength', category: 'Empuje (Push)', met: 4.0, description: 'Cabeza larga y media del tríceps.', steps: ['Barra Z.', 'Baja detrás de la cabeza para más estiramiento.', 'Codos cerrados.'] },
  { name: 'Fondos en Paralelas (Dips)', type: 'bodyweight', category: 'Empuje (Push)', met: 5.0, description: 'El rey de los ejercicios de empuje bg.', steps: ['Inclínate adelante para pecho, vertical para tríceps.', 'Baja hasta 90 grados.', 'No encojas los hombros.'] },
  { name: 'Patada de Tríceps en Polea', type: 'strength', category: 'Empuje (Push)', met: 3.0, description: 'Contracción pico final.', steps: ['Sin mover el hombro.', 'Extiende el brazo hacia atrás.', 'Aguanta 1 segundo.'] },
  { name: 'Press de Banca Agarre Cerrado', type: 'strength', category: 'Empuje (Push)', met: 5.0, description: 'Potencia de tríceps y pecho interior.', steps: ['Manos a la anchura de los hombros.', 'Codos pegados al cuerpo al bajar.', 'Empuja traccionando la barra.'] },

  // 9. HOMBROS (DELTOIDES)
  { name: 'Elevaciones Laterales (Mancuernas)', type: 'strength', category: 'Empuje (Push)', met: 3.5, description: 'Anchura visual (Cabeza lateral).', steps: ['Codos ligeramente flexionados.', 'Sube hasta la altura del hombro.', 'Meñique más alto que el pulgar.'] },
  { name: 'Elevaciones Laterales en Polea (Y-Raise)', type: 'strength', category: 'Empuje (Push)', met: 3.5, description: 'Tensión continua en todo el rango.', steps: ['Cruza los cables por detrás o delante.', 'Sube en diagonal.', 'Controla la negativa.'] },
  { name: 'Press Arnold con Kettlebell', type: 'strength', category: 'Empuje (Push)', met: 5.5, description: 'Estabilidad y fuerza funcional.', steps: ['Kettlemell invertida (bottom-up) para mayor reto.', 'Rota y prensa.'] },

  // 10. PECHO (PECTORAL)
  { name: 'Press de Banca Inclinado con Mancuernas', type: 'strength', category: 'Empuje (Push)', met: 5.0, description: 'Desarrollo del pectoral superior (clavicular).', steps: ['Banco a 30 grados.', 'Baja profundo para estirar.', 'Junta las mancuernas arriba sin tocarlas.'] },
  { name: 'Cruces de Polea Alta a Baja', type: 'strength', category: 'Empuje (Push)', met: 3.5, description: 'Pectoral inferior y corte.', steps: ['Tira hacia abajo y al centro.', 'Cruza las manos al final.', 'Mantén el pecho alto.'] },
  { name: 'Landmine Press', type: 'strength', category: 'Empuje (Push)', met: 5.0, description: 'Pecho superior y hombro, muy seguro.', steps: ['Barra anclada en una esquina.', 'Empuja con una o dos manos.', 'Inclínate ligeramente hacia adelante.'] },

  // 11. ESPALDA (DORSAL)
  { name: 'Remo T-Bar (Con apoyo)', type: 'strength', category: 'Tracción (Pull)', met: 5.0, description: 'Grosor de espalda media y alta.', steps: ['Pecho apoyado.', 'Agarre neutro o prono.', 'Junta las escápulas fuerte.'] },
  { name: 'Pull-over en Polea Alta', type: 'strength', category: 'Tracción (Pull)', met: 3.5, description: 'Aislamiento de dorsal ancho (lats).', steps: ['Brazos casi rectos.', 'Lleva la barra a la cadera.', 'Siente el estiramiento arriba.'] },
  { name: 'Dominadas Neutras', type: 'bodyweight', category: 'Tracción (Pull)', met: 8.0, description: 'Mejor ventaja mecánica para fuerza.', steps: ['Palmas enfrentadas.', 'Pecho a la barra.', 'Rango completo.'] },

  // 12. PIERNA (ADUCTORES Y OTROS)
  { name: 'Aductores en Máquina', type: 'strength', category: 'Isquios y Glúteo', met: 3.5, description: 'Estabilidad de cadera y tamaño de pierna.', steps: ['Cierra con fuerza.', 'Controla la apertura.', 'No rebotes.'] },
  { name: 'Sentadilla Goblet', type: 'strength', category: 'Cuádriceps', met: 6.0, description: 'Movilidad y calentamiento pesado.', steps: ['Mancuerna al pecho.', 'Codos por dentro de rodillas.', 'Torso muy vertical.'] },

  // 13. CORE DE COMBATE
  { name: 'Pallof Press', type: 'strength', category: 'Core y Blindaje', met: 3.0, description: 'Anti-rotación fundamental.', steps: ['Polea a altura del pecho.', 'Alejate lateralmente.', 'Estira los brazos al frente sin girar.'] },
  { name: 'Levantamiento Turco (TGU)', type: 'strength', category: 'Core y Blindaje', met: 6.0, description: 'Estabilidad total del cuerpo.', steps: ['Mano siempre mirando la pesa.', 'Movimientos segmentados.', 'Control absoluto.'] },
  { name: 'Rueda Abdominal (Ab Wheel)', type: 'bodyweight', category: 'Core y Blindaje', met: 5.0, description: 'Extensión anti-lumbar extrema.', steps: ['No dejes caer la cadera.', 'Empuja desde el dorsal.', 'Rango que puedas controlar.'] },
];
