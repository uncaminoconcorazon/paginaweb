// Contenido de las clases presenciales en Casa Corazón (grilla, abonos y acuerdos).
// Para actualizar horarios o precios, se edita solo este archivo.

export type Clase = { hora: string; nombre: string; nuevo?: boolean };
export type Dia = { dia: string; clases: Clase[] };

export const grillaIntro = "Un espacio para encontrarnos a través del movimiento, la respiración y la presencia.";

export const grilla: Dia[] = [
  { dia: "Martes", clases: [
    { hora: "11:00", nombre: "Yoga Suave", nuevo: true },
    { hora: "18:00", nombre: "Yoga para Infancias", nuevo: true },
    { hora: "19:15", nombre: "Yoga Vinyasa", nuevo: true },
  ] },
  { dia: "Miércoles", clases: [
    { hora: "17:00", nombre: "Yoga Restaurativo" },
    { hora: "19:00", nombre: "Yoga Dinámico" },
  ] },
  { dia: "Jueves", clases: [
    { hora: "11:00", nombre: "Yoga Suave", nuevo: true },
    { hora: "17:00", nombre: "Yoga Integral", nuevo: true },
    { hora: "19:00", nombre: "Yoga Vinyasa", nuevo: true },
  ] },
  { dia: "Viernes", clases: [
    { hora: "11:00", nombre: "Yoga Suave" },
    { hora: "16:30", nombre: "Yoga en Silla" },
    { hora: "19:00", nombre: "Yoga Integral" },
  ] },
  { dia: "Sábado", clases: [
    { hora: "11:00", nombre: "Yoga Suave" },
    { hora: "12:30", nombre: "Círculo de Meditación" },
  ] },
];

export const abonosNota = "Valores vigentes desde diciembre.";

export const abonos = [
  { veces: "1", frecuencia: "vez por semana", precio: "$50.000" },
  { veces: "2", frecuencia: "veces por semana", precio: "$65.000" },
  { veces: "3", frecuencia: "veces por semana", precio: "$80.000" },
];

export const claseSuelta = { etiqueta: "Valor por clase", precio: "$18.000" };

export const avisosAbonos = [
  "Los abonos se hacen del 1 al 10 de cada mes.",
  "Los cupos son reducidos (máximo 5 personas) y las clases requieren reserva previa.",
];

export const acuerdosIntro = "Para cuidar la organización, la convivencia y la experiencia que compartimos en Casa Corazón, te pedimos tener presentes los siguientes acuerdos.";

export const acuerdos: { titulo: string; texto: string[] }[] = [
  { titulo: "Abonos", texto: ["Los abonos se hacen del 1 al 10 de cada mes."] },
  { titulo: "Aviso de no continuidad", texto: [
    "Si no vas a continuar con tus clases el mes siguiente, deberás avisarme entre el 25 del mes anterior y el 3 del mes entrante.",
    "Si no recibo el aviso dentro de ese período, se entiende que continuás y que tu lugar queda reservado. Por lo tanto, deberá abonarse igualmente el mes correspondiente.",
  ] },
  { titulo: "Recuperación de clases", texto: ["Si no podés asistir, podés recuperar la clase dentro del mismo mes, según la disponibilidad de horarios y cupos."] },
  { titulo: "Puntualidad", texto: [
    "Te pedimos llegar 5 minutos antes del comienzo de la clase para poder prepararte y comenzar en horario.",
    "Pasados los 10 minutos de iniciada la práctica, no será posible ingresar, para cuidar el ambiente y la concentración del grupo.",
  ] },
  { titulo: "Celulares", texto: ["Antes de ingresar a la sala, recordá silenciar o apagar tu celular para evitar interrupciones."] },
  { titulo: "Silencio", texto: ["Cuidamos el silencio antes, durante y después de la práctica, respetando el espacio de conexión y presencia de cada persona."] },
  { titulo: "Respeto y amor", texto: ["Nos relacionamos desde el respeto, la empatía y el cuidado mutuo. Construimos entre todos un espacio amable, seguro y libre de juicios."] },
];

export const acuerdosCierre = "Gracias por ser parte de Casa Corazón y por ayudarnos a cuidar este espacio que construimos entre todos. Que cada encuentro sea una oportunidad para habitar el cuerpo, conectar con el presente y compartir desde el corazón.";
