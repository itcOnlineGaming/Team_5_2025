// src/lib/data/typingChallenges.ts
import type { TypingChallenge, Room } from '$lib/types/game';

export const typingChallenges: Record<Room, TypingChallenge[]> = {
  kitchen: [
    {
      id: 'kitchen-1',
      text: 'Cooking is one of life\'s greatest pleasures. The aroma of fresh herbs and spices fills the kitchen as you prepare a delicious meal.',
      difficulty: 'medium',
      category: 'cooking',
      room: 'kitchen'
    },
    {
      id: 'kitchen-2',
      text: 'Mix flour, eggs, and milk to create the perfect pancake batter. Heat the pan and watch as golden circles form before your eyes.',
      difficulty: 'easy',
      category: 'recipes',
      room: 'kitchen'
    },
    {
      id: 'kitchen-3',
      text: 'The secret to great pasta is timing. Al dente means firm to the bite, achieved by cooking the pasta for exactly the right amount of time.',
      difficulty: 'hard',
      category: 'cooking',
      room: 'kitchen'
    },
    {
      id: 'kitchen-4',
      text: 'Chop onions slowly to avoid tears. Keep the knife sharp and cut away from your fingers for maximum safety in the kitchen.',
      difficulty: 'medium',
      category: 'cooking tips',
      room: 'kitchen'
    },
    {
      id: 'kitchen-5',
      text: 'Fresh bread straight from the oven fills the house with warmth and comfort.',
      difficulty: 'easy',
      category: 'baking',
      room: 'kitchen'
    }
  ],
  
  'living-room': [
    {
      id: 'living-1',
      text: 'The living room is where families gather to share stories, watch movies, and create lasting memories together.',
      difficulty: 'medium',
      category: 'entertainment',
      room: 'living-room'
    },
    {
      id: 'living-2',
      text: 'Turn on the television and settle into your favorite armchair. Tonight\'s movie promises adventure and excitement.',
      difficulty: 'easy',
      category: 'relaxation',
      room: 'living-room'
    },
    {
      id: 'living-3',
      text: 'Reading a good book by the fireplace is one of winter\'s simple pleasures. The crackling flames provide both warmth and ambiance.',
      difficulty: 'hard',
      category: 'reading',
      room: 'living-room'
    },
    {
      id: 'living-4',
      text: 'Board games bring people together across generations. Strategy, luck, and laughter combine for perfect entertainment.',
      difficulty: 'medium',
      category: 'games',
      room: 'living-room'
    },
    {
      id: 'living-5',
      text: 'Music fills the room with joy and energy, making everyone want to dance.',
      difficulty: 'easy',
      category: 'music',
      room: 'living-room'
    }
  ],
  
  bathroom: [
    {
      id: 'bathroom-1',
      text: 'A hot shower after a long day washes away stress and fatigue, leaving you feeling refreshed and renewed.',
      difficulty: 'medium',
      category: 'hygiene',
      room: 'bathroom'
    },
    {
      id: 'bathroom-2',
      text: 'Brush your teeth twice daily to maintain healthy gums and prevent cavities from forming over time.',
      difficulty: 'easy',
      category: 'dental care',
      room: 'bathroom'
    },
    {
      id: 'bathroom-3',
      text: 'Skincare routines require consistency and patience. Gentle cleansing followed by moisturizing keeps skin healthy and glowing.',
      difficulty: 'hard',
      category: 'skincare',
      room: 'bathroom'
    },
    {
      id: 'bathroom-4',
      text: 'Clean towels and fresh soap make the bathroom feel like a personal spa retreat every single day.',
      difficulty: 'medium',
      category: 'cleanliness',
      room: 'bathroom'
    },
    {
      id: 'bathroom-5',
      text: 'Wash your hands frequently to stay healthy and clean.',
      difficulty: 'easy',
      category: 'hygiene',
      room: 'bathroom'
    }
  ],
  
  bedroom: [
    {
      id: 'bedroom-1',
      text: 'A comfortable bed with soft pillows and warm blankets creates the perfect environment for restful sleep and peaceful dreams.',
      difficulty: 'medium',
      category: 'sleep',
      room: 'bedroom'
    },
    {
      id: 'bedroom-2',
      text: 'Eight hours of sleep helps your body recover and your mind process the events of the day.',
      difficulty: 'easy',
      category: 'rest',
      room: 'bedroom'
    },
    {
      id: 'bedroom-3',
      text: 'Meditation before bedtime calms the mind and prepares the body for deep, restorative sleep that lasts through the night.',
      difficulty: 'hard',
      category: 'relaxation',
      room: 'bedroom'
    },
    {
      id: 'bedroom-4',
      text: 'Organizing your closet and keeping the bedroom tidy promotes better sleep and reduces morning stress significantly.',
      difficulty: 'medium',
      category: 'organization',
      room: 'bedroom'
    },
    {
      id: 'bedroom-5',
      text: 'Sweet dreams come to those who create a peaceful sleeping space.',
      difficulty: 'easy',
      category: 'sleep',
      room: 'bedroom'
    }
  ],
  
  outside: [
    {
      id: 'outside-1',
      text: 'Fresh air and sunshine provide natural energy and vitamin D, essential for both physical and mental well-being.',
      difficulty: 'medium',
      category: 'nature',
      room: 'outside'
    },
    {
      id: 'outside-2',
      text: 'Walking in the park helps clear your mind and gets your body moving in a healthy way.',
      difficulty: 'easy',
      category: 'exercise',
      room: 'outside'
    },
    {
      id: 'outside-3',
      text: 'Gardening connects us with nature\'s cycles and provides the satisfaction of nurturing life from seed to bloom.',
      difficulty: 'hard',
      category: 'gardening',
      room: 'outside'
    },
    {
      id: 'outside-4',
      text: 'Playing sports outdoors combines exercise with fresh air, creating the perfect recipe for physical fitness.',
      difficulty: 'medium',
      category: 'sports',
      room: 'outside'
    },
    {
      id: 'outside-5',
      text: 'Birds sing and flowers bloom in the beautiful outdoors.',
      difficulty: 'easy',
      category: 'nature',
      room: 'outside'
    }
  ]
};

export function getRandomChallenge(room: Room): TypingChallenge {
  const roomChallenges = typingChallenges[room];
  const randomIndex = Math.floor(Math.random() * roomChallenges.length);
  return roomChallenges[randomIndex];
}

export function getChallengesByDifficulty(room: Room, difficulty: 'easy' | 'medium' | 'hard'): TypingChallenge[] {
  return typingChallenges[room].filter(challenge => challenge.difficulty === difficulty);
}

export function getAllChallenges(): TypingChallenge[] {
  return Object.values(typingChallenges).flat();
}