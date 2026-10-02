import type { FluencyStage } from "./types";

/** Stages 1–4: short vowels → digraphs → blends → magic e. */
export const STAGES_1_4: FluencyStage[] = [
  {
    title: "Short Vowels",
    emoji: "🅰️",
    color: "#f97316",
    soft: "#fff7ed",
    rows: [
      ["The Fat Cat", "a", "short a", ["cat", "sat", "fat", "mat", "hat"], [
        "A cat sat on a mat.", "The cat is fat.", "The fat cat has a hat.",
        "It is a tan hat.", "The fat cat sat and sat.", "Nap time, cat!",
      ]],
      ["Sam and the Bag", "a", "short a", ["Sam", "bag", "had", "ran", "can"], [
        "Sam had a bag.", "The bag is tan.", "Sam ran and ran.",
        "Can Sam get the bag?", "Sam can!", "Sam has the bag.", "Sam sat on a mat.",
      ]],
      ["The Big Pig", "i", "short i", ["pig", "big", "dig", "pit", "it"], [
        "A pig is big.", "The big pig can dig.", "Dig, dig, dig!",
        "The pig can dig a pit.", "The big pig sat in the pit.", "It is a big pit!",
      ]],
      ["Jim Hid", "i", "short i", ["Jim", "hid", "did", "rip", "zip"], [
        "Jim is a kid.", "Jim hid in a bin.", "Did Jim rip it?",
        "Jim did not rip it.", "Jim can zip it up.", "Zip, zip, zip!", "I can not see Jim!",
      ]],
      ["The Hot Pot", "o", "short o", ["pot", "hot", "got", "not", "top"], [
        "Mom has a pot.", "The pot is hot.", "Do not sit on the pot!",
        "Mom got a lid.", "The lid is on top.", "The pot is not hot now.",
      ]],
      ["The Dog on the Log", "o", "short o", ["dog", "log", "hog", "jog", "fog"], [
        "A dog sat on a log.", "A hog sat on the log too.", "The dog can jog.",
        "Jog, dog, jog!", "The hog can jog too.", "The fog is on the log.",
        "The dog and the hog ran.",
      ]],
      ["The Pup in the Mud", "u", "short u", ["pup", "mud", "tub", "rub", "fun"], [
        "A pup ran in the mud.", "Mud, mud, mud!", "The pup is not tan now.",
        "Mom put the pup in the tub.", "Rub, rub, rub!", "The pup is tan!",
        "The pup had fun.",
      ]],
      ["Gus in the Sun", "u", "short u", ["Gus", "sun", "bun", "run", "up"], [
        "Gus sat in the sun.", "The sun is hot.", "Gus had a bun.", "Yum!",
        "Gus can run.", "Run, Gus, run!", "Gus ran up to the sun hat.",
        "It is fun to run in the sun.",
      ]],
      ["The Hen in the Pen", "e", "short e", ["hen", "pen", "ten", "men", "den"], [
        "A hen sat in a pen.", "Ten men ran to the pen.", "The hen ran to the den.",
        "Can the men get the hen?", "The men can not!", "The hen sat in the den.",
        "The hen is not in the pen now.",
      ]],
      ["Ten Pets", "a i o u e", "all five short vowels", ["cat", "pig", "dog", "pup", "hen"], [
        "Ben has ten pets.", "Ben has a cat and a pig.", "Ben has a dog and a pup.",
        "Ben has a hen in a pen.", "The cat sat on the mat.", "The pig dug in the mud.",
        "The dog ran to the log.", "Ben fed all ten pets.", "Ten pets is a lot!",
      ]],
    ],
  },
  {
    title: "Digraphs",
    emoji: "🔤",
    color: "#ec4899",
    soft: "#fdf2f8",
    rows: [
      ["The Black Duck", "ck", "ck at the end of a word", ["duck", "black", "back", "sock", "kick"], [
        "Jack has a duck.", "The duck is black.", "The duck can kick.",
        "Kick, kick, kick!", "The duck got a red sock.", "Jack ran back to get it.",
        "Quack! said the black duck.", "Jack had to pick up the sock.",
      ]],
      ["The Little Ship", "sh", "the /sh/ sound", ["ship", "shop", "fish", "dish", "shell"], [
        "Shan has a little ship.", "The ship can go fast.", "Shan got a fish on the ship.",
        "The fish sat on a dish.", "Shan has a shell too.", "The shell is pink.",
        "Shh! said Shan.", "The fish is not big.", "Shan put the fish back in.",
      ]],
      ["Chop, Chop!", "ch", "the /ch/ sound", ["chop", "chip", "chin", "much", "lunch"], [
        "Chad can chop.", "Chop, chop, chop!", "Chad has a chip on his chin.",
        "Chad will chop it up for lunch.", "That is much too much!", "Chad had a big lunch.",
        "Chad is a chef.",
      ]],
      ["The Thin Path", "th", "the quiet /th/ sound", ["thin", "path", "with", "bath", "moth"], [
        "Beth ran on a thin path.", "A moth sat on the path.", "The moth is thin.",
        "Beth ran with the moth.", "The path led to a bath.", "Splash!",
        "Beth had a bath with the moth.", "Thank you, said Beth.",
      ]],
      ["This and That", "th", "the buzzy /th/ sound", ["this", "that", "them", "then", "they"], [
        "This is my hat.", "That is your hat.", "Mom has them both.",
        "Then they got mixed up!", "Is this that one?", "Is that this one?",
        "They can not tell!", "Mom said, this one is yours.",
      ]],
      ["Which One?", "wh", "the /wh/ sound", ["which", "when", "what", "whiz", "whip"], [
        "Which hat is best?", "When can I pick?", "What is in the box?",
        "Whiz! The box went past.", "The wind can whip the flag.", "Which one will you get?",
        "When I pick, I will be quick!",
      ]],
      ["The Long Song", "ng", "the /ng/ sound", ["song", "long", "ring", "king", "sing"], [
        "The king can sing.", "The king sang a long song.", "Ring the bell!",
        "Ding, ding, ding!", "The king sang all day long.", "It was a long, long song.",
        "Sing with the king!", "We sang along.",
      ]],
      ["The Bell", "ll ss ff zz", "double letters at the end", ["bell", "tell", "miss", "puff", "buzz"], [
        "Nell has a bell.", "The bell can ring.", "Will you tell Nell?",
        "A bee can buzz.", "Buzz, buzz!", "Puff! went the wind.",
        "Nell will miss the bell.", "Ring it well, Nell!",
      ]],
      ["The Quick Quiz", "qu", "the /kw/ sound", ["quiz", "quit", "quick", "quack", "quilt"], [
        "It is quiz day!", "Quin is quick.", "Quin did not quit.",
        "A duck went quack in the quiz!", "Quack, quack, quack!", "Quin sat on a quilt.",
        "Quin was quick and did not quit.", "Quin got the quiz right!",
      ]],
      ["The Shack", "sh ch th ck", "digraph review", ["shack", "chick", "thick", "shell", "check"], [
        "Chet has a shack.", "The shack has thick walls.", "A chick ran in the shack.",
        "Check on the chick, Chet!", "The chick sat on a shell.", "The shell will crack.",
        "Chet will check the chick.", "The chick is in the shack with Chet.",
      ]],
    ],
  },
  {
    title: "Blends",
    emoji: "🧩",
    color: "#8b5cf6",
    soft: "#f5f3ff",
    rows: [
      ["Stan and the Sled", "st sp sk sn sl sw", "s-blends", ["sled", "stop", "spin", "skip", "snap"], [
        "Stan has a sled.", "The sled can spin.", "Spin, sled, spin!",
        "Stan did not stop.", "Snap! went a stick.", "Stan had to skip the big rock.",
        "Stop, Stan, stop!", "Stan did stop at last.", "The sled sat still in the snow.",
      ]],
      ["The Flag", "bl cl fl gl pl", "l-blends", ["flag", "flat", "clap", "glad", "plan"], [
        "Glen has a flag.", "The flag is flat.", "Glen has a plan.",
        "Glen will plant the flag on the hill.", "Clap, clap, clap!", "We are all glad.",
        "The flag flaps in the wind.", "Glen is glad he had a plan.",
      ]],
      ["The Frog", "br cr dr fr gr pr tr", "r-blends", ["frog", "drop", "trip", "grin", "crab"], [
        "A frog sat on a rock.", "Drop! went the frog.", "The frog fell in the grass.",
        "A crab ran past.", "The crab had a big grin.", "Do not trip, frog!",
        "The frog and the crab ran to the pond.", "They had a grand trip.",
      ]],
      ["The Pond", "nd nt mp st", "blends at the end", ["pond", "jump", "nest", "tent", "hand"], [
        "We went to the pond.", "Dad put up a tent.", "A duck had a nest.",
        "I held out my hand.", "The duck did not jump.", "Then splash! It did jump.",
        "We sat by the tent and the pond.", "It was the best day.",
      ]],
      ["The Milk", "lk lt sk ft", "more end blends", ["milk", "melt", "desk", "left", "belt"], [
        "I left the milk on the desk.", "The sun was hot.", "The milk got warm.",
        "My ice will melt!", "I ran fast.", "I held my belt.",
        "I got the milk off the desk.", "It did not melt at all.",
      ]],
      ["The Strong Truck", "scr spl spr str thr", "three-letter blends", ["strong", "split", "scrub", "spring", "three"], [
        "The truck is strong.", "It can pull three logs.", "A log did split.",
        "Crack! It split in two.", "Dad had to scrub the mud off.", "Scrub, scrub, scrub!",
        "In the spring the truck will help again.", "That truck is very strong.",
      ]],
      ["The Camp", "mixed", "blends everywhere", ["camp", "lamp", "stamp", "grand", "stand"], [
        "We went to camp.", "Dad held up a lamp.", "The lamp was bright.",
        "I had to stand on a stump.", "Stamp your feet!", "Stamp, stamp, stamp!",
        "It was a grand camp.", "I want to camp again next spring.",
      ]],
      ["The Best Nest", "st", "the st blend", ["best", "nest", "west", "rest", "crest"], [
        "A bird built a nest.", "It is the best nest.", "The nest sits in the west.",
        "It rests on the crest of the hill.", "The wind blows past the nest.",
        "The nest holds fast.", "Rest well, bird.", "It is the best nest in the west.",
      ]],
      ["The Lost Sock", "mixed", "blends review", ["lost", "lift", "drink", "blink", "stand"], [
        "I lost my sock!", "I had to lift the bed.", "I did not blink.",
        "I had to stand on a stool.", "There it was!", "The sock sat next to my drink.",
        "I did not spill the drink.", "I found the lost sock at last.",
      ]],
      ["The Big Splash", "all blends", "blend celebration", ["splash", "crunch", "blend", "trust", "strand"], [
        "Brent went to the pond.", "He stood on a strand of sand.",
        "Crunch went the shells under his feet.", "Trust me, said Brent.",
        "Then he made a big splash!", "Splash, splash, splash!",
        "The ducks did not trust him now.", "They swam to the far strand.",
        "Brent just had to grin.",
      ]],
    ],
  },
  {
    title: "Magic E",
    emoji: "✨",
    color: "#0ea5e9",
    soft: "#f0f9ff",
    rows: [
      ["The Cake", "a_e", "a with magic e", ["cake", "make", "bake", "take", "late"], [
        "Mom will make a cake.", "She will bake it at nine.", "Do not be late!",
        "I can take the plate.", "The cake will taste great.",
        "We will all take a slice.", "That cake was the best Mom has made.",
      ]],
      ["Jake at the Lake", "a_e", "a with magic e", ["Jake", "lake", "gate", "name", "same"], [
        "Jake went to the lake.", "He went through the gate.",
        "A duck came up to say his name.", "The duck's name was the same as his!",
        "Jake and the duck sat by the lake.", "They made a cake of sand.",
        "Jake came back to the lake the same day next week.",
      ]],
      ["The Kite", "i_e", "i with magic e", ["kite", "bite", "ride", "side", "time"], [
        "It is time to fly my kite.", "The wind will ride it high.",
        "The kite went to one side.", "Then it took a dive!",
        "A dog took a bite at the string.", "No, dog! That is mine.",
        "I had a fine time with my kite.",
      ]],
      ["Mike's Bike", "i_e", "i with magic e", ["Mike", "bike", "like", "nine", "mile"], [
        "Mike has a bike.", "Mike is nine.", "He rides a mile each day.",
        "I like to ride with Mike.", "We ride side by side.",
        "Mike can ride nine miles!", "I would like to be like Mike.",
      ]],
      ["The Stone", "o_e", "o with magic e", ["stone", "bone", "home", "hole", "rode"], [
        "I found a stone.", "It sat by a hole.", "A dog had hid a bone in the hole.",
        "I rode my bike home.", "The dog came home with me.",
        "The stone sits by my home now.", "The dog still has his bone.",
      ]],
      ["Home Alone", "o_e", "o with magic e", ["home", "alone", "note", "rose", "nose"], [
        "Mom left a note at home.", "I was home alone.",
        "The note said: smell the rose.", "I put my nose close to the rose.",
        "It smelled so sweet!", "I wrote a note back to Mom.",
        "Home alone is fine when there is a rose.",
      ]],
      ["The Cute Mule", "u_e", "u with magic e", ["cute", "mule", "tube", "cube", "huge"], [
        "I have a cute mule.", "The mule is huge.", "She drinks from a tube.",
        "I give her a cube of ice.", "The huge mule thinks it is a treat.",
        "That cute mule makes me smile.", "A huge mule can be cute too!",
      ]],
      ["June's Tune", "u_e", "u with magic e", ["June", "tune", "rule", "flute", "use"], [
        "June can use a flute.", "She plays a sweet tune.",
        "The rule is: play at home.", "June broke the rule just once.",
        "She played her flute at the lake!", "The ducks liked the tune.",
        "Now the rule is: play for the ducks.",
      ]],
      ["Pete and Steve", "e_e", "e with magic e", ["Pete", "Steve", "these", "here", "eve"], [
        "Pete and Steve are here.", "These are their bikes.",
        "On the eve of the race they rode and rode.", "These two will not quit!",
        "Here comes the race.", "Pete and Steve rode side by side.",
        "These friends both won.",
      ]],
      ["The Race", "a_e i_e o_e u_e", "magic e celebration", ["race", "chase", "shine", "those", "grade"], [
        "It was race day.", "The sun did shine.", "Those five kids lined up.",
        "Ready, set, chase!", "They raced up the grade of the hill.",
        "Jane came home first.", "Those kids all got a prize.",
        "What a fine race it was!",
      ]],
    ],
  },
];
