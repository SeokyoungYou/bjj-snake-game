const quotes = [
  "A black belt is a white belt who never gave up.",
  "In BJJ, it's not about how many times you tap, but how many times you get back up.",
  "The road to black belt is paved with white belts who quit.",
  "Every expert was once a beginner.",
  "Jiu-jitsu is not about being better than someone else, it's about being better than you used to be.",
  "The more you sweat in training, the less you bleed in battle.",
  "A belt only covers two inches of your waist. You have to cover the rest.",
  "It's not who's good, it's who's left.",
  "The hardest belt to earn is the white belt. It takes the most courage to step on the mat for the first time.",
  "Jiu-jitsu is human chess. Every move has a counter-move.",
];

export const getRandomQuotes = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
