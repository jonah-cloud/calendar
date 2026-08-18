import type { IStep } from "./mathInteractive";

/** Meowzart's rehearsals — hear it, clap it, then perform it. */
export const MUSIC_INTERACTIVE: Record<string, IStep[]> = {
  // L1
  families: [
    { kind: "say", text: "Welcome to my conservatory, dahling. Every instrument belongs to a FAMILY, decided by HOW you make the sound: strings you pluck, brass you buzz, percussion you hit, woodwinds you blow." },
    { kind: "cards", text: "Tap each family to hear about it!", cards: [
      { front: "🎻 Strings", back: "violin, cello, guitar — pluck or bow!", say: "Strings! Violin, cello, guitar. You pluck them or draw a bow across." },
      { front: "🎺 Brass", back: "trumpet, tuba — buzz your lips!", say: "Brass! Trumpet and tuba. You buzz your lips into them. Try buzzing now!" },
      { front: "🥁 Percussion", back: "drums, xylophone — hit it!", say: "Percussion! Drums and xylophone. You hit them. Very satisfying." },
      { front: "🪈 Woodwinds", back: "flute, clarinet — blow air!", say: "Woodwinds! Flute and clarinet. You blow air through them." },
    ] },
    { kind: "pick", text: "You buzz your lips to play it. Which family?", tiles: ["🎺 brass", "🎻 strings", "🥁 percussion"], correct: 0, hint: "Buzzing lips means BRASS — trumpets, trombones, tubas!" },
    { kind: "pick", text: "The piano has 88 keys and hammers that HIT strings inside. It's technically…", tiles: ["percussion AND strings!", "brass", "woodwind"], correct: 0, hint: "The great debate! Hammers hit strings — so it's a bit of both. Musicians argue about this. Loudly." },
  ],
  loudsoft: [
    { kind: "say", text: "Dynamics, dahling — how LOUD or soft we play. Italian words, because Italians named everything in music. Forte means loud. Piano means soft. Yes, the instrument is named 'soft'. Confusing! Charming!" },
    { kind: "cards", text: "Tap each dynamic marking!", cards: [
      { front: "f — forte", back: "LOUD! 📣", say: "Forte! Loud and strong. Like a marching band!" },
      { front: "p — piano", back: "soft 🤫", say: "Piano! Soft and gentle. Like a lullaby." },
      { front: "crescendo", back: "getting louder →", say: "Crescendo! Getting louder and louder and louder!" },
      { front: "decrescendo", back: "getting softer ←", say: "Decrescendo! Getting softer and softer and softer…" },
    ] },
    { kind: "pick", text: "You're singing a lullaby to a sleeping baby. Play…", tiles: ["p (piano/soft)", "f (forte/loud)"], correct: 0, hint: "Soft! Wake that baby and the whole performance is ruined. I speak from experience." },
    { kind: "pick", text: "The music grows from a whisper to a roar. That's a…", tiles: ["crescendo", "decrescendo", "rest"], correct: 0, hint: "Crescendo — the most dramatic move in music. I use it constantly." },
  ],
  tempo: [
    { kind: "say", text: "Tempo is SPEED. Clap a steady beat with me — clap, clap, clap, clap. That's the pulse of the music, its heartbeat. Now speed it up! Now slow it down! You just changed tempo." },
    { kind: "cards", text: "Tap each tempo word!", cards: [
      { front: "Allegro", back: "fast & lively 🏃", say: "Allegro! Fast and lively. Racing music!" },
      { front: "Adagio", back: "slow & gentle 🐢", say: "Adagio! Slow and gentle. Floating music." },
      { front: "Moderato", back: "medium — walking speed", say: "Moderato! A medium walking speed. Just right." },
      { front: "Presto", back: "VERY fast! ⚡", say: "Presto! Very very fast. Hold on to your whiskers!" },
    ] },
    { kind: "pick", text: "A race-car chase scene needs which tempo?", tiles: ["allegro (fast)", "adagio (slow)"], correct: 0, hint: "Fast music for fast action — allegro or even presto!" },
    { kind: "pick", text: "The steady pulse you clap along to is called the…", tiles: ["beat", "melody", "title"], correct: 0, hint: "The beat! It's the heartbeat underneath everything." },
  ],
  notenames: [
    { kind: "say", text: "The music alphabet is delightfully short: A, B, C, D, E, F, G — then it starts over! No H. No Z. Seven letters, infinite songs. Efficient, no?" },
    { kind: "cards", text: "Tap through the music alphabet!", cards: [
      { front: "A B C", back: "the beginning!", say: "A, B, C. The music alphabet starts just like the regular one." },
      { front: "D E F G", back: "…and then?", say: "D, E, F, G. And then something surprising happens." },
      { front: "After G…", back: "back to A! 🔁", say: "After G, we go right back to A! It loops forever." },
    ] },
    { kind: "pick", text: "What comes after G in the music alphabet?", tiles: ["A (start over!)", "H", "Z"], correct: 0, hint: "Back to A! Music only uses seven letters, looping again and again." },
    { kind: "pick", text: "Which letter does NOT exist in music?", tiles: ["H", "F", "B"], correct: 0, hint: "No H! It stops at G. (Well… in Germany they DO use H. Don't tell anyone. Too confusing.)" },
  ],
  // L2
  rhythm: [
    { kind: "say", text: "Note values, dahling — how LONG each note lasts. Clap and count with me. A quarter note is one clap. A half note is a clap you hold for two. Ready? Clap-2-3-4!" },
    { kind: "cards", text: "Tap each note to learn its length!", cards: [
      { front: "♩ Quarter", back: "1 beat — clap!", say: "Quarter note. One beat. Clap! Just one." },
      { front: "Half note", back: "2 beats — clap, hold", say: "Half note. Two beats. Clap and hold — one, two!" },
      { front: "Whole note", back: "4 beats — cla-a-a-ap", say: "Whole note. Four whole beats. One, two, three, four!" },
      { front: "♪ Eighth", back: "half a beat — twice as fast!", say: "Eighth note. Half a beat. Two of them fit in one clap!" },
    ] },
    { kind: "pick", text: "How many beats does a whole note get?", tiles: ["4", "1", "2"], correct: 0, hint: "Four! It's the longest of the basic notes — hold it: one, two, three, four." },
    { kind: "pick", text: "How many EIGHTH notes fit inside one quarter note?", tiles: ["2", "4", "8"], correct: 0, hint: "Two! Eighth notes are twice as fast — say 'ta-ka' in one beat." },
  ],
  notemath: [
    { kind: "say", text: "Rhythm math! Notes are fractions in disguise. Add their beats and you build a measure. A quarter plus a half equals three beats. Music IS math, dahling. Don't tell Dash — he'll get competitive." },
    { kind: "pick", text: "♩ (1 beat) + half note (2 beats) = ?", tiles: ["3 beats", "2 beats", "4 beats"], correct: 0, hint: "One plus two is three! Count it: clap, hold-hold." },
    { kind: "pick", text: "Two half notes = ?", tiles: ["4 beats", "2 beats", "1 beat"], correct: 0, hint: "Two plus two — four beats, exactly one full measure in 4/4!" },
    { kind: "pick", text: "How many quarter notes fill a 4-beat measure?", tiles: ["4", "2", "8"], correct: 0, hint: "Four quarter notes at one beat each — clap, clap, clap, clap!" },
  ],
  tempo2: [
    { kind: "say", text: "Tempo mastery! Real musicians use a METRONOME — a clicking machine that keeps perfect time. I once knocked mine off the piano. On purpose. I'm an artist." },
    { kind: "pick", text: "What does a metronome do?", tiles: ["clicks a steady beat", "makes it louder", "plays melodies"], correct: 0, hint: "Steady clicks so you don't speed up or slow down. Very bossy. Very useful." },
    { kind: "pick", text: "Which tempo is FASTEST?", tiles: ["presto", "adagio", "moderato"], correct: 0, hint: "Presto is the speed demon of tempo words!" },
    { kind: "pick", text: "'Ritardando' means the music…", tiles: ["gradually slows down", "gets louder", "stops suddenly"], correct: 0, hint: "Slowing down gracefully — perfect for endings!" },
  ],
  families2: [
    { kind: "say", text: "Instrument expert round! An ORCHESTRA seats all four families together — strings in front, percussion in back, and a conductor waving a stick at everyone. I've done that job. Powerful stuff." },
    { kind: "pick", text: "Which instrument is the LOWEST-sounding string?", tiles: ["double bass", "violin", "guitar"], correct: 0, hint: "The double bass — it's taller than most people and rumbles!" },
    { kind: "pick", text: "The person who leads the orchestra with a baton is the…", tiles: ["conductor", "composer", "soloist"], correct: 0, hint: "Conductor! The composer WRITES it, the conductor LEADS it." },
    { kind: "pick", text: "Which instrument sounds HIGHEST?", tiles: ["🪈 flute", "🎺 tuba", "double bass"], correct: 0, hint: "The flute sings way up high like a bird — tubas rumble down low." },
  ],
  // L3
  treble: [
    { kind: "say", text: "The STAFF! Five lines, four spaces, and every note has its own parking spot. Higher on the staff means higher in pitch. Simple, elegant, and it took humans centuries to invent." },
    { kind: "cards", text: "Tap each part of the staff!", cards: [
      { front: "The staff", back: "5 lines + 4 spaces", say: "The staff! Five lines and four spaces where notes live." },
      { front: "𝄞 Treble clef", back: "the swirly symbol at the start", say: "The treble clef! That fancy swirl tells you which notes are which." },
      { front: "Lines: E G B D F", back: "Every Good Bird Does Fly", say: "The lines, bottom to top: E, G, B, D, F. Every Good Bird Does Fly!" },
      { front: "Spaces: F A C E", back: "they spell FACE!", say: "The spaces spell F-A-C-E. Face! The easiest one to remember." },
    ] },
    { kind: "pick", text: "The four SPACES of the treble staff spell…", tiles: ["FACE", "EGBDF", "CAGE"], correct: 0, hint: "F-A-C-E — face! Bottom space to top space." },
    { kind: "pick", text: "A note sitting HIGHER on the staff sounds…", tiles: ["higher in pitch", "louder", "faster"], correct: 0, hint: "Higher on the page means higher in pitch. The staff is a pitch map!" },
  ],
  rhythm2: [
    { kind: "say", text: "Rhythm champions! Measures are boxes that hold a set number of beats, divided by bar lines. In 4/4 time, every box holds exactly four. Fill it perfectly or the music falls over." },
    { kind: "pick", text: "In 4/4 time, how many beats per measure?", tiles: ["4", "3", "8"], correct: 0, hint: "Four! The top number of the time signature tells you." },
    { kind: "pick", text: "A waltz is in 3/4 time. Count it with me:", tiles: ["ONE-two-three, ONE-two-three", "ONE-two, ONE-two", "one-two-three-four"], correct: 0, hint: "Three beats per measure — that's the waltz swing!" },
    { kind: "pick", text: "A REST in music means…", tiles: ["silence — don't play!", "play louder", "repeat it"], correct: 0, hint: "Silence is part of music! The pauses matter as much as the notes." },
  ],
  notemath2: [
    { kind: "say", text: "Harder rhythm math! Now we add DOTS. A dot after a note adds HALF its value. A dotted half note is two beats plus one — three beats. Sneaky little dots." },
    { kind: "pick", text: "A dotted half note (2 + half of 2) = ?", tiles: ["3 beats", "2 beats", "4 beats"], correct: 0, hint: "Two plus one equals three! The dot adds half the note's value." },
    { kind: "pick", text: "Half note (2) + two quarter notes (1 each) = ?", tiles: ["4 beats", "3 beats", "5 beats"], correct: 0, hint: "Two plus one plus one — a full 4/4 measure!" },
    { kind: "pick", text: "Four eighth notes = how many beats?", tiles: ["2", "4", "1"], correct: 0, hint: "Each is half a beat, so four halves make two whole beats!" },
  ],
  notenames2: [
    { kind: "say", text: "Note-name ninja training! Reading music is just knowing which spot means which letter. Practice enough and you'll read it as fast as words. I read it faster than words. I'm a cat; words are hard." },
    { kind: "pick", text: "Bottom line to top, the LINE notes are…", tiles: ["E G B D F", "F A C E", "A B C D E"], correct: 0, hint: "Every Good Bird Does Fly — E, G, B, D, F!" },
    { kind: "pick", text: "Note on the bottom line of the treble staff?", tiles: ["E", "F", "G"], correct: 0, hint: "E — the first letter of Every Good Bird Does Fly!" },
    { kind: "pick", text: "Middle C sits…", tiles: ["on a little line below the staff", "on the top line", "in the middle space"], correct: 0, hint: "It gets its own tiny ledger line below the staff — that's how you spot it!" },
  ],
  // L4
  solfege: [
    { kind: "say", text: "Solfège! Do, Re, Mi — the singing syllables. Sing them UP with me and feel your voice climb the ladder: Do… Re… Mi… Fa… Sol… La… Ti… Do! You just sang a major scale, dahling." },
    { kind: "cards", text: "Tap each step of the ladder!", cards: [
      { front: "Do Re Mi", back: "the first three steps up", say: "Do, Re, Mi! Sing them with me — each one is higher!" },
      { front: "Fa Sol La", back: "climbing higher…", say: "Fa, Sol, La! Keep climbing the ladder." },
      { front: "Ti Do", back: "and home again! 🏠", say: "Ti… Do! Home again, but higher than where we started." },
    ] },
    { kind: "pick", text: "Which comes after Mi?", tiles: ["Fa", "Re", "Sol"], correct: 0, hint: "Do, Re, Mi, FA — sing it and you'll hear it!" },
    { kind: "pick", text: "How many notes from Do up to the next Do?", tiles: ["8", "5", "7"], correct: 0, hint: "Eight! That's why it's called an OCTAVE — 'octo' means eight." },
  ],
  intervals: [
    { kind: "say", text: "Steps and skips! Moving to the very next note is a STEP. Hopping over one is a SKIP. Melodies are just clever mixes of steps, skips, and leaps. Mary Had a Little Lamb? Mostly steps." },
    { kind: "cards", text: "Tap each kind of move!", cards: [
      { front: "Step", back: "C → D (right next door)", say: "A step! Moving to the very next note. Do to Re." },
      { front: "Skip", back: "C → E (hop over one)", say: "A skip! Hopping over a note. Do to Mi." },
      { front: "Octave", back: "C → C (same note, 8 higher!)", say: "An octave! The same note name, eight steps higher. Magical." },
    ] },
    { kind: "pick", text: "Moving from Do to Re is a…", tiles: ["step", "skip", "leap"], correct: 0, hint: "Right next door — that's a step!" },
    { kind: "pick", text: "The TUNE you can hum from a song is called the…", tiles: ["melody", "rhythm", "dynamics"], correct: 0, hint: "The melody! It's the part everyone sings in the car." },
  ],
  treble2: [
    { kind: "say", text: "Staff reading, part two! Now we add the BASS clef — the low-note staff. Its lines spell 'Good Boys Do Fine Always'. Together, treble and bass cover every note a piano can play." },
    { kind: "pick", text: "The bass clef is for…", tiles: ["low notes", "high notes", "loud notes"], correct: 0, hint: "Low notes! Left hand on piano, tubas and cellos in the orchestra." },
    { kind: "pick", text: "Treble and bass clefs joined together make the…", tiles: ["grand staff", "big staff", "double clef"], correct: 0, hint: "The grand staff! That's what piano music is written on." },
    { kind: "pick", text: "Bar lines divide the staff into…", tiles: ["measures", "songs", "verses"], correct: 0, hint: "Measures — the little boxes that each hold the same number of beats." },
  ],
  loudsoft2: [
    { kind: "say", text: "Dynamics mastery, dahling! Between soft and loud lie many shades: pp, p, mp, mf, f, ff. A great performance uses ALL of them. Playing everything at one volume is… well, it's what beginners do." },
    { kind: "pick", text: "Which is the SOFTEST?", tiles: ["pp (pianissimo)", "mf (mezzo forte)", "ff (fortissimo)"], correct: 0, hint: "Double p — pianissimo, very very soft. A whisper!" },
    { kind: "pick", text: "'mf' (mezzo forte) means…", tiles: ["medium loud", "very soft", "extremely loud"], correct: 0, hint: "Mezzo means medium — moderately loud, the comfortable middle!" },
    { kind: "pick", text: "Why do composers write dynamics at all?", tiles: ["to give music feeling and drama", "to fill space", "to confuse students"], correct: 0, hint: "Dynamics are the emotion! Same notes, different volume, completely different feeling." },
  ],
  // L5
  sharps: [
    { kind: "say", text: "Sharps and flats — the black keys! A sharp raises a note a tiny bit. A flat lowers it. On a piano, the black keys sit between the white ones, doing exactly this job." },
    { kind: "cards", text: "Tap each accidental!", cards: [
      { front: "♯ Sharp", back: "raises the note a half step ⬆️", say: "Sharp! It raises the note just a tiny bit higher." },
      { front: "♭ Flat", back: "lowers the note a half step ⬇️", say: "Flat! It lowers the note just a tiny bit." },
      { front: "♮ Natural", back: "cancels it — plain note!", say: "Natural! It cancels a sharp or flat. Back to the plain white key." },
    ] },
    { kind: "pick", text: "On a piano, sharps and flats are usually the…", tiles: ["black keys", "white keys", "pedals"], correct: 0, hint: "The black keys! They sit between white keys, a half step away." },
    { kind: "pick", text: "The C major scale has how many sharps or flats?", tiles: ["none — all white keys!", "3", "7"], correct: 0, hint: "Zero! That's why beginners start with C major — pure white keys." },
  ],
  solfege2: [
    { kind: "say", text: "Solfège part two! Here's the secret: solfège is MOVABLE. Do can be any note you like — the pattern of steps between them is what makes a major scale sound major." },
    { kind: "pick", text: "Sing Do-Re-Mi-Fa-Sol-La-Ti-Do. What did you just sing?", tiles: ["a major scale", "a chord", "a rest"], correct: 0, hint: "A major scale — eight notes, the happiest-sounding ladder in music!" },
    { kind: "pick", text: "In 'Do-Re-Mi', which syllable is 'a needle pulling thread'?", tiles: ["La… no wait, Sew (Sol)!", "Mi", "Ti"], correct: 0, hint: "'Sew, a needle pulling thread' — Sol! Julie Andrews taught the world solfège." },
    { kind: "pick", text: "Which sounds happier?", tiles: ["a major scale", "a minor scale"], correct: 0, hint: "Major sounds bright and happy; minor sounds sad or mysterious!" },
  ],
  intervals2: [
    { kind: "say", text: "Melody and harmony! Melody is the tune — one note at a time. Harmony is notes stacked TOGETHER, making the tune richer. Sing 'Happy Birthday' alone: melody. Add someone singing a different note: harmony!" },
    { kind: "pick", text: "Two people singing DIFFERENT notes that sound good together is…", tiles: ["harmony", "melody", "rhythm"], correct: 0, hint: "Harmony! Notes stacked up, blending together." },
    { kind: "pick", text: "A short pattern that repeats over and over is called an…", tiles: ["ostinato", "octave", "opera"], correct: 0, hint: "Ostinato — a musical loop! Modern producers do this constantly." },
    { kind: "pick", text: "In a round like 'Row, Row, Row Your Boat', singers…", tiles: ["start at different times", "sing different songs", "must whisper"], correct: 0, hint: "Same melody, staggered starts — it creates instant harmony!" },
  ],
  notemath3: [
    { kind: "say", text: "Advanced rhythm math! Time signatures, dots, and ties — the full toolkit. Musicians count fractions all day long and pretend it isn't math. It's absolutely math." },
    { kind: "pick", text: "A TIE connects two notes. What does it mean?", tiles: ["hold as one long note", "play twice as fast", "skip the second"], correct: 0, hint: "Add their beats and hold straight through — one long sound!" },
    { kind: "pick", text: "Dotted quarter (1.5) + eighth (0.5) = ?", tiles: ["2 beats", "1 beat", "3 beats"], correct: 0, hint: "One and a half plus a half equals two! Extremely common rhythm." },
    { kind: "pick", text: "The TOP number of a time signature tells you…", tiles: ["beats per measure", "how fast to play", "how loud"], correct: 0, hint: "Beats per measure! The bottom number says which note gets one beat." },
  ],
  // L6
  chords: [
    { kind: "say", text: "CHORDS, dahling — three or more notes stacked and played together. This is where music gets its emotional power. Major chords smile. Minor chords brood. I compose exclusively in dramatic minor." },
    { kind: "cards", text: "Tap each chord fact!", cards: [
      { front: "What's a chord?", back: "3+ notes played together", say: "A chord! Three or more notes sounded at the same time." },
      { front: "C major", back: "C + E + G — happy!", say: "The C major chord: C, E, and G. Bright and happy!" },
      { front: "Minor chords", back: "sad, mysterious, dramatic 🎭", say: "Minor chords sound sad or mysterious. My specialty." },
      { front: "Skipping pattern", back: "chords skip: C-E-G (every other note)", say: "Chords are built by skipping — C, skip D, E, skip F, G!" },
    ] },
    { kind: "pick", text: "The C major chord is C, E, and…", tiles: ["G", "D", "F"], correct: 0, hint: "C-E-G! Skip a letter each time — that's how chords stack." },
    { kind: "pick", text: "A spooky Halloween song probably uses…", tiles: ["minor chords", "major chords"], correct: 0, hint: "Minor! Dark, mysterious, deliciously dramatic." },
  ],
  sharps2: [
    { kind: "say", text: "Key signatures! Instead of writing a sharp on every single note, composers put them once at the start. It tells you: for this whole piece, these notes are sharp. Efficiency! Elegance!" },
    { kind: "pick", text: "A key signature appears…", tiles: ["at the start of each line", "at the very end", "under the notes"], correct: 0, hint: "Right after the clef at the beginning of every line!" },
    { kind: "pick", text: "The key of G major has one sharp. Which note?", tiles: ["F♯", "C♯", "B♭"], correct: 0, hint: "F sharp! Every F in the piece gets raised." },
    { kind: "pick", text: "Why use key signatures instead of writing every sharp?", tiles: ["it keeps the page clean and readable", "it looks fancier", "tradition only"], correct: 0, hint: "Imagine writing a sharp on all 200 F's in a song. No thank you!" },
  ],
  treble3: [
    { kind: "say", text: "Staff mastery, my finest student! You can now read pitch, rhythm, dynamics, and keys. That's… everything, actually. You can read music. Let that sink in. *dabs eye with paw*" },
    { kind: "pick", text: "Reading music, which do you check FIRST?", tiles: ["the clef and key signature", "the last note", "the page number"], correct: 0, hint: "Clef tells you which notes, key signature tells you which are sharp or flat!" },
    { kind: "pick", text: "Two dots before a double bar line mean…", tiles: ["repeat that section", "stop playing", "play softly"], correct: 0, hint: "A repeat sign! Go back and play it again." },
    { kind: "pick", text: "A fermata (𝄐) over a note means…", tiles: ["hold it longer than written", "play it staccato", "skip it"], correct: 0, hint: "Hold it as long as feels right — the conductor decides. Delicious power." },
  ],
  chords2: [
    { kind: "say", text: "The composer's chair, dahling! Composers combine melody, harmony, rhythm, and dynamics into something entirely new. Mozart started at FIVE. You have time. Barely. I'm kidding. Mostly." },
    { kind: "pick", text: "A person who WRITES music is a…", tiles: ["composer", "conductor", "critic"], correct: 0, hint: "Composer! They create it; conductors lead performances of it." },
    { kind: "pick", text: "Beethoven famously kept composing after he…", tiles: ["went deaf", "moved to Egypt", "retired"], correct: 0, hint: "He lost his hearing and wrote some of history's greatest music anyway. Astonishing." },
    { kind: "pick", text: "To write your own song, start by…", tiles: ["humming a melody you like", "buying a tuxedo", "learning every rule first"], correct: 0, hint: "Hum first, write later! Every great song started as someone humming." },
  ],
};
