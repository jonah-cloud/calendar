import type { GradeDef } from "./types";

/** Grade 1: CVC through blends, digraphs, magic e and first vowel teams. */
export const GRADE_1: GradeDef = {
  id: "1",
  label: "Grade 1",
  emoji: "1️⃣",
  color: "#0d9488",
  soft: "#f0fdfa",
  wcpm: { fall: 15, winter: 29, spring: 60 },
  units: [
    { title: "Short Vowels", weeks: [
      ["Short A", ["cat", "has", "mat", "bad", "tan"], ["and", "go", "see", "she", "the"], [
        "I have a cat.", "She is on a mat.", "The cat is tan.", "My tan cat is bad.",
        "She has a rat.", "I see the rat on the mat.",
      ]],
      ["Short I", ["big", "him", "sit", "six", "pig"], ["kid", "kids", "the", "play", "you"], [
        "I see the six big kids.", "The big kids play.", "The big kids play with a pig.",
        "The big kids sit with him.", "You can play with the big kids.",
      ]],
      ["Short O", ["on", "box", "mom", "fox", "not"], ["for", "have", "jump", "no", "one"], [
        "Mom and I see one fox.", "Mom and I have a box.", "We got the box for the fox.",
        "Will the fox jump in the box?", "No, the fox will not go in the box.",
        "We see the fox sit on the box.",
      ]],
    ]},
    { title: "More Short Vowels", weeks: [
      ["Short E", ["ten", "fed", "men", "set", "hens"], ["are", "look", "my", "said", "two"], [
        "Two men have ten hens.", "The hens are little.", "The men fed the hens.",
        "Look at the big mess, said one man.", "I will set my hens in a pen.",
      ]],
      ["Short U", ["run", "mud", "fun", "sun", "ducks"], ["come", "here", "of", "to", "said"], [
        "Two ducks run in the sun.", "The ducks run to the mud.",
        "The ducks have fun in the mud.", "Come here, ducks, said the man.",
        "The man put the ducks in a tub.",
      ]],
      ["l-Blends", ["class", "flat", "black", "slip", "plan"], ["put", "saw", "this", "want", "what"], [
        "We put a flat, black rug in my class.", "I saw two kids slip on the rug.",
        "I said, I do not want to slip on this rug.", "A kid said, What is the plan?",
        "I said, We will put the rug out of the class.",
      ]],
    ]},
    { title: "Blends", weeks: [
      ["s-Blends", ["stop", "spin", "skip", "snap", "swim"], ["she", "down", "was", "all", "out"], [
        "We all went down to swim.", "My sis can swim fast.",
        "She can spin and spin in the water.", "Stop! I said. That stick will snap.",
        "We got out and did skip all the way back.",
      ]],
      ["r-Blends", ["frog", "drop", "trip", "grass", "crab"], ["from", "then", "there", "were", "give"], [
        "We went on a trip to the pond.", "There were frogs in the grass.",
        "A crab ran out from a rock.", "Then a frog did drop in with a splash.",
        "Mom said she would give us a snack after the trip.",
      ]],
      ["End Blends", ["hand", "jump", "nest", "tent", "best"], ["into", "find", "help", "walk", "over"], [
        "Dad put the tent up on the grass.", "I did help him with my hand.",
        "We did find a nest over by the pond.",
        "I had to walk soft so the birds would not jump.", "This is the best camp, I said.",
      ]],
    ]},
    { title: "Digraphs", weeks: [
      ["sh and ch", ["ship", "fish", "shop", "chin", "chop"], ["who", "many", "water", "live", "every"], [
        "Many kids live by the water.", "Every day we see a big ship.",
        "Who is on the ship? I ask.", "The men on the ship get fish.",
        "They take the fish to the shop.", "Mom will chop the fish for a dish.",
      ]],
      ["th and wh", ["this", "that", "with", "when", "what"], ["because", "could", "very", "first", "know"], [
        "I know that I can read.", "I like this book very much.",
        "I read it first with my mom.", "Then I could read it by myself.",
        "What is it about? my dad said.", "It is about a cat, because I love cats.",
      ]],
      ["ck and ng", ["duck", "back", "song", "long", "ring"], ["under", "again", "around", "after", "before"], [
        "A duck sat under the long dock.", "I did not see her before.",
        "She sang a song again and again.", "I ran around to the back of the dock.",
        "After a bit the duck did swim off.", "I will look for her again.",
      ]],
    ]},
    { title: "Magic E", weeks: [
      ["a_e", ["cake", "make", "late", "name", "same"], ["their", "would", "should", "write", "always"], [
        "Mom said we would make a cake.", "It is for my pal and her twin.",
        "Their name is the same!", "We should not be late for the party.",
        "I will write their names on the cake.", "I always like to help Mom bake.",
      ]],
      ["i_e", ["bike", "ride", "time", "nine", "like"], ["other", "these", "those", "any", "both"], [
        "I like to ride my bike.", "My bike is red and my sis has a blue one.",
        "Both of these bikes are fast.", "We ride at nine every day.",
        "Those other kids ride with us.", "It is the best time of the day.",
      ]],
      ["o_e and u_e", ["home", "note", "rose", "cute", "huge"], ["people", "father", "mother", "also", "only"], [
        "My mother left a note at home.", "It said to look at the rose by the step.",
        "The rose was huge!", "My father said it is the only one that grew.",
        "People stop to look at it.", "I think it is also very cute.",
      ]],
    ]},
    { title: "Vowel Teams", weeks: [
      ["ai and ay", ["rain", "play", "day", "wait", "train"], ["today", "away", "goes", "does", "right"], [
        "It did rain all day today.", "I had to wait to play.",
        "I set up my train on the rug.", "It goes right past my bed.",
        "Does the rain ever go away? I said.", "Then the sun came out!",
      ]],
      ["ee and ea", ["tree", "green", "sleep", "each", "beach"], ["please", "something", "better", "another", "where"], [
        "We went to the beach where the big green tree stands.",
        "Each of us had something to carry.",
        "Please help me, said my brother.",
        "We found another shell, and then another.",
        "The sea air made me sleep better that night.",
      ]],
      ["oa and ow", ["boat", "coat", "road", "slow", "grow"], ["through", "around", "own", "most", "know"], [
        "We took a boat down the river.", "I wore my own green coat.",
        "The boat went slow through the fog.", "Most of the trees grow right by the road.",
        "I know this river well.", "We went all the way around the bend.",
      ]],
    ]},
    { title: "Bossy R", weeks: [
      ["ar", ["farm", "barn", "car", "star", "yard"], ["family", "together", "morning", "country", "early"], [
        "My family drove the car out to the farm.",
        "We left early in the morning.",
        "The barn is the biggest one in the country.",
        "We fed the pigs together in the yard.",
        "After dark we counted every star we could find.",
      ]]
      ,
      ["or and ore", ["storm", "corn", "short", "more", "store"], ["almost", "enough", "below", "front", "between"], [
        "A short storm came through just before lunch.",
        "The corn in the front field bent almost to the ground.",
        "We waited between the barn and the store.",
        "Was there enough rain? asked Dad.",
        "More than enough, said Grandma, pointing below the hill.",
      ]],
      ["er, ir and ur", ["farmer", "bird", "girl", "turn", "water"], ["world", "important", "second", "already", "different"], [
        "The farmer gave water to every animal.",
        "A girl helped her, taking a turn with the bucket.",
        "A bird landed on the fence for a second.",
        "It was a different bird than the one from yesterday.",
        "Nothing in the world is more important than a job well done.",
      ]],
    ]},
    { title: "Tricky Vowels", weeks: [
      ["ou and ow", ["loud", "found", "house", "brown", "down"], ["there", "thought", "heard", "began", "children"], [
        "There was a loud sound in our house.",
        "The children heard it and began to look.",
        "We found a small brown mouse under the counter!",
        "I thought it would run, but it sat still.",
        "Dad carried it down to the field and let it go.",
      ]],
      ["oi and oy", ["coin", "join", "boy", "toy", "point"], ["money", "nothing", "something", "while", "away"], [
        "A boy found an old coin in the soil.",
        "At first it looked like nothing at all.",
        "After a while he could see a date on it.",
        "Is this real money? he asked.",
        "His mother said it was something to keep, not throw away.",
      ]],
      ["oo and all", ["book", "look", "tall", "wall", "small"], ["behind", "while", "during", "below", "above"], [
        "There is a tall wall behind our school.",
        "A small door sits in the middle of it.",
        "During lunch we look at it and wonder.",
        "I took a book and read below the wall for a while.",
        "Above the wall I could see the top of an apple tree.",
      ]],
    ]},
    { title: "Words That Grow", weeks: [
      ["Adding -s and -es", ["dogs", "boxes", "wishes", "cats", "foxes"], ["several", "number", "group", "often", "usually"], [
        "Several foxes live in the woods near us.",
        "We usually see them in a group at dusk.",
        "I keep a number of boxes by the back door for my cats.",
        "The dogs often bark when the foxes come close.",
        "My only wish is that they would all be friends.",
      ]],
      ["Adding -ing and -ed", ["running", "jumped", "playing", "stopped", "helping"], ["suddenly", "finally", "quickly", "carefully", "surely"], [
        "We were playing in the yard when it started to rain.",
        "Suddenly everyone was running for the porch.",
        "My brother jumped over the step and nearly fell.",
        "I stopped and helped him up carefully.",
        "Finally we were all inside, soaked and laughing.",
      ]],
      ["Compound words", ["sunset", "backyard", "bedtime", "sandbox", "cupcake"], ["anything", "everything", "someone", "nothing", "everyone"], [
        "Everyone came to our backyard for the party.",
        "Someone brought a cupcake for each of us.",
        "The little ones played in the sandbox.",
        "We watched the sunset, and nobody wanted to leave.",
        "By bedtime I was sure nothing could have been better.",
      ]],
    ]},
    { title: "Ready for Second Grade", weeks: [
      ["Review: blends and digraphs", ["splash", "branch", "shrink", "thick", "strong"], ["beautiful", "wonderful", "remember", "believe", "probably"], [
        "The river is wide and strong where the thick branch hangs over it.",
        "We swing out and let go with a splash.",
        "The water is cold enough to make you shrink back at first.",
        "It is the most beautiful spot I know.",
        "I will remember this wonderful summer for a long time.",
      ]],
      ["Review: long vowels", ["bright", "those", "rain", "green", "whole"], ["through", "though", "enough", "thought", "brought"], [
        "The rain fell all through the night.",
        "In the morning the whole yard was bright and green.",
        "I thought those clouds would never move.",
        "Even though it was wet, we brought our boots and went out.",
        "There were puddles deep enough to jump in.",
      ]],
      ["Review: everything", ["started", "learning", "better", "reading", "faster"], ["because", "finally", "always", "myself", "important"], [
        "At the start of the year I could only read a few words.",
        "I kept reading, because my teacher said practice was important.",
        "Each week I got a little bit faster.",
        "Now I can read a whole book by myself.",
        "Finally I understand what everyone meant about learning.",
        "I am a better reader than I was, and I always will be.",
      ]],
    ]},
  ],
};
