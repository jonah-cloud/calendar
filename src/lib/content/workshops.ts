export interface Workshop {
  id: string;
  title: string;
  emoji: string;
  category: string;
  desc: string;
  bucks: number;
}

/**
 * Afternoon "life skills" quests, inspired by Alpha School's workshop program
 * (World Changers lemonade stand, Street Speak interviews, the K-4 triathlon
 * challenge, financial literacy, public speaking, grit).
 */
export const WORKSHOPS: Workshop[] = [
  { id: "lemonade", title: "Lemonade Stand Boss", emoji: "🍋", category: "Entrepreneurship", desc: "Plan, price, and run a lemonade (or cocoa) stand. Count your money and decide what to donate!", bucks: 75 },
  { id: "tedtalk", title: "Dinner-Table TED Talk", emoji: "🎤", category: "Public Speaking", desc: "Pick a topic you love and give a 2-minute talk at dinner. Stand up, speak clearly, take one question!", bucks: 40 },
  { id: "interview", title: "Star Reporter", emoji: "🎙️", category: "Public Speaking", desc: "Interview a grown-up about their job or childhood. Ask 5 questions and share the coolest answer.", bucks: 35 },
  { id: "teach", title: "Be the Teacher", emoji: "🧑‍🏫", category: "Leadership", desc: "Teach your sister (or a parent) a skill you have — a dance move, a math trick, a song.", bucks: 35 },
  { id: "triathlon", title: "Spark Triathlon", emoji: "🏅", category: "Grit", desc: "Three challenges: 10 cartwheels or jumping jacks, balance on one foot for 30 seconds, and run around the block!", bucks: 50 },
  { id: "budget", title: "Grocery Math Mission", emoji: "🛒", category: "Money Smarts", desc: "Get a $10 pretend budget at the store. Add up items as you shop and stay under budget.", bucks: 45 },
  { id: "savings", title: "Savings Goal Setter", emoji: "🏦", category: "Money Smarts", desc: "Pick something to save for. Make a chart, decide how many Bucks or dollars per week, and start!", bucks: 40 },
  { id: "cook", title: "Junior Chef Night", emoji: "🧑‍🍳", category: "Life Skills", desc: "Help plan and cook one family meal. Read the recipe, measure ingredients, set the table.", bucks: 50 },
  { id: "thankyou", title: "Thank-You Mission", emoji: "💌", category: "Kindness", desc: "Write and deliver a real thank-you note to someone who helped you this week.", bucks: 25 },
  { id: "kindness", title: "Secret Kindness Agent", emoji: "🕵️‍♀️", category: "Kindness", desc: "Do 3 secret kind things today without getting caught. Report your missions at bedtime!", bucks: 30 },
  { id: "plant", title: "Grow Something", emoji: "🌱", category: "Science in Action", desc: "Plant a seed, water it, and check it every day. Draw what you see each week.", bucks: 35 },
  { id: "fixit", title: "Fix-It Crew", emoji: "🔧", category: "Life Skills", desc: "Help fix or build something real with tools — tighten a screw, build a shelf, pump bike tires.", bucks: 40 },
  { id: "library", title: "Library Quest", emoji: "📚", category: "Curiosity", desc: "Go to the library and find a book about something you've NEVER read about before. Read it!", bucks: 30 },
  { id: "gamenight", title: "Game Night Host", emoji: "🎲", category: "Leadership", desc: "Pick the game, explain the rules to everyone, and be a great sport — win or lose.", bucks: 30 },
  { id: "showtime", title: "Family Showtime", emoji: "🎭", category: "Public Speaking", desc: "Put on a show — a dance, gymnastics routine, song, or play. Make tickets and take a bow!", bucks: 45 },
];
