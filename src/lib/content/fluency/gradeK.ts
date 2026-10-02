import type { GradeDef } from "./types";

/** Kindergarten: letter sounds into simple CVC sentences. 10–34 words. */
export const GRADE_K: GradeDef = {
  id: "K",
  label: "Kindergarten",
  emoji: "🌱",
  color: "#f59e0b",
  soft: "#fffbeb",
  wcpm: { fall: 5, winter: 12, spring: 28 },
  units: [
    { title: "First Sounds", weeks: [
      ["Letters m, s, a", ["am", "at", "a", "mat", "sat"], ["I", "the", "is", "on", "see"], [
        "I am Sam.", "I see a mat.", "I sat on the mat.", "The mat is tan.",
      ]],
      ["Letters t, p, n", ["tap", "nap", "pat", "pan", "tan"], ["a", "I", "can", "it", "the"], [
        "I can tap.", "Tap, tap, tap!", "I can nap.", "I nap on a mat.", "The nap is nice.",
      ]],
      ["Short a words", ["cat", "hat", "bat", "sat", "mat"], ["the", "a", "is", "on", "my"], [
        "The cat is tan.", "My cat has a hat.", "The cat sat on a mat.", "I see my cat.",
      ]],
    ]},
    { title: "Short A", weeks: [
      ["-at words", ["cat", "bat", "hat", "rat", "sat"], ["the", "a", "is", "see", "and"], [
        "I see a cat and a rat.", "The cat has a hat.", "The rat sat.", "The cat sat.",
        "A cat and a rat!",
      ]],
      ["-an and -ap", ["can", "man", "pan", "map", "nap"], ["the", "a", "has", "is", "to"], [
        "The man has a map.", "The map is in a pan.", "The man can nap.",
        "I can see the map.", "The man has a nap.",
      ]],
      ["-ad and -ag", ["bag", "tag", "dad", "had", "sad"], ["my", "a", "is", "the", "not"], [
        "My dad had a bag.", "The bag has a tag.", "Dad is not sad.",
        "I had the bag.", "My dad is glad.",
      ]],
    ]},
    { title: "Short I", weeks: [
      ["-it and -ig", ["sit", "pit", "big", "pig", "dig"], ["the", "a", "is", "can", "in"], [
        "The pig is big.", "The big pig can dig.", "The pig can sit in a pit.",
        "I see the big pig.", "The pig is in the pit.",
      ]],
      ["-in and -ip", ["pin", "win", "tip", "lip", "rip"], ["the", "a", "can", "I", "did"], [
        "I can win a pin.", "The pin did not rip.", "I did win!",
        "The pin is on my cap.", "I can win and win.",
      ]],
      ["-id and -ix", ["did", "hid", "lid", "six", "fix"], ["the", "a", "I", "can", "it"], [
        "I hid six caps.", "Dad did not see.", "The lid is on it.",
        "Can I fix the lid?", "I did fix it!",
      ]],
    ]},
    { title: "Short O", weeks: [
      ["-ot and -op", ["hot", "pot", "got", "top", "hop"], ["the", "is", "a", "on", "not"], [
        "The pot is hot.", "Do not sit on the pot.", "Mom got a top.",
        "The top is on the pot.", "I can hop to the pot.",
      ]],
      ["-og and -ox", ["dog", "log", "fog", "box", "fox"], ["the", "a", "in", "is", "and"], [
        "The dog sat on a log.", "A fox is in the box.", "The fog is on the log.",
        "The dog and the fox ran.", "The box is not big.",
      ]],
      ["-ob and -od", ["job", "rob", "mob", "nod", "rod"], ["a", "the", "did", "is", "my"], [
        "My dad had a job.", "The job is big.", "Dad did nod.",
        "The rod is in the box.", "Dad did the job.",
      ]],
    ]},
    { title: "Short E", weeks: [
      ["-et and -en", ["get", "net", "pet", "hen", "ten"], ["the", "a", "my", "can", "is"], [
        "My pet is a hen.", "I can get the hen.", "The hen is in a pen.",
        "Ten hens! I can get a net.", "My pet hen is big.",
      ]],
      ["-ed and -eg", ["bed", "red", "fed", "led", "leg"], ["my", "the", "is", "on", "a"], [
        "My bed is red.", "I fed my pet on the bed.", "The pet led me to the bed.",
        "My leg is on the red bed.", "The bed is big and red.",
      ]],
      ["Short e review", ["men", "yes", "wet", "set", "den"], ["the", "is", "a", "can", "said"], [
        "Ten men ran to the den.", "The den is wet.", "Can the men get in?",
        "Yes! said the men.", "The men set a net in the den.",
      ]],
    ]},
    { title: "Short U", weeks: [
      ["-ug and -un", ["bug", "rug", "hug", "sun", "run"], ["the", "a", "is", "in", "can"], [
        "A bug is on the rug.", "The bug can run.", "The sun is hot.",
        "I can run in the sun.", "I can hug my mom.",
      ]],
      ["-ut and -up", ["cut", "nut", "but", "cup", "pup"], ["a", "the", "is", "my", "has"], [
        "My pup has a cup.", "The cup has a nut.", "The pup did not cut it.",
        "My pup is fun.", "The pup has the cup and the nut.",
      ]],
      ["-ub and -um", ["tub", "rub", "cub", "hum", "gum"], ["the", "is", "in", "can", "a"], [
        "The cub is in the tub.", "I rub the cub.", "The cub can hum.",
        "Mom has gum.", "The cub is not in the tub now.",
      ]],
    ]},
    { title: "All Five Vowels", weeks: [
      ["Mixed CVC", ["cat", "pig", "dog", "pup", "hen"], ["the", "a", "has", "and", "my"], [
        "My mom has ten pets.", "She has a cat and a pig.", "She has a dog and a pup.",
        "The hen is in a pen.", "I can see all my pets.", "Ten pets is a lot!",
      ]],
      ["Words with -s", ["cats", "pigs", "dogs", "hats", "bugs"], ["the", "are", "my", "see", "two"], [
        "I see two cats.", "The cats are tan.", "I see two pigs.",
        "The pigs are big.", "My dogs run and run.", "I can see six bugs!",
      ]],
      ["CVC review", ["man", "bed", "top", "fish", "sun"], ["the", "is", "a", "has", "on"], [
        "The man has a bed.", "The bed is red.", "A top is on the bed.",
        "The sun is up.", "The man is up.", "The man and I run in the sun.",
      ]],
    ]},
    { title: "First Digraphs", weeks: [
      ["sh", ["ship", "shop", "fish", "dish", "shut"], ["the", "a", "in", "is", "to"], [
        "I see a ship.", "The ship is big.", "A fish is in a dish.",
        "I shut the shop.", "The ship is in the fog.", "I can see the fish.",
      ]],
      ["ch", ["chip", "chin", "chop", "much", "chat"], ["the", "a", "has", "is", "and"], [
        "Dad has a chip.", "The chip is on his chin!", "Dad can chop.",
        "Chop, chop, chop!", "We chat and chat.", "That is too much!",
      ]],
      ["th", ["this", "that", "the", "with", "thin"], ["is", "a", "I", "can", "see"], [
        "This is a cat.", "That is a dog.", "I can see this and that.",
        "The cat is thin.", "I can run with the dog.", "This is fun!",
      ]],
    ]},
    { title: "First Blends", weeks: [
      ["s-blends", ["stop", "spin", "snap", "skip", "swim"], ["the", "can", "I", "and", "to"], [
        "I can skip and skip.", "I can spin.", "Stop! said Mom.",
        "I can swim to the dock.", "Snap! went the stick.", "I can swim and skip.",
      ]],
      ["l-blends", ["flag", "flat", "clap", "glad", "plan"], ["the", "is", "a", "we", "and"], [
        "We have a flag.", "The flag is flat.", "We clap and clap.",
        "I am glad.", "We have a plan.", "The plan is to run with the flag.",
      ]],
      ["r-blends", ["frog", "drop", "trip", "grin", "crab"], ["the", "a", "is", "and", "on"], [
        "A frog is on a log.", "The frog has a grin.", "Drop! went the frog.",
        "A crab ran past.", "The frog and the crab ran.", "What a trip!",
      ]],
    ]},
    { title: "Ready for First Grade", weeks: [
      ["Review: short vowels", ["cat", "pig", "dog", "pup", "bed"], ["the", "a", "is", "and", "my"], [
        "My cat sat on my bed.", "My dog ran to the log.", "My pig did dig in the mud.",
        "My pup had a nap.", "All my pets are fun.", "I love my pets a lot.",
      ]],
      ["Review: digraphs", ["ship", "fish", "chop", "this", "shut"], ["the", "a", "is", "in", "we"], [
        "We see a big ship.", "A fish is in the ship.", "This fish is red.",
        "We shut the box.", "The fish is in the box.", "We put the fish back in.",
      ]],
      ["Review: all of it", ["stop", "frog", "fish", "glad", "bugs"], ["the", "a", "and", "we", "are"], [
        "We ran to the pond.", "We see a frog and a fish.", "Bugs sit on the logs.",
        "Stop! We can see a big frog.", "The frog did a big hop.", "We are glad we came.",
      ]],
    ]},
  ],
};
