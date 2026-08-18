import type { IStep } from "./mathInteractive";

/**
 * Lola the Parrot's dramatic Spanish rehearsals. Listen → repeat → use it.
 * Card `say` values use es-ES so the Spanish is actually pronounced.
 */
const es = (front: string, back: string, say: string) => ({ front, back, say, lang: "es-ES" });

export const SPANISH_INTERACTIVE: Record<string, IStep[]> = {
  // L1
  greetings: [
    { kind: "say", text: "¡Hola mi amor! I am Lola, and today we learn to GREET people. In Spanish, greetings come with feeling — you don't mumble, you announce! Listen to me, then say it TWICE. Always twice." },
    { kind: "cards", text: "Tap each card to hear me say it — then repeat!", cards: [
      es("¡Hola!", "Hello!", "¡Hola! ¡Hola!"),
      es("Adiós", "Goodbye", "Adiós. Adiós."),
      es("Por favor", "Please", "Por favor. Por favor."),
      es("Gracias", "Thank you", "Gracias. Gracias."),
      es("Buenos días", "Good morning", "Buenos días. Buenos días."),
      es("Me llamo…", "My name is…", "Me llamo. Me llamo."),
    ] },
    { kind: "pick", text: "Someone says '¡Hola!' — what did they say?", tiles: ["Hello!", "Goodbye!", "Thank you!"], correct: 0, hint: "¡Hola! is hello, mi amor. The very first word of every friendship!" },
    { kind: "pick", text: "How do you say 'thank you' in Spanish?", tiles: ["Gracias", "Adiós", "Hola"], correct: 0, hint: "¡Gracias! Say it with a little bow. Manners are DRAMA." },
  ],
  colors: [
    { kind: "say", text: "¡Los colores! Colors, mi estrella. In Spanish they sound like a song — rojo, azul, verde. Listen and repeat with FEELING. Never say a color flatly. It's disrespectful to the color." },
    { kind: "cards", text: "Tap to hear each color!", cards: [
      es("rojo 🔴", "red", "Rojo. Rojo."),
      es("azul 🔵", "blue", "Azul. Azul."),
      es("verde 🟢", "green", "Verde. Verde."),
      es("amarillo 🟡", "yellow", "Amarillo. Amarillo."),
      es("morado 🟣", "purple", "Morado. Morado."),
      es("rosado 🩷", "pink", "Rosado. Rosado."),
    ] },
    { kind: "pick", text: "What color is 'rojo'?", visual: "🔴", tiles: ["red", "blue", "green"], correct: 0, hint: "¡Rojo es red! Like a rose, like my dramatic lipstick." },
    { kind: "pick", text: "How do you say 'blue'?", visual: "🔵", tiles: ["azul", "verde", "rosado"], correct: 0, hint: "¡Azul! Like the sky, like the sea, like my mood on Mondays." },
  ],
  numbers1: [
    { kind: "say", text: "¡Vamos a contar! Let's count, mi amor. Uno, dos, tres… Spanish numbers have RHYTHM. Count on your fingers with me — and yes, say each one twice!" },
    { kind: "cards", text: "Tap each number to hear it!", cards: [
      es("uno", "1 ☝️", "Uno. Uno."),
      es("dos", "2 ✌️", "Dos. Dos."),
      es("tres", "3", "Tres. Tres."),
      es("cuatro", "4", "Cuatro. Cuatro."),
      es("cinco", "5 🖐️", "Cinco. Cinco."),
      es("diez", "10 🙌", "Diez. Diez."),
    ] },
    { kind: "pick", text: "How many is 'tres'?", tiles: ["3", "2", "5"], correct: 0, hint: "¡Tres! Three. Hold up three fingers and announce it, mi amor!" },
    { kind: "pick", text: "What comes after 'cuatro'?", tiles: ["cinco", "dos", "diez"], correct: 0, hint: "Uno, dos, tres, cuatro, CINCO! A whole hand!" },
  ],
  animals: [
    { kind: "say", text: "¡Los animales! Now, an important note: in Spanish, animals get a little word in front — EL or LA. El perro. La vaca. You must never leave an animal without its little word. It's rude." },
    { kind: "cards", text: "Tap each animal!", cards: [
      es("el perro 🐶", "the dog", "El perro. El perro."),
      es("el gato 🐱", "the cat", "El gato. El gato."),
      es("el pájaro 🐦", "the bird", "El pájaro. El pájaro."),
      es("la vaca 🐄", "the cow", "La vaca. La vaca."),
      es("el caballo 🐴", "the horse", "El caballo. El caballo."),
      es("el conejo 🐰", "the rabbit", "El conejo. El conejo."),
    ] },
    { kind: "pick", text: "What is 'el gato'?", visual: "🐱", tiles: ["the cat", "the dog", "the cow"], correct: 0, hint: "¡El gato! The cat. My natural enemy. Long story. Beautiful animal though." },
    { kind: "pick", text: "How do you say 'the dog'?", visual: "🐶", tiles: ["el perro", "el pájaro", "la vaca"], correct: 0, hint: "¡El perro! Say it twice while patting an imaginary dog." },
  ],
  // L2
  family: [
    { kind: "say", text: "¡La familia! The most important word in Spanish, mi amor. Family is everything — in every telenovela, in every kitchen, in every song. Learn these with your whole heart." },
    { kind: "cards", text: "Tap each family member!", cards: [
      es("la mamá", "mom 👩", "La mamá. La mamá."),
      es("el papá", "dad 👨", "El papá. El papá."),
      es("la hermana", "sister 👧", "La hermana. La hermana."),
      es("el hermano", "brother 👦", "El hermano. El hermano."),
      es("la abuela", "grandma 👵", "La abuela. La abuela."),
      es("la familia", "family 👨‍👩‍👧‍👧", "La familia. La familia."),
    ] },
    { kind: "pick", text: "What is 'la hermana'?", tiles: ["sister", "brother", "grandma"], correct: 0, hint: "¡La hermana! Sister. You have one — go tell her 'hola hermana' right now!" },
    { kind: "pick", text: "How do you say 'grandma'?", tiles: ["la abuela", "la mamá", "el abuelo"], correct: 0, hint: "¡La abuela! The queen of every Spanish family. Treat her accordingly." },
  ],
  food: [
    { kind: "say", text: "¡La comida! Food, mi amor — my favorite subject after drama. Spanish food words are delicious to SAY, not only to eat. Roll them around your mouth like a snack." },
    { kind: "cards", text: "Tap each food!", cards: [
      es("la manzana 🍎", "apple", "La manzana. La manzana."),
      es("el pan 🍞", "bread", "El pan. El pan."),
      es("la leche 🥛", "milk", "La leche. La leche."),
      es("el queso 🧀", "cheese", "El queso. El queso."),
      es("el agua 💧", "water", "El agua. El agua."),
      es("el helado 🍦", "ice cream", "El helado. El helado."),
    ] },
    { kind: "pick", text: "What is 'el helado'?", visual: "🍦", tiles: ["ice cream", "bread", "cheese"], correct: 0, hint: "¡El helado! Ice cream. The most important vocabulary word ever taught." },
    { kind: "pick", text: "How do you say 'apple'?", visual: "🍎", tiles: ["la manzana", "el pan", "la leche"], correct: 0, hint: "¡La manzana! Say it twice and take a dramatic bite." },
  ],
  body: [
    { kind: "say", text: "¡El cuerpo! Your body, mi estrella. Point to each part as I say it — that's how it sticks. Touch your cabeza! Your nariz! ¡Muy bien!" },
    { kind: "cards", text: "Tap and point to each part!", cards: [
      es("la cabeza", "head 🙂", "La cabeza. La cabeza."),
      es("los ojos", "eyes 👀", "Los ojos. Los ojos."),
      es("la nariz", "nose 👃", "La nariz. La nariz."),
      es("la boca", "mouth 👄", "La boca. La boca."),
      es("las manos", "hands 🙌", "Las manos. Las manos."),
      es("los pies", "feet 🦶", "Los pies. Los pies."),
    ] },
    { kind: "pick", text: "Point to your 'nariz'! What is it?", tiles: ["nose", "eyes", "hands"], correct: 0, hint: "¡La nariz! Your nose. Mine is a beak, and it is FABULOUS." },
    { kind: "pick", text: "How do you say 'hands'?", visual: "🙌", tiles: ["las manos", "los pies", "los ojos"], correct: 0, hint: "¡Las manos! Wave them dramatically while you say it." },
  ],
  numbers2: [
    { kind: "say", text: "¡Números grandes! Bigger numbers. Once, doce, trece — hear the 'ce' ending? They're a little family. And veinte, treinta, cien… now you can count your Spark Bucks in Spanish!" },
    { kind: "cards", text: "Tap each big number!", cards: [
      es("once", "11", "Once. Once."),
      es("doce", "12", "Doce. Doce."),
      es("quince", "15", "Quince. Quince."),
      es("veinte", "20", "Veinte. Veinte."),
      es("cincuenta", "50", "Cincuenta. Cincuenta."),
      es("cien", "100", "Cien. Cien."),
    ] },
    { kind: "pick", text: "How much is 'cien'?", tiles: ["100", "10", "50"], correct: 0, hint: "¡Cien! One hundred. Say it like you just won something." },
    { kind: "pick", text: "How do you say '20'?", tiles: ["veinte", "doce", "quince"], correct: 0, hint: "¡Veinte! Twenty. Not to be confused with veintiuno, twenty-one!" },
  ],
  // L3
  clothes: [
    { kind: "say", text: "¡La ropa! Clothes, mi amor. Fashion is a LANGUAGE and now you speak two of them. Look down at what you're wearing and name it in Spanish!" },
    { kind: "cards", text: "Tap each clothing item!", cards: [
      es("la camisa 👕", "shirt", "La camisa. La camisa."),
      es("los pantalones 👖", "pants", "Los pantalones. Los pantalones."),
      es("los zapatos 👟", "shoes", "Los zapatos. Los zapatos."),
      es("el vestido 👗", "dress", "El vestido. El vestido."),
      es("el sombrero 👒", "hat", "El sombrero. El sombrero."),
      es("la chaqueta 🧥", "jacket", "La chaqueta. La chaqueta."),
    ] },
    { kind: "pick", text: "What is 'el vestido'?", visual: "👗", tiles: ["dress", "shirt", "shoes"], correct: 0, hint: "¡El vestido! A dress. Twirl when you say it. I insist." },
    { kind: "pick", text: "In Minnesota winter you NEED 'la chaqueta'. What is it?", tiles: ["jacket", "hat", "shoes"], correct: 0, hint: "¡La chaqueta! A jacket. In Minnesota, a survival item." },
  ],
  house: [
    { kind: "say", text: "¡La casa! Your house, mi estrella. Walk around your home and name each room out loud in Spanish. Your family will think you're brilliant. They'd be correct." },
    { kind: "cards", text: "Tap each part of the house!", cards: [
      es("la casa 🏠", "house", "La casa. La casa."),
      es("la puerta 🚪", "door", "La puerta. La puerta."),
      es("la ventana 🪟", "window", "La ventana. La ventana."),
      es("la mesa", "table", "La mesa. La mesa."),
      es("la cama 🛏️", "bed", "La cama. La cama."),
      es("la cocina", "kitchen", "La cocina. La cocina."),
    ] },
    { kind: "pick", text: "What is 'la cocina'?", tiles: ["kitchen", "bedroom", "door"], correct: 0, hint: "¡La cocina! The kitchen — where la familia gathers and the drama unfolds." },
    { kind: "pick", text: "How do you say 'bed'?", visual: "🛏️", tiles: ["la cama", "la mesa", "la puerta"], correct: 0, hint: "¡La cama! Say it sleepily. Very sleepily. Yawn optional but encouraged." },
  ],
  days: [
    { kind: "say", text: "¡Los días de la semana! Days of the week. And here's something charming: in Spanish they are NOT capitalized. Lunes, martes, miércoles — humble little words." },
    { kind: "cards", text: "Tap each day!", cards: [
      es("lunes", "Monday", "Lunes. Lunes."),
      es("martes", "Tuesday", "Martes. Martes."),
      es("miércoles", "Wednesday", "Miércoles. Miércoles."),
      es("viernes", "Friday", "Viernes. Viernes."),
      es("sábado", "Saturday", "Sábado. Sábado."),
      es("domingo", "Sunday", "Domingo. Domingo."),
    ] },
    { kind: "pick", text: "What day is 'sábado'?", tiles: ["Saturday", "Sunday", "Monday"], correct: 0, hint: "¡Sábado! Saturday. The best día of them all!" },
    { kind: "pick", text: "How do you say 'Monday'?", tiles: ["lunes", "martes", "viernes"], correct: 0, hint: "¡Lunes! Monday. Say it with a sigh. Even in Spanish, it's Monday." },
  ],
  verbs: [
    { kind: "say", text: "¡Verbos! Action words, mi amor. These are the words that DO things. And look — they all end in -ar, -er, or -ir. That's how you spot a Spanish verb in the wild!" },
    { kind: "cards", text: "Tap each action — and DO it!", cards: [
      es("correr 🏃", "to run", "Correr. Correr."),
      es("saltar", "to jump", "Saltar. Saltar."),
      es("comer 🍽️", "to eat", "Comer. Comer."),
      es("bailar 💃", "to dance", "Bailar. Bailar."),
      es("cantar 🎤", "to sing", "Cantar. Cantar."),
      es("leer 📖", "to read", "Leer. Leer."),
    ] },
    { kind: "pick", text: "What does 'bailar' mean?", tiles: ["to dance", "to run", "to read"], correct: 0, hint: "¡Bailar! To dance. Stand up and do it. RIGHT NOW. I'm serious, mi amor." },
    { kind: "pick", text: "How do you say 'to eat'?", tiles: ["comer", "correr", "cantar"], correct: 0, hint: "¡Comer! Careful — comer is eat, correr is run. One letter, very different dinner." },
  ],
  // L4
  phrases: [
    { kind: "say", text: "¡Conversación! Real talking, mi estrella. These are the phrases that turn vocabulary into actual conversation. Practice them on your family at dinner tonight. Cause a scene!" },
    { kind: "cards", text: "Tap each phrase!", cards: [
      es("¿Cómo estás?", "How are you?", "¿Cómo estás? ¿Cómo estás?"),
      es("Estoy bien", "I am well", "Estoy bien. Estoy bien."),
      es("¿Cómo te llamas?", "What's your name?", "¿Cómo te llamas? ¿Cómo te llamas?"),
      es("Me llamo…", "My name is…", "Me llamo. Me llamo."),
      es("Tengo hambre", "I'm hungry", "Tengo hambre. Tengo hambre."),
      es("Me gusta…", "I like…", "Me gusta. Me gusta."),
    ] },
    { kind: "pick", text: "Someone asks '¿Cómo te llamas?' They want your…", tiles: ["name", "age", "favorite color"], correct: 0, hint: "Your name! Answer: 'Me llamo…' and then your name, with flair." },
    { kind: "pick", text: "You're starving. What do you say?", tiles: ["Tengo hambre", "Estoy bien", "Buenos días"], correct: 0, hint: "¡Tengo hambre! Literally 'I have hunger'. In Spanish you HAVE hunger. Poetic, no?" },
  ],
  weather: [
    { kind: "say", text: "¡El tiempo! The weather. Now, here is something delightful: in Spanish you don't say 'it is hot' — you say 'it MAKES heat'. Hace calor. The weather is an artist, making things!" },
    { kind: "cards", text: "Tap each weather phrase!", cards: [
      es("hace sol ☀️", "it's sunny", "Hace sol. Hace sol."),
      es("hace frío ❄️", "it's cold", "Hace frío. Hace frío."),
      es("hace calor 🥵", "it's hot", "Hace calor. Hace calor."),
      es("llueve 🌧️", "it's raining", "Llueve. Llueve."),
      es("nieva 🌨️", "it's snowing", "Nieva. Nieva."),
      es("el viento 💨", "the wind", "El viento. El viento."),
    ] },
    { kind: "pick", text: "Minnesota in January: which phrase do you need?", tiles: ["hace frío", "hace calor", "hace sol"], correct: 0, hint: "¡Hace frío! It's cold. In Minnesota you will use this one CONSTANTLY." },
    { kind: "pick", text: "What does 'llueve' mean?", visual: "🌧️", tiles: ["it's raining", "it's snowing", "it's windy"], correct: 0, hint: "¡Llueve! It's raining. Note the double L says a 'y' sound — YUEH-veh!" },
  ],
  feelings: [
    { kind: "say", text: "¡Los sentimientos! Feelings, mi amor — and this is where I SHINE. Every telenovela is built from these six words. Say each one with the face that matches. Commit!" },
    { kind: "cards", text: "Tap each feeling — and make the face!", cards: [
      es("feliz 😊", "happy", "Feliz. Feliz."),
      es("triste 😢", "sad", "Triste. Triste."),
      es("enojado 😠", "angry", "Enojado. Enojado."),
      es("cansado 😴", "tired", "Cansado. Cansado."),
      es("emocionada 🤩", "excited", "Emocionada. Emocionada."),
      es("orgullosa 🥹", "proud", "Orgullosa. Orgullosa."),
    ] },
    { kind: "pick", text: "You just mastered a skill. You feel…", tiles: ["orgullosa (proud)", "triste (sad)", "cansado (tired)"], correct: 0, hint: "¡Orgullosa! Proud. And you SHOULD be, mi estrella. *throws confetti*" },
    { kind: "pick", text: "What does 'feliz' mean?", visual: "😊", tiles: ["happy", "sad", "angry"], correct: 0, hint: "¡Feliz! Happy. As in ¡Feliz cumpleaños! — happy birthday!" },
  ],
  qwords: [
    { kind: "say", text: "¡Las preguntas! Question words — the keys to every conversation, mi amor. And notice: Spanish questions wear an upside-down question mark at the START. ¿Ves? Two marks. Very dramatic. I approve." },
    { kind: "cards", text: "Tap each question word!", cards: [
      es("¿Qué?", "What?", "¿Qué? ¿Qué?"),
      es("¿Quién?", "Who?", "¿Quién? ¿Quién?"),
      es("¿Dónde?", "Where?", "¿Dónde? ¿Dónde?"),
      es("¿Cuándo?", "When?", "¿Cuándo? ¿Cuándo?"),
      es("¿Por qué?", "Why?", "¿Por qué? ¿Por qué?"),
      es("¿Cuántos?", "How many?", "¿Cuántos? ¿Cuántos?"),
    ] },
    { kind: "pick", text: "'¿Dónde está el baño?' is asking…", tiles: ["Where is the bathroom?", "What time is it?", "Who are you?"], correct: 0, hint: "¿Dónde? means WHERE. The single most useful question while traveling!" },
    { kind: "pick", text: "How do you ask 'why?'", tiles: ["¿Por qué?", "¿Qué?", "¿Cuándo?"], correct: 0, hint: "¿Por qué? Why. Your favorite question at age three, now bilingual!" },
  ],
  // L5
  serestar: [
    { kind: "say", text: "¡Ay, the big lesson! Spanish has TWO ways to say 'am': SER for who you are forever, ESTAR for how you feel right now. Yo SOY Lola — forever. Yo ESTOY feliz — today. ¿Comprendes?" },
    { kind: "cards", text: "Tap each one — permanent vs. right now!", cards: [
      es("Yo soy…", "I am (forever) — soy Lola", "Yo soy. Yo soy Lola."),
      es("Yo estoy…", "I am (right now) — estoy feliz", "Yo estoy. Yo estoy feliz."),
      es("Tú eres…", "You are (forever)", "Tú eres. Tú eres."),
      es("Tú estás…", "You are (right now)", "Tú estás. Tú estás."),
      es("Yo tengo…", "I have — tengo 8 años!", "Yo tengo. Yo tengo ocho años."),
    ] },
    { kind: "pick", text: "'Yo ___ Hallie.' (your name — forever!)", tiles: ["soy", "estoy", "tengo"], correct: 0, hint: "¡Soy! Your name is permanent — that's SER. Yo soy Hallie." },
    { kind: "pick", text: "'Yo ___ feliz hoy.' (happy today — a feeling)", tiles: ["estoy", "soy", "eres"], correct: 0, hint: "¡Estoy! Feelings change, so use ESTAR. Estoy feliz!" },
    { kind: "pick", text: "To say your AGE in Spanish you use…", tiles: ["tengo (I have) 8 años", "soy 8", "estoy 8"], correct: 0, hint: "You HAVE years! Tengo ocho años. Beautiful language, mi amor." },
  ],
  articles: [
    { kind: "say", text: "El, la, los, las — the four little words for 'the'. In Spanish, every noun is masculine or feminine. Yes, tables have genders. No, I don't make the rules. I only enforce them dramatically." },
    { kind: "cards", text: "Tap each 'the'!", cards: [
      es("el", "the (one masculine) — el perro", "El. El perro."),
      es("la", "the (one feminine) — la casa", "La. La casa."),
      es("los", "the (many masculine) — los perros", "Los. Los perros."),
      es("las", "the (many feminine) — las casas", "Las. Las casas."),
    ] },
    { kind: "pick", text: "Which goes with 'casa' (house)?", tiles: ["la casa", "el casa", "los casa"], correct: 0, hint: "¡La casa! Words ending in -a are usually feminine. A helpful clue!" },
    { kind: "pick", text: "What's the plural of 'el perro'?", tiles: ["los perros", "las perros", "el perros"], correct: 0, hint: "¡Los perros! Both the article AND the noun get plural. Teamwork." },
  ],
  verbs2: [
    { kind: "say", text: "¡Más verbos! More action, mi estrella. And a secret: change the ending and the verb changes WHO does it. Yo bailo — I dance. Tú bailas — you dance. ¡Magia!" },
    { kind: "cards", text: "Tap each action!", cards: [
      es("bailar → yo bailo", "to dance → I dance", "Yo bailo. Yo bailo."),
      es("cantar → yo canto", "to sing → I sing", "Yo canto. Yo canto."),
      es("comer → yo como", "to eat → I eat", "Yo como. Yo como."),
      es("nadar 🏊", "to swim", "Nadar. Nadar."),
      es("dormir 😴", "to sleep", "Dormir. Dormir."),
      es("jugar 🎮", "to play", "Jugar. Jugar."),
    ] },
    { kind: "pick", text: "'Yo canto' means…", tiles: ["I sing", "you sing", "to sing"], correct: 0, hint: "¡Yo canto! The -o ending means I do it. Cantar becomes canto!" },
    { kind: "pick", text: "How do you say 'to sleep'?", tiles: ["dormir", "nadar", "jugar"], correct: 0, hint: "¡Dormir! Like 'dormitory' — a place for sleeping. English borrowed it!" },
  ],
  sentences: [
    { kind: "say", text: "¡Frases completas! Full sentences, mi amor. Now we put the pieces together. And notice — in Spanish the describing word comes AFTER: el perro GRANDE, the dog big. Backwards to you, perfect to us!" },
    { kind: "cards", text: "Tap each sentence to hear it!", cards: [
      es("El perro grande come.", "The big dog eats.", "El perro grande come."),
      es("Mi hermana canta y baila.", "My sister sings and dances.", "Mi hermana canta y baila."),
      es("Me gusta el helado.", "I like ice cream.", "Me gusta el helado."),
      es("Vamos a la escuela.", "We go to school.", "Vamos a la escuela."),
    ] },
    { kind: "pick", text: "'Mi hermana canta y baila.' What does she do?", tiles: ["sings and dances", "reads and writes", "eats and sleeps"], correct: 0, hint: "Canta = sings, baila = dances. ¡Tu hermana es una estrella!" },
    { kind: "pick", text: "In Spanish, 'the big dog' is…", tiles: ["el perro grande", "el grande perro", "grande el perro"], correct: 0, hint: "The describing word goes AFTER the noun. El perro grande!" },
  ],
  // L6
  sentences2: [
    { kind: "say", text: "¡Cuentos! Story sentences, mi estrella. You're reading real Spanish now. Read each one out loud — hearing your own voice speak Spanish is the moment it becomes YOURS." },
    { kind: "cards", text: "Tap each story sentence!", cards: [
      es("Los pájaros cantan en el jardín.", "The birds sing in the garden.", "Los pájaros cantan en el jardín."),
      es("Mi mamá bebe café por la mañana.", "My mom drinks coffee in the morning.", "Mi mamá bebe café por la mañana."),
      es("La niña tiene un gato negro.", "The girl has a black cat.", "La niña tiene un gato negro."),
      es("Me gusta nadar en verano.", "I like to swim in summer.", "Me gusta nadar en verano."),
    ] },
    { kind: "pick", text: "'La niña tiene un gato negro.' What does she have?", tiles: ["a black cat", "a white dog", "a red bird"], correct: 0, hint: "Un gato negro — a black cat. Negro is black, and it comes AFTER gato!" },
    { kind: "pick", text: "'Mi mamá bebe café por la mañana.' When?", tiles: ["in the morning", "at night", "on Sundays"], correct: 0, hint: "Por la mañana — in the morning. Every mamá everywhere, honestly." },
  ],
  serestar2: [
    { kind: "say", text: "¡Verb master, final round! Ser, estar, tener — the three pillars. Get these and you can say almost anything about yourself. This is the black belt of beginner Spanish, mi amor." },
    { kind: "pick", text: "'Ella ___ cansada.' (she feels tired right now)", tiles: ["está", "es", "tiene"], correct: 0, hint: "¡Está! A feeling right now — ESTAR. Ella está cansada." },
    { kind: "pick", text: "'Nosotros ___ una familia.' (we are — forever)", tiles: ["somos", "estamos", "tenemos"], correct: 0, hint: "¡Somos! Family is forever — SER. Nosotros somos una familia. 🥹" },
    { kind: "pick", text: "'El gato ___ en la casa.' (location)", tiles: ["está", "es", "tiene"], correct: 0, hint: "¡Está! Location uses ESTAR too — where something IS right now." },
  ],
  mixreview: [
    { kind: "say", text: "¡La gran revisión! The mega review, mi estrella. Colors, family, food, weather — everything you've learned, all at once. Show me what you've got. *dramatic hair flip*" },
    { kind: "cards", text: "Tap through your greatest hits!", cards: [
      es("rojo · azul · verde", "red · blue · green", "Rojo. Azul. Verde."),
      es("la mamá · el papá", "mom · dad", "La mamá. El papá."),
      es("la manzana · el pan", "apple · bread", "La manzana. El pan."),
      es("hace sol · hace frío", "sunny · cold", "Hace sol. Hace frío."),
      es("feliz · triste", "happy · sad", "Feliz. Triste."),
    ] },
    { kind: "pick", text: "Quick! What is 'la manzana'?", visual: "🍎", tiles: ["apple", "bread", "milk"], correct: 0, hint: "¡La manzana! You knew that one, mi amor. I saw you hesitate for drama." },
    { kind: "pick", text: "What does 'hace frío' mean?", tiles: ["it's cold", "it's hot", "it's sunny"], correct: 0, hint: "¡Hace frío! Cold — the official weather of Minnesota, ocho months a year." },
  ],
  phrases2: [
    { kind: "say", text: "¡La conversación final! Real conversations, mi amor. You can now greet, introduce yourself, say how you feel, and ask questions. That's not 'studying Spanish' — that's SPEAKING Spanish. ¡Bravo!" },
    { kind: "cards", text: "Tap through a whole conversation!", cards: [
      es("—¡Hola! ¿Cómo te llamas?", "Hi! What's your name?", "¡Hola! ¿Cómo te llamas?"),
      es("—Me llamo Hallie. ¿Y tú?", "My name is Hallie. And you?", "Me llamo Hallie. ¿Y tú?"),
      es("—Me llamo Lola. ¿Cómo estás?", "I'm Lola. How are you?", "Me llamo Lola. ¿Cómo estás?"),
      es("—¡Estoy muy feliz! ¡Gracias!", "I'm very happy! Thanks!", "¡Estoy muy feliz! ¡Gracias!"),
    ] },
    { kind: "pick", text: "Someone says '¿Y tú?' after introducing themselves. They mean…", tiles: ["And you?", "Goodbye!", "Where are you?"], correct: 0, hint: "¿Y tú? — And you? The politest little phrase in Spanish. Always ask back!" },
    { kind: "pick", text: "'Muy' in '¡Estoy muy feliz!' means…", tiles: ["very", "not", "sometimes"], correct: 0, hint: "¡Muy! Very. Add it to anything for instant drama. Muy, muy importante." },
  ],
};
