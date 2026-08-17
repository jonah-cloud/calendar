import type { LevelDef, StaticQ, UnitDef } from "../types";
import { vocabQ } from "../rand";

/** Build a vocab unit from es/en pairs. */
function vUnit(id: string, title: string, emoji: string, pairs: [string, string][]): UnitDef {
  return {
    id,
    title,
    emoji,
    gen: () =>
      vocabQ(
        pairs,
        (es) => `What does "${es}" mean in English?`,
        (en) => `How do you say "${en}" in Spanish?`
      ),
  };
}

function bUnit(id: string, title: string, emoji: string, bank: StaticQ[]): UnitDef {
  return { id, title, emoji, bank };
}

const COLORS: [string, string][] = [
  ["rojo", "red"],
  ["azul", "blue"],
  ["verde", "green"],
  ["amarillo", "yellow"],
  ["morado", "purple"],
  ["rosado", "pink"],
  ["negro", "black"],
  ["blanco", "white"],
  ["anaranjado", "orange"],
  ["café", "brown"],
];

const NUMBERS1: [string, string][] = [
  ["uno", "1"],
  ["dos", "2"],
  ["tres", "3"],
  ["cuatro", "4"],
  ["cinco", "5"],
  ["seis", "6"],
  ["siete", "7"],
  ["ocho", "8"],
  ["nueve", "9"],
  ["diez", "10"],
];

const ANIMALS: [string, string][] = [
  ["el perro", "dog"],
  ["el gato", "cat"],
  ["el pájaro", "bird"],
  ["el pez", "fish"],
  ["el caballo", "horse"],
  ["la vaca", "cow"],
  ["el cerdo", "pig"],
  ["el conejo", "rabbit"],
  ["el león", "lion"],
  ["el mono", "monkey"],
];

const GREETINGS: [string, string][] = [
  ["hola", "hello"],
  ["adiós", "goodbye"],
  ["por favor", "please"],
  ["gracias", "thank you"],
  ["buenos días", "good morning"],
  ["buenas noches", "good night"],
  ["sí", "yes"],
  ["no", "no"],
  ["amigo", "friend"],
  ["me llamo…", "my name is…"],
];

const FAMILY: [string, string][] = [
  ["la mamá", "mom"],
  ["el papá", "dad"],
  ["la hermana", "sister"],
  ["el hermano", "brother"],
  ["la abuela", "grandma"],
  ["el abuelo", "grandpa"],
  ["la tía", "aunt"],
  ["el tío", "uncle"],
  ["el bebé", "baby"],
  ["la familia", "family"],
];

const FOOD: [string, string][] = [
  ["la manzana", "apple"],
  ["el pan", "bread"],
  ["la leche", "milk"],
  ["el queso", "cheese"],
  ["el huevo", "egg"],
  ["el agua", "water"],
  ["el jugo", "juice"],
  ["la fresa", "strawberry"],
  ["el pollo", "chicken"],
  ["el helado", "ice cream"],
];

const BODY: [string, string][] = [
  ["la cabeza", "head"],
  ["los ojos", "eyes"],
  ["la nariz", "nose"],
  ["la boca", "mouth"],
  ["las orejas", "ears"],
  ["las manos", "hands"],
  ["los pies", "feet"],
  ["el pelo", "hair"],
  ["los brazos", "arms"],
  ["las piernas", "legs"],
];

const NUMBERS2: [string, string][] = [
  ["once", "11"],
  ["doce", "12"],
  ["trece", "13"],
  ["catorce", "14"],
  ["quince", "15"],
  ["dieciséis", "16"],
  ["veinte", "20"],
  ["treinta", "30"],
  ["cincuenta", "50"],
  ["cien", "100"],
];

const CLOTHES: [string, string][] = [
  ["la camisa", "shirt"],
  ["los pantalones", "pants"],
  ["los zapatos", "shoes"],
  ["el vestido", "dress"],
  ["el sombrero", "hat"],
  ["los calcetines", "socks"],
  ["la chaqueta", "jacket"],
  ["la falda", "skirt"],
];

const HOUSE: [string, string][] = [
  ["la casa", "house"],
  ["la puerta", "door"],
  ["la ventana", "window"],
  ["la mesa", "table"],
  ["la silla", "chair"],
  ["la cama", "bed"],
  ["la cocina", "kitchen"],
  ["el baño", "bathroom"],
  ["el jardín", "garden"],
  ["la escuela", "school"],
];

const DAYS: [string, string][] = [
  ["lunes", "Monday"],
  ["martes", "Tuesday"],
  ["miércoles", "Wednesday"],
  ["jueves", "Thursday"],
  ["viernes", "Friday"],
  ["sábado", "Saturday"],
  ["domingo", "Sunday"],
  ["hoy", "today"],
  ["mañana", "tomorrow"],
];

