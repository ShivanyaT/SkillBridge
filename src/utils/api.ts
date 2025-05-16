
import { useToast } from '@/hooks/use-toast';
import { Flashcard } from '@/components/flashcards/FlashcardItem';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { v4 as uuidv4 } from '@/utils/mockUuid';

// Fallback flashcards in case the API calls fail
export const fallbackFlashcards: Record<string, Flashcard[]> = {
  'Python': [
    {
      id: '1',
      question: 'What is a variable in Python?',
      answer: 'A variable is a named location that stores data in memory.',
      subject: 'Python'
    },
    {
      id: '2',
      question: 'How do you create a list in Python?',
      answer: 'You can create a list using square brackets, e.g., my_list = [1, 2, 3]',
      subject: 'Python'
    },
    {
      id: '3',
      question: 'What is a function in Python?',
      answer: 'A function is a block of reusable code that performs a specific task.',
      subject: 'Python'
    },
    {
      id: '4',
      question: 'How do you comment code in Python?',
      answer: 'Use the # symbol for single-line comments and triple quotes for multi-line comments.',
      subject: 'Python'
    },
    {
      id: '5',
      question: 'What is a dictionary in Python?',
      answer: 'A dictionary is a collection of key-value pairs that are unordered, changeable, and indexed.',
      subject: 'Python'
    }
  ],
  'Maths': [
    {
      id: '1',
      question: 'What is the Pythagorean theorem?',
      answer: 'The Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse is equal to the sum of squares of the other two sides: a² + b² = c².',
      subject: 'Maths'
    },
    {
      id: '2',
      question: 'What is a prime number?',
      answer: 'A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers.',
      subject: 'Maths'
    },
    {
      id: '3',
      question: 'What is the formula for the area of a circle?',
      answer: 'The area of a circle is calculated using the formula: A = πr², where r is the radius of the circle.',
      subject: 'Maths'
    },
    {
      id: '4',
      question: 'What is the derivative of sin(x)?',
      answer: 'The derivative of sin(x) is cos(x).',
      subject: 'Maths'
    },
    {
      id: '5',
      question: 'What is a logarithm?',
      answer: 'A logarithm is the power to which a base must be raised to produce a given number.',
      subject: 'Maths'
    }
  ],
  'English': [
    {
      id: '1',
      question: 'What is a noun?',
      answer: 'A noun is a word that names a person, place, thing, or idea.',
      subject: 'English'
    },
    {
      id: '2',
      question: 'What is a verb?',
      answer: 'A verb is a word that expresses an action, occurrence, or state of being.',
      subject: 'English'
    },
    {
      id: '3',
      question: 'What is an adjective?',
      answer: 'An adjective is a word that describes or modifies a noun or pronoun.',
      subject: 'English'
    },
    {
      id: '4',
      question: 'What is a metaphor?',
      answer: 'A metaphor is a figure of speech that directly compares two different things without using "like" or "as".',
      subject: 'English'
    },
    {
      id: '5',
      question: 'What is alliteration?',
      answer: 'Alliteration is the occurrence of the same letter or sound at the beginning of adjacent or closely connected words.',
      subject: 'English'
    }
  ]
};

