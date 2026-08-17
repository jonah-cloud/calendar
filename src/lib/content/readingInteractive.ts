import type { IStep } from "./mathInteractive";

/**
 * Olive the Owl's interactive reading lessons — explore stage for every
 * reading skill, starting from letter recognition for brand-new readers.
 */
export const READING_INTERACTIVE: Record<string, IStep[]> = {
  // ---------- L1 ----------
  letters: [
    { kind: "say", text: "Whooo! Welcome to the library, little detective! Every word in every book is built from just 26 letters. Learn their faces and the whole world opens up. Tap each card to hear its name!" },
    {
      kind: "cards",
      text: "Tap a card to hear the letter, flip it to meet its word!",
      cards: [
        { front: "A a", back: "🍎 apple", say: "A! A is for apple." },
        { front: "B b", back: "⚽ ball", say: "B! B is for ball." },
        { front: "M m", back: "🌙 moon", say: "M! M is for moon." },
        { front: "S s", back: "☀️ sun", say: "S! S is for sun." },
      ],
    },
    { kind: "pick", text: "Now find them in the wild! Tap the letter B — it's for ball!", tiles: ["D", "B", "P"], correct: 1, hint: "B has a straight back and TWO round bumps, like a butterfly's wings folded!" },
    { kind: "pick", text: "Tricky one — tap the letter M, for moon!", tiles: ["M", "W", "N"], correct: 0, hint: "M has two mountain peaks pointing UP. W is M doing a headstand!" },
    { kind: "pick", text: "Big A has a baby. Which one is little a?", tiles: ["a", "o", "e"], correct: 0, hint: "Little a is a circle with a tiny tail on its back!" },
  ],
  sounds: [
    { kind: "say", text: "Every letter makes a SOUND — that's its voice! B says buh, S says sss like a sneaky snake. When you know the sounds, you can hear which words are cousins!" },
    {
      kind: "cards",
      text: "Tap to hear each letter's voice!",
      cards: [
        { front: "B", back: "buh — ball, bear, banana!", say: "B says buh! Buh buh ball!" },
        { front: "S", back: "sss — sun, sock, snake!", say: "S says sss! Sss sss sun!" },
        { front: "M", back: "mmm — moon, milk, mouse!", say: "M says mmm! Mmm mmm moon!" },
        { front: "T", back: "tuh — turtle, table, toe!", say: "T says tuh! Tuh tuh turtle!" },
      ],
    },
    { kind: "pick", text: "Say 'ball' out loud. Now — which word starts with the SAME sound?", tiles: ["banana", "sun", "moon"], correct: 0, hint: "Buh-ball, buh-banana — hear the matching buh?" },
    { kind: "pick", text: "Which word starts like 'sun'? Sss…", tiles: ["dog", "sock", "cat"], correct: 1, hint: "Sss-sun, sss-sock! The snake sound!" },
  ],
  rhymes: [
    { kind: "say", text: "Rhymes are words that sing the same song at the END: cat, hat, bat! Rhyming ears are reading ears — poets and rappers train exactly like this. Whooo-hoo!" },
    {
      kind: "cards",
      text: "Tap to hear each rhyme family sing!",
      cards: [
        { front: "-at", back: "cat 🐱 hat 🎩 bat 🦇", say: "The at family! Cat, hat, bat! They all end in at!" },
        { front: "-og", back: "dog 🐶 log 🪵 frog 🐸", say: "The og family! Dog, log, frog!" },
        { front: "-un", back: "sun ☀️ run 🏃 fun 🎉", say: "The un family! Sun, run, fun!" },
      ],
    },
    { kind: "pick", text: "Which word rhymes with 'cat'?", tiles: ["hat", "dog", "sun"], correct: 0, hint: "Say the endings: cat… hat… they both sing 'at'!" },
    { kind: "pick", text: "Which word does NOT rhyme with 'frog'?", tiles: ["log", "dog", "fish"], correct: 2, hint: "Frog, log, dog all sing 'og' — fish sings its own song!" },
  ],
  cvc: [
    { kind: "say", text: "Time for your first REAL reading spell: sound it out! Say each letter's sound slowly, then squish the sounds together. C… a… t… cat! You're literally reading. Whooo!" },
    {
      kind: "cards",
      text: "Tap each card and sound it out with me!",
      cards: [
        { front: "c-a-t", back: "🐱 cat!", say: "Cuh… aah… tuh… squish it together… cat!" },
        { front: "d-o-g", back: "🐶 dog!", say: "Duh… aww… guh… dog!" },
        { front: "s-u-n", back: "☀️ sun!", say: "Sss… uh… nnn… sun!" },
      ],
    },
    { kind: "pick", text: "Sound it out: p… i… g. What did you read?", visual: "🐷", tiles: ["pig", "peg", "pug"], correct: 0, hint: "Puh… ih… guh… pig! The middle sound is ih!" },
    { kind: "pick", text: "Which word says what's in the picture?", visual: "🛏️", tiles: ["bad", "bed", "bud"], correct: 1, hint: "Buh… eh… duh… bed! Listen to the middle: eh!" },
  ],

  // ---------- L2 ----------
  sight: [
    { kind: "say", text: "Some words are too sneaky to sound out — 'the', 'you', 'said'! We call them SIGHT words because your eyes learn to know them on sight, like friends' faces. Meet a few!" },
    {
      kind: "cards",
      text: "Tap each sight word — say it out loud when you hear it!",
      cards: [
        { front: "the", back: "THE cat. THE moon. It's everywhere!", say: "The! T-h-e spells the!" },
        { front: "you", back: "YOU are amazing!", say: "You! Y-o-u spells you!" },
        { front: "said", back: `Mom SAID "wow!"`, say: "Said! S-a-i-d spells said. Sneaky spelling!" },
        { front: "two", back: "TWO cookies 🍪🍪", say: "Two! T-w-o. The W hides silently!" },
      ],
    },
    { kind: "pick", text: `Finish it: "I see ___ big dog."`, tiles: ["the", "teh", "eht"], correct: 0, hint: "T-h-e — the! Your eyes will know it forever now." },
    { kind: "pick", text: `Finish it: "___ are my best friend!"`, tiles: ["Yoo", "You", "Yuo"], correct: 1, hint: "Y-o-u spells you!" },
  ],
  plurals: [
    { kind: "say", text: "One cat, two CATS! Adding S makes MORE of something. But whooo-hoo, watch out — some words break the rules, like one mouse, two MICE. English is a silly bird sometimes." },
    { kind: "pick", text: "One dog, two ___?", visual: "🐶🐶", tiles: ["dogs", "doges", "dog"], correct: 0, hint: "Just add s — dogs!" },
    { kind: "pick", text: "One fox, two ___? (Hisses and buzzes need ES!)", visual: "🦊🦊", tiles: ["foxs", "foxes", "foxies"], correct: 1, hint: "Words ending in x, s, sh, ch add ES — foxes!" },
    { kind: "pick", text: "Rule-breaker alert! One mouse, two ___?", visual: "🐭🐭", tiles: ["mouses", "mice", "meese"], correct: 1, hint: "Mouse is a rebel — the plural is mice! Some words just change completely." },
    { kind: "pick", text: "One child, two ___?", tiles: ["childs", "children", "childes"], correct: 1, hint: "Another rebel! Child becomes children." },
  ],
  build: [
    { kind: "say", text: "Words are LEGO! Snap two small words together and build a bigger one: rain + bow = rainbow! And clap the beats: el-e-phant is three claps. Builders and clappers, let's go!" },
    {
      kind: "cards",
      text: "Tap to snap the word-LEGOs together!",
      cards: [
        { front: "rain + bow", back: "🌈 rainbow!", say: "Rain plus bow makes rainbow!" },
        { front: "cup + cake", back: "🧁 cupcake!", say: "Cup plus cake makes cupcake! Delicious construction." },
        { front: "sun + flower", back: "🌻 sunflower!", say: "Sun plus flower makes sunflower!" },
      ],
    },
    { kind: "pick", text: "Which two words build 'butterfly'?", visual: "🦋", tiles: ["butter + fly", "but + terfly", "butte + rfly"], correct: 0, hint: "Butter plus fly! (No, butterflies are not made of butter. I checked.)" },
    { kind: "pick", text: "Clap it out: wa-ter-mel-on. How many claps (syllables)?", visual: "🍉", tiles: ["2", "3", "4"], correct: 2, hint: "Wa-ter-mel-on — clap clap clap clap — four!" },
  ],
  rhymes2: [
    { kind: "say", text: "Rhyme Master training! Now the families get bigger — night, light, bright, kite! Different spellings can still sing the same song. Your poet ears are growing, whooo!" },
    { kind: "pick", text: "Which word rhymes with 'night'?", tiles: ["kite", "nest", "note"], correct: 0, hint: "Night… kite… both sing 'ite' — even spelled differently!" },
    { kind: "pick", text: "Which word rhymes with 'bee'?", tiles: ["bed", "key", "boat"], correct: 1, hint: "Bee… key… both sing 'ee'! Tricky spelling, same song." },
    { kind: "pick", text: "Finish my poem: 'I saw a little star, riding in a ___'", tiles: ["car", "bike", "boat"], correct: 0, hint: "Star… car… the 'ar' song!" },
  ],

  // ---------- L3 ----------
  syn: [
    { kind: "say", text: "Synonyms are word twins — different words, same meaning! Big and huge. Happy and glad. Great writers collect them like treasure so they never say the same word twice. Whooo!" },
    {
      kind: "cards",
      text: "Meet the word twins — tap to hear them!",
      cards: [
        { front: "big", back: "huge · giant · enormous", say: "Big! Its twins are huge, giant, and enormous!" },
        { front: "happy", back: "glad · joyful · cheerful", say: "Happy! Its twins are glad, joyful, and cheerful!" },
        { front: "fast", back: "quick · speedy · zippy", say: "Fast! Its twins are quick, speedy, and zippy!" },
      ],
    },
    { kind: "pick", text: "Which word is a twin of 'cold'?", tiles: ["chilly", "warm", "loud"], correct: 0, hint: "Brrr… cold and chilly mean the same shivery thing!" },
    { kind: "pick", text: "Pick the fancier twin: 'The cake was good.' The cake was ___!", tiles: ["delicious", "bad", "okay"], correct: 0, hint: "Delicious is 'good' wearing a bow tie!" },
  ],
  punct: [
    { kind: "say", text: "Punctuation marks are traffic signs for readers! A period says STOP. A question mark raises an eyebrow? An exclamation mark JUMPS! Without them, sentences crash into each other." },
    {
      kind: "cards",
      text: "Tap each traffic sign to hear its job!",
      cards: [
        { front: ".", back: "Full stop. The sentence is done.", say: "The period! It means: stop, the thought is finished." },
        { front: "?", back: "Asking something?", say: "The question mark! Hear my voice go up? That's a question!" },
        { front: "!", back: "Excitement! Surprise! WOW!", say: "The exclamation mark! For shouting and celebrating!" },
      ],
    },
    { kind: "pick", text: `Which mark finishes: "Do you like pizza___"`, tiles: ["?", ".", ","], correct: 0, hint: "It's asking something — question mark!" },
    { kind: "pick", text: "Which sentence is dressed correctly?", tiles: ["My name is Ruby.", "my name is ruby", "my Name is ruby."], correct: 0, hint: "Capital letter at the start, period at the end — fully dressed!" },
  ],
  sentfix: [
    { kind: "say", text: "A sentence is a train: it needs a WHO (the engine) and a DID-WHAT (the wheels). 'The dog ran.' Who? The dog! Did what? Ran! No engine or no wheels — the train goes nowhere." },
    { kind: "pick", text: "Which train actually runs? (Which is a complete sentence?)", tiles: ["The bird sings.", "The bird.", "Sings in the."], correct: 0, hint: "Who: the bird. Did what: sings! Engine AND wheels!" },
    { kind: "pick", text: "'The frog jumps high.' Which word is the ACTION (the wheels)?", tiles: ["frog", "jumps", "high"], correct: 1, hint: "What is the frog DOING? Jumping! Action words are called verbs." },
    { kind: "pick", text: "Unscramble the crash: which order makes sense?", tiles: ["We baked cookies for Grandma.", "Cookies Grandma for baked we.", "Baked we Grandma cookies for."], correct: 0, hint: "Who first (We), then the action (baked), then the rest!" },
  ],
  sight2: [
    { kind: "say", text: "Level-up sight words — the tricky triplets: there, their, they're! They SOUND the same but mean different things. Even grown-ups mix these up. You're about to beat the grown-ups. Whooo!" },
    {
      kind: "cards",
      text: "Tap to meet the tricky triplets!",
      cards: [
        { front: "there", back: "A place: over THERE! 👉", say: "There, with T-H-E-R-E, points to a place. Over there!" },
        { front: "their", back: "Belongs to them: THEIR dog 🐕", say: "Their, T-H-E-I-R, means it belongs to them!" },
        { front: "they're", back: "Short for THEY ARE!", say: "They're, with the apostrophe, is just they are squished together!" },
      ],
    },
    { kind: "pick", text: `"___ going to the park!" (they are)`, tiles: ["They're", "There", "Their"], correct: 0, hint: "Try the un-squish test: 'They are going' works — so it's they're!" },
    { kind: "pick", text: `"The park is over ___." (a place)`, tiles: ["their", "there", "they're"], correct: 1, hint: "It's a place — there, with 'here' hiding inside it!" },
  ],

  // ---------- L4 ----------
  ant: [
    { kind: "say", text: "Antonyms are opposite twins — hot and cold, up and down! They're how writers make things POP: the giant was huge, the mouse was tiny. Opposites make stories exciting!" },
    {
      kind: "cards",
      text: "Tap the word, flip for its opposite!",
      cards: [
        { front: "hot 🔥", back: "cold ❄️", say: "Hot! Its opposite is cold!" },
        { front: "brave 🦁", back: "scared 🙀", say: "Brave! Its opposite is scared!" },
        { front: "whisper 🤫", back: "shout 📣", say: "Whisper! Its opposite is shout!" },
      ],
    },
    { kind: "pick", text: "What's the OPPOSITE of 'empty'?", tiles: ["full", "open", "small"], correct: 0, hint: "An empty cup has nothing — a FULL cup has everything!" },
    { kind: "pick", text: "What's the OPPOSITE of 'always'?", tiles: ["sometimes", "never", "often"], correct: 1, hint: "Always means every single time — never means not even once!" },
  ],
  affix: [
    { kind: "say", text: "Secret word codes! Word parts have superpowers: UN- flips a word to its opposite, RE- means do it again, -FUL fills it up. Crack the code and you can read words you've never even seen. Whooo!" },
    {
      kind: "cards",
      text: "Tap to crack each code!",
      cards: [
        { front: "un-", back: "NOT: unhappy = not happy", say: "Un means not! Unhappy, unfair, unzipped!" },
        { front: "re-", back: "AGAIN: reread = read again", say: "Re means again! Reread, redo, rebuild!" },
        { front: "-ful", back: "FULL OF: joyful = full of joy", say: "Ful means full of! Joyful, helpful, colorful!" },
        { front: "-less", back: "WITHOUT: fearless = no fear!", say: "Less means without! Fearless, endless!" },
      ],
    },
    { kind: "pick", text: "Crack it: what does 'unlock' mean?", tiles: ["to open the lock", "to lock it twice", "a tiny lock"], correct: 0, hint: "UN flips it — un-lock is the opposite of lock!" },
    { kind: "pick", text: "Crack it: 'refill' means…", tiles: ["fill it again", "never fill it", "full of fill"], correct: 0, hint: "RE means again — fill it again!" },
  ],
  passage1: [
    { kind: "say", text: "Story detective time! When you read, the answers hide right in the words — you just have to look back at the clues. Real detectives never guess; they CHECK. Magnifying glasses up! Whooo!" },
    { kind: "pick", text: `Read the clue: "Mia planted a seed. She watered it every day. Soon a green sprout appeared." What did Mia water?`, tiles: ["a seed", "a cat", "her boots"], correct: 0, hint: "Look back at the words: 'Mia planted a SEED. She watered IT.'" },
    { kind: "pick", text: `"Sam lost his mitten. He found it in his boot." Where was it hiding?`, tiles: ["in his boot", "under the bed", "at school"], correct: 0, hint: "The clue sentence says: found it IN HIS BOOT!" },
    { kind: "pick", text: `"First we mixed. Then we poured. Last we ate warm pancakes!" What happened LAST?`, tiles: ["eating pancakes", "mixing", "pouring"], correct: 0, hint: "The word 'last' is the clue flag — last we ATE!" },
  ],
  syn2: [
    { kind: "say", text: "Vocabulary booster! Strong readers upgrade small words into POWERFUL ones. 'Said' is fine — but whispered, announced, and cheered tell you so much more. Let's polish your word treasure!" },
    { kind: "pick", text: "Upgrade 'said' for a happy shout: 'We won!' she ___", tiles: ["cheered", "whispered", "mumbled"], correct: 0, hint: "Winning is loud and joyful — she CHEERED!" },
    { kind: "pick", text: "Upgrade 'walked' for someone super tired: he ___ to bed", tiles: ["trudged", "danced", "zoomed"], correct: 0, hint: "Trudge is a heavy, dragging walk — perfect for sleepy feet!" },
    { kind: "pick", text: "Which word means 'very very old'?", tiles: ["ancient", "new", "shiny"], correct: 0, hint: "Ancient — older than grandma's grandma's grandma!" },
  ],

  // ---------- L5 ----------
  mainidea: [
    { kind: "say", text: "Every story has a BIG IDEA — the umbrella that all the little details stand under! Details are fun, but the main idea is what the whole thing is really about. Find the umbrella! Whooo!" },
    { kind: "pick", text: "Umbrella check: 'Bees visit flowers. They carry pollen. This helps seeds grow.' What's the umbrella?", tiles: ["Bees help plants grow", "Bees are yellow", "Flowers smell nice"], correct: 0, hint: "Every sentence is about bees HELPING plants — that's the umbrella over all of them!" },
    { kind: "pick", text: "'Pack water. Wear good shoes. Stay on the trail.' These tips are all about…", tiles: ["going on a hike", "baking a cake", "taking a bath"], correct: 0, hint: "Water, shoes, trail — all standing under the hiking umbrella!" },
    { kind: "pick", text: "Best title for a story about a dog who saves a kitten from a tree?", tiles: ["Rex to the Rescue", "All About Trees", "Kittens Are Small"], correct: 0, hint: "A good title names the BIG idea — the rescue is the whole story!" },
  ],
  infer: [
    { kind: "say", text: "Now the elite detective skill: reading clues the author DIDN'T say out loud! If Maya grabs an umbrella, the author never said 'it's raining' — but your brain KNOWS. That's called inferring. Whooo, spooky powers!" },
    { kind: "pick", text: "'Dad yawned and turned off the lamp.' What will Dad probably do next?", tiles: ["go to sleep", "bake cookies", "go running"], correct: 0, hint: "Yawn + lights off = sleepy clues. The author didn't SAY it — you inferred it!" },
    { kind: "pick", text: "'The waiting room was full of barking and meowing.' Where are we?", tiles: ["a vet's office", "a library", "a bakery"], correct: 0, hint: "Barking and meowing in a waiting room — animals visiting their doctor!" },
    { kind: "pick", text: "'The cookie jar was empty and crumbs led to Max's room.' What happened?!", tiles: ["Max ate the cookies", "the jar broke", "Mom hid them"], correct: 0, hint: "Follow the crumb trail, detective — it leads right to the suspect!" },
  ],
  homo: [
    { kind: "say", text: "Twin-sound words! 'See' and 'sea' sound identical but mean totally different things. Spelling is the secret decoder. These fool everyone — but not us, whooo!" },
    {
      kind: "cards",
      text: "Tap to untangle the twins!",
      cards: [
        { front: "see / sea", back: "SEE with eyes 👀 · the salty SEA 🌊", say: "See with two E's is with your eyes. Sea with E-A is the ocean!" },
        { front: "their / there", back: "THEIR dog 🐕 · over THERE 👉", say: "Their means it belongs to them. There is a place!" },
        { front: "piece / peace", back: "a PIECE of cake 🍰 · calm PEACE ☮️", say: "Piece with I-E is a slice. Peace with E-A is calm and quiet!" },
      ],
    },
    { kind: "pick", text: `"I can ___ the ocean from here!"`, tiles: ["see", "sea"], correct: 0, hint: "Using your eyes — that's SEE with two E's!" },
    { kind: "pick", text: `"May I have a ___ of pizza?"`, tiles: ["piece", "peace"], correct: 0, hint: "A slice is a PIECE — remember: a PIEce of PIE!" },
  ],
  passage2: [
    { kind: "say", text: "Deep story dives! Now we read for WHY things happen — cause and effect, feelings, and reasons. The best readers ask 'why?' after every sentence, like a curious owlet. Whooo-why? Whooo-why?" },
    { kind: "pick", text: "'Nora practiced piano every night. At the recital she didn't miss a note!' WHY did she do so well?", tiles: ["she practiced every night", "she got lucky", "the song was easy"], correct: 0, hint: "The first sentence is the CAUSE — practice made the recital great!" },
    { kind: "pick", text: "'The wind blew hard. Leaves danced. Ava zipped her coat.' What season is it probably?", tiles: ["fall", "summer", "her birthday"], correct: 0, hint: "Wind + falling leaves + coats = autumn clues everywhere!" },
    { kind: "pick", text: "'Leo fed his fish twice a day and cleaned the tank on Saturdays.' What kind of kid is Leo?", tiles: ["responsible", "forgetful", "grumpy"], correct: 0, hint: "Feeding AND cleaning on schedule — that's what responsible looks like!" },
  ],

  // ---------- L6 ----------
  fig: [
    { kind: "say", text: "Welcome to the author's secret workshop! Writers paint with word-tricks: 'the classroom was a zoo' — no actual lions, it just FELT wild! These tricks have fancy names, and you're about to own them all. Whooo!" },
    {
      kind: "cards",
      text: "Tap to learn each word-trick!",
      cards: [
        { front: "simile", back: "compares with LIKE or AS: brave AS a lion 🦁", say: "A simile compares using like or as. As brave as a lion!" },
        { front: "metaphor", back: "says it IS: the classroom WAS a zoo!", say: "A metaphor says something IS something else. The classroom was a zoo!" },
        { front: "personification", back: "things act human: the wind WHISPERED 🍃", say: "Personification gives things human powers. The wind whispered!" },
        { front: "onomatopoeia", back: "sound words: BOOM! SPLASH! 💥", say: "Onomatopoeia! Words that sound like sounds. Boom! Crash! Splash!" },
      ],
    },
    { kind: "pick", text: "'Her smile was as bright as the sun.' Which trick is that?", tiles: ["simile", "metaphor", "onomatopoeia"], correct: 0, hint: "It uses AS — as bright AS the sun. That's a simile!" },
    { kind: "pick", text: "'The thunder grumbled all night.' Thunder can't really grumble — that's…", tiles: ["personification", "a simile", "a fact"], correct: 0, hint: "Grumbling is a person thing — the author gave thunder a personality!" },
  ],
  grammar2: [
    { kind: "say", text: "Grammar Pro time! Every word has a job: nouns NAME, verbs DO, adjectives DESCRIBE, adverbs tell HOW. Know the jobs and you can build any sentence in the world. Whooo, architect of words!" },
    {
      kind: "cards",
      text: "Tap to meet the word jobs!",
      cards: [
        { front: "noun", back: "names a thing: cat, park, Ruby", say: "Nouns name people, places, and things!" },
        { front: "verb", back: "the action: runs, sings, sleeps", say: "Verbs are the doing words!" },
        { front: "adjective", back: "describes: fluffy, tiny, purple", say: "Adjectives describe — the FLUFFY cat!" },
        { front: "adverb", back: "tells how: quickly, gently", say: "Adverbs tell how — she ran QUICKLY!" },
      ],
    },
    { kind: "pick", text: "'The fluffy cat slept.' Which word is the ADJECTIVE?", tiles: ["fluffy", "cat", "slept"], correct: 0, hint: "Which word DESCRIBES the cat? Fluffy!" },
    { kind: "pick", text: "Time travel: 'Yesterday we ___ to the zoo.'", tiles: ["went", "go", "will go"], correct: 0, hint: "Yesterday is the past — the past of 'go' is 'went'!" },
  ],
  infer2: [
    { kind: "say", text: "Master Detective final training! Now the clues get subtle — feelings hidden in actions, endings hinted before they happen. Authors leave breadcrumbs on purpose. You see EVERYTHING now. Whooo." },
    { kind: "pick", text: "'Lily's teeth chattered and she hugged her arms tight.' How does Lily feel?", tiles: ["freezing cold", "excited", "hungry"], correct: 0, hint: "Chattering teeth + hugging arms = body clues for COLD!" },
    { kind: "pick", text: "'Everyone cheered as Jo crossed the line first.' What just happened?", tiles: ["Jo won a race", "Jo drew a line", "Jo lost a shoe"], correct: 0, hint: "Crossed the line FIRST + cheering = victory!" },
    { kind: "pick", text: "'Ben stared at his shoes and mumbled sorry.' How does Ben feel?", tiles: ["ashamed", "thrilled", "sleepy"], correct: 0, hint: "Staring down + mumbling = the body language of feeling bad about it." },
  ],
  mainidea2: [
    { kind: "say", text: "The final boss: main ideas in the wild! Real books don't announce their big idea — YOU crown it. Ask: what do ALL the details bow to? That's the ruler of the story. Crown it, champion! Whooo!" },
    { kind: "pick", text: "'Octopuses change color. They squeeze through cracks. They even use tools!' Crown the main idea:", tiles: ["Octopuses are amazingly clever", "The ocean is deep", "Tools are handy"], correct: 0, hint: "Color tricks, escapes, tools — every detail bows to octopus cleverness!" },
    { kind: "pick", text: "'Libraries lend books free. They host story time. They lend games too!' The crown goes to…", tiles: ["Libraries offer tons for everyone", "Books cost money", "Games are fun"], correct: 0, hint: "Free books, story time, games — all bowing to how much libraries give!" },
    { kind: "pick", text: "An author writes: recycling bins, cleanup days, planting trees. Her big idea is probably…", tiles: ["helping the Earth", "her favorite color", "how to bake"], correct: 0, hint: "Bins, cleanups, trees — all standing under the helping-Earth umbrella!" },
  ],
};