const VERBS: [string, string][] = [
  ["correr", "to run"],
  ["saltar", "to jump"],
  ["comer", "to eat"],
  ["beber", "to drink"],
  ["dormir", "to sleep"],
  ["jugar", "to play"],
  ["leer", "to read"],
  ["cantar", "to sing"],
  ["bailar", "to dance"],
  ["nadar", "to swim"],
];

const WEATHER: [string, string][] = [
  ["hace sol", "it's sunny"],
  ["hace frío", "it's cold"],
  ["hace calor", "it's hot"],
  ["llueve", "it's raining"],
  ["nieva", "it's snowing"],
  ["el sol", "the sun"],
  ["la lluvia", "the rain"],
  ["la nieve", "the snow"],
  ["las nubes", "the clouds"],
  ["el viento", "the wind"],
];

const FEELINGS: [string, string][] = [
  ["feliz", "happy"],
  ["triste", "sad"],
  ["enojado", "angry"],
  ["cansado", "tired"],
  ["emocionada", "excited"],
  ["asustado", "scared"],
  ["aburrido", "bored"],
  ["orgullosa", "proud"],
];

const PHRASES: StaticQ[] = [
  { p: `Someone asks "¿Cómo estás?" What are they asking?`, a: "How are you?", w: ["What is your name?", "Where do you live?", "How old are you?"] },
  { p: `How do you answer "¿Cómo te llamas?"`, a: "Me llamo Ana.", w: ["Tengo ocho años.", "Estoy bien.", "Me gusta el helado."], x: `They asked your name — "Me llamo…" = "My name is…"` },
  { p: `"¿Cuántos años tienes?" is asking about your…`, a: "age", w: ["name", "favorite color", "house"] },
  { p: `What does "Estoy bien" mean?`, a: "I am well / good", w: ["I am hungry", "I am lost", "I am eight"] },
  { p: `What does "Tengo hambre" mean?`, a: "I am hungry", w: ["I am tired", "I have a dog", "I am happy"] },
  { p: `How do you say "I like…" in Spanish?`, a: "Me gusta…", w: ["Me llamo…", "Yo soy…", "Tengo…"] },
  { p: `"¿Dónde está el baño?" means…`, a: "Where is the bathroom?", w: ["What time is it?", "Where is the dog?", "Who is that?"] },
  { p: `What does "¡Vamos!" mean?`, a: "Let's go!", w: ["Stop!", "Look!", "Listen!"] },
];

const SER_ESTAR: StaticQ[] = [
  { p: `Fill in: "Yo ___ Hallie." (My name/identity)`, a: "soy", w: ["estoy", "eres", "es"], x: `"Ser" (soy) is for who you ARE.` },
  { p: `Fill in: "Yo ___ feliz hoy." (feeling today)`, a: "estoy", w: ["soy", "eres", "somos"], x: `"Estar" (estoy) is for how you FEEL.` },
  { p: `Fill in: "Tú ___ mi amiga."`, a: "eres", w: ["estás", "soy", "son"] },
  { p: `Fill in: "Ella ___ cansada." (she feels tired)`, a: "está", w: ["es", "eres", "estoy"] },
  { p: `Fill in: "Nosotros ___ una familia."`, a: "somos", w: ["estamos", "son", "eres"] },
  { p: `Fill in: "Yo ___ ocho años." (age)`, a: "tengo", w: ["soy", "estoy", "tienes"], x: `In Spanish you HAVE years: "tengo ocho años."` },
  { p: `Fill in: "El gato ___ en la casa." (location)`, a: "está", w: ["es", "soy", "eres"], x: `"Estar" is for where things ARE located.` },
  { p: `Fill in: "Mis hermanas ___ simpáticas."`, a: "son", w: ["están", "es", "somos"] },
];

const ARTICLES: StaticQ[] = [
  { p: `Which article goes with "gato" (cat)?`, a: "el", w: ["la", "los", "las"], x: `"Gato" is masculine singular → el gato.` },
  { p: `Which article goes with "casa" (house)?`, a: "la", w: ["el", "los", "un"] },
  { p: `What is the plural of "el perro"?`, a: "los perros", w: ["las perros", "el perros", "los perro"] },
  { p: `What is the plural of "la flor"?`, a: "las flores", w: ["los flores", "la flores", "las flors"] },
  { p: `"Una manzana" means…`, a: "an apple", w: ["the apple", "some apples", "my apple"] },
  { p: `Which is correct?`, a: "las hermanas", w: ["los hermanas", "la hermanas", "el hermanas"] },
  { p: `Which article goes with "libros" (books)?`, a: "los", w: ["las", "la", "el"] },
  { p: `"El agua está fría" — what does "fría" mean?`, a: "cold", w: ["fresh", "clean", "deep"] },
];

const QUESTION_WORDS: [string, string][] = [
  ["¿Qué?", "What?"],
  ["¿Quién?", "Who?"],
  ["¿Dónde?", "Where?"],
  ["¿Cuándo?", "When?"],
  ["¿Por qué?", "Why?"],
  ["¿Cómo?", "How?"],
  ["¿Cuántos?", "How many?"],
  ["¿Cuál?", "Which?"],
];