// Fallback quiz questions
export const fallbackQuizzes: Record<string, QuizQuestion[]> = {
  'Python': [
    {
      id: '1',
      question: 'What is the output of print(2 + 2)?',
      options: [
        { id: 'a', text: '4', isCorrect: true },
        { id: 'b', text: '22', isCorrect: false },
        { id: 'c', text: 'Error', isCorrect: false },
        { id: 'd', text: 'None', isCorrect: false }
      ],
      subject: 'Python'
    },
    {
      id: '2',
      question: 'Which of the following is NOT a Python data type?',
      options: [
        { id: 'a', text: 'List', isCorrect: false },
        { id: 'b', text: 'Dictionary', isCorrect: false },
        { id: 'c', text: 'Array', isCorrect: true },
        { id: 'd', text: 'Tuple', isCorrect: false }
      ],
      subject: 'Python'
    },
    {
      id: '3',
      question: 'What does the "len()" function do in Python?',
      options: [
        { id: 'a', text: 'Returns the length of a string', isCorrect: true },
        { id: 'b', text: 'Returns the absolute value', isCorrect: false },
        { id: 'c', text: 'Returns the largest item', isCorrect: false },
        { id: 'd', text: 'Returns the smallest item', isCorrect: false }
      ],
      subject: 'Python'
    },
    {
      id: '4',
      question: 'How do you create a function in Python?',
      options: [
        { id: 'a', text: 'function myFunc():', isCorrect: false },
        { id: 'b', text: 'def myFunc():', isCorrect: true },
        { id: 'c', text: 'create myFunc():', isCorrect: false },
        { id: 'd', text: 'func myFunc():', isCorrect: false }
      ],
      subject: 'Python'
    },
    {
      id: '5',
      question: 'What symbol is used for comments in Python?',
      options: [
        { id: 'a', text: '//', isCorrect: false },
        { id: 'b', text: '/*', isCorrect: false },
        { id: 'c', text: '--', isCorrect: false },
        { id: 'd', text: '#', isCorrect: true }
      ],
      subject: 'Python'
    }
  ],
  'Maths': [
    {
      id: '1',
      question: 'What is the value of π (pi) to two decimal places?',
      options: [
        { id: 'a', text: '3.14', isCorrect: true },
        { id: 'b', text: '3.15', isCorrect: false },
        { id: 'c', text: '3.16', isCorrect: false },
        { id: 'd', text: '3.12', isCorrect: false }
      ],
      subject: 'Maths'
    },
    {
      id: '2',
      question: 'Which of these numbers is a prime number?',
      options: [
        { id: 'a', text: '9', isCorrect: false },
        { id: 'b', text: '15', isCorrect: false },
        { id: 'c', text: '21', isCorrect: false },
        { id: 'd', text: '23', isCorrect: true }
      ],
      subject: 'Maths'
    },
    {
      id: '3',
      question: 'What is the result of 5² + 3²?',
      options: [
        { id: 'a', text: '34', isCorrect: false },
        { id: 'b', text: '64', isCorrect: false },
        { id: 'c', text: '25', isCorrect: false },
        { id: 'd', text: '34', isCorrect: true }
      ],
      subject: 'Maths'
    },
    {
      id: '4',
      question: 'If a + b = 10 and a - b = 4, what is a × b?',
      options: [
        { id: 'a', text: '21', isCorrect: true },
        { id: 'b', text: '24', isCorrect: false },
        { id: 'c', text: '16', isCorrect: false },
        { id: 'd', text: '14', isCorrect: false }
      ],
      subject: 'Maths'
    },
    {
      id: '5',
      question: 'What is the slope of a line with points (2, 3) and (4, 7)?',
      options: [
        { id: 'a', text: '1', isCorrect: false },
        { id: 'b', text: '2', isCorrect: true },
        { id: 'c', text: '3', isCorrect: false },
        { id: 'd', text: '4', isCorrect: false }
      ],
      subject: 'Maths'
    }
  ],
  'English': [
    {
      id: '1',
      question: 'Which of the following is a proper noun?',
      options: [
        { id: 'a', text: 'City', isCorrect: false },
        { id: 'b', text: 'Dog', isCorrect: false },
        { id: 'c', text: 'London', isCorrect: true },
        { id: 'd', text: 'Building', isCorrect: false }
      ],
      subject: 'English'
    },
    {
      id: '2',
      question: 'Which word is an adverb in the sentence: "She ran quickly to catch the bus"?',
      options: [
        { id: 'a', text: 'She', isCorrect: false },
        { id: 'b', text: 'ran', isCorrect: false },
        { id: 'c', text: 'quickly', isCorrect: true },
        { id: 'd', text: 'catch', isCorrect: false }
      ],
      subject: 'English'
    },
    {
      id: '3',
      question: 'What is the plural form of "child"?',
      options: [
        { id: 'a', text: 'childs', isCorrect: false },
        { id: 'b', text: 'childes', isCorrect: false },
        { id: 'c', text: 'children', isCorrect: true },
        { id: 'd', text: 'childen', isCorrect: false }
      ],
      subject: 'English'
    },
    {
      id: '4',
      question: 'Which of these sentences contains a simile?',
      options: [
        { id: 'a', text: 'The tree stood tall in the garden.', isCorrect: false },
        { id: 'b', text: 'Her eyes were diamonds, sparkling in the light.', isCorrect: false },
        { id: 'c', text: 'He ran like the wind.', isCorrect: true },
        { id: 'd', text: 'The sun rose slowly over the horizon.', isCorrect: false }
      ],
      subject: 'English'
    },
    {
      id: '5',
      question: 'What is the past tense of "go"?',
      options: [
        { id: 'a', text: 'goed', isCorrect: false },
        { id: 'b', text: 'went', isCorrect: true },
        { id: 'c', text: 'gone', isCorrect: false },
        { id: 'd', text: 'going', isCorrect: false }
      ],
      subject: 'English'
    }
  ]
};

// Helper function to mock UUID generation
export function mockUuid() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Mock API call to generate flashcards
export const generateFlashcards = async (
  subject: string,
): Promise<Flashcard[]> => {
  const { toast } = useToast();
  
  try {
    // In a real app, this would call the OpenAI API
    // const response = await fetch('https://api.openai.com/v1/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4o",
    //     messages: [
    //       {
    //         role: "user",
    //         content: `Generate 5 flashcards for beginner-level ${subject}. Each flashcard should have a 'question' and an 'answer'.`
    //       }
    //     ]
    //   })
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return fallback data
    return fallbackFlashcards[subject].map(card => ({
      ...card,
      id: mockUuid()
    }));
  } catch (error) {
    toast({
      title: "Failed to generate flashcards",
      description: "Using fallback cards instead.",
      variant: "destructive",
    });
    
    return fallbackFlashcards[subject];
  }
};

// Mock API call to generate quiz
export const generateQuiz = async (
  subject: string,
): Promise<QuizQuestion[]> => {
  const { toast } = useToast();
  
  try {
    // In a real app, this would call the OpenAI API
    // const response = await fetch('https://api.openai.com/v1/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4o",
    //     messages: [
    //       {
    //         role: "user",
    //         content: `Generate 5 beginner-level multiple-choice questions for ${subject}. Each should have 4 options and specify the correct answer.`
    //       }
    //     ]
    //   })
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return fallback data
    return fallbackQuizzes[subject].map(quiz => ({
      ...quiz,
      id: mockUuid()
    }));
  } catch (error) {
    toast({
      title: "Failed to generate quiz",
      description: "Using fallback quiz instead.",
      variant: "destructive",
    });
    
    return fallbackQuizzes[subject];
  }
};