const SENTENCES: StaticQ[] = [
  { p: `"El perro grande come pollo." What is the dog doing?`, a: "eating chicken", w: ["running home", "sleeping", "playing with a cat"] },
  { p: `"Mi hermana canta y baila." What does my sister do?`, a: "sings and dances", w: ["reads and writes", "runs and jumps", "eats and sleeps"] },
  { p: `"Vamos a la escuela el lunes." Where are we going?`, a: "to school", w: ["to the park", "to grandma's", "to the store"] },
  { p: `"Me gusta nadar en verano." What do I like to do?`, a: "swim in summer", w: ["ski in winter", "read at night", "cook dinner"] },
  { p: `"La niña tiene un gato negro." What does the girl have?`, a: "a black cat", w: ["a white dog", "a red bird", "a big fish"] },
  { p: `"Mi mamá bebe café por la mañana." When does mom drink coffee?`, a: "in the morning", w: ["at night", "after dinner", "on Sundays"] },
  { p: `"Los pájaros cantan en el jardín." Who is singing?`, a: "the birds", w: ["the children", "the grandmas", "the cats"] },
  { p: `"Quiero helado, por favor." What do I want?`, a: "ice cream", w: ["water", "bread", "cheese"] },
];

/** Vocab sets by unit id — used to auto-build Lola's listen-first card lessons. */
export const SPANISH_VOCAB: Record<string, [string, string][]> = {
  greetings: GREETINGS,
  colors: COLORS,
  numbers1: NUMBERS1,
  animals: ANIMALS,
  family: FAMILY,
  food: FOOD,
  body: BODY,
  numbers2: NUMBERS2,
  clothes: CLOTHES,
  house: HOUSE,
  days: DAYS,
  verbs: VERBS,
  weather: WEATHER,
  feelings: FEELINGS,
  qwords: QUESTION_WORDS,
  verbs2: VERBS,
  mixreview: [...COLORS.slice(0, 4), ...FAMILY.slice(0, 4), ...FOOD.slice(0, 4), ...WEATHER.slice(0, 4)],
};

export const SPANISH_LEVELS: LevelDef[] = [
  {
    n: 1,
    name: "Hola Amigos",
    units: [
      vUnit("greetings", "Greetings", "👋", GREETINGS),
      vUnit("colors", "Colors · Los Colores", "🌈", COLORS),
      vUnit("numbers1", "Numbers 1–10", "🔟", NUMBERS1),
      vUnit("animals", "Animals · Los Animales", "🐶", ANIMALS),
    ],
  },
  {
    n: 2,
    name: "Mi Familia",
    units: [
      vUnit("family", "Family · La Familia", "👨‍👩‍👧‍👧", FAMILY),
      vUnit("food", "Food · La Comida", "🍎", FOOD),
      vUnit("body", "Body · El Cuerpo", "🙆", BODY),
      vUnit("numbers2", "Big Numbers", "💯", NUMBERS2),
    ],
  },
  {
    n: 3,
    name: "Mi Mundo",
    units: [
      vUnit("clothes", "Clothes · La Ropa", "👗", CLOTHES),
      vUnit("house", "House & School", "🏠", HOUSE),
      vUnit("days", "Days of the Week", "📅", DAYS),
      vUnit("verbs", "Action Words", "🏃", VERBS),
    ],
  },
  {
    n: 4,
    name: "Conversaciones",
    units: [
      bUnit("phrases", "Conversations", "💬", PHRASES),
      vUnit("weather", "Weather · El Tiempo", "☀️", WEATHER),
      vUnit("feelings", "Feelings", "😊", FEELINGS),
      vUnit("qwords", "Question Words", "❓", QUESTION_WORDS),
    ],
  },
  {
    n: 5,
    name: "Pequeñas Frases",
    units: [
      bUnit("serestar", "Ser · Estar · Tener", "🧠", SER_ESTAR),
      bUnit("articles", "El, La, Los, Las", "🔤", ARTICLES),
      vUnit("verbs2", "More Action Words", "🤸", VERBS),
      bUnit("sentences", "Reading Sentences", "📖", SENTENCES),
    ],
  },
  {
    n: 6,
    name: "Lectora Valiente",
    units: [
      bUnit("sentences2", "Story Sentences", "📚", SENTENCES),
      bUnit("serestar2", "Verb Master", "🏆", SER_ESTAR),
      vUnit("mixreview", "Mega Vocabulary Mix", "🎒", [
        ...COLORS.slice(0, 4),
        ...FAMILY.slice(0, 4),
        ...FOOD.slice(0, 4),
        ...WEATHER.slice(0, 4),
      ]),
      bUnit("phrases2", "Real Conversations", "🗣️", PHRASES),
    ],
  },
];
