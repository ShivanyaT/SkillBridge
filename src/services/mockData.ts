export type Subject = 'Python' | 'Maths' | 'English';

export interface Flashcard {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const flashcardsData: Record<Subject, Flashcard[]> = {
  Python: [
    { question: "What is a list in Python?", answer: "An ordered, mutable collection of items." },
    { question: "What is a function?", answer: "A reusable block of code that performs a specific task." },
    { question: "What does 'len()' do?", answer: "Returns the number of items in an object." },
    { question: "What is a dictionary?", answer: "A collection of key-value pairs." },
    { question: "What does 'print()' do?", answer: "Displays output to the console." },
  ],
  Maths: [
    { question: "What is the Pythagorean theorem?", answer: "a² + b² = c²" },
    { question: "What is 5 × 6?", answer: "30" },
    { question: "What is a prime number?", answer: "A number divisible only by 1 and itself." },
    { question: "What is the square root of 49?", answer: "7" },
    { question: "What is the value of pi (π)?", answer: "Approximately 3.14" },
  ],
  English: [
    { question: "What is a noun?", answer: "A word that names a person, place, thing, or idea." },
    { question: "What is a metaphor?", answer: "A figure of speech that compares two things without using 'like' or 'as'." },
    { question: "What is a verb?", answer: "A word that expresses action or state." },
    { question: "What is an adjective?", answer: "A word that describes a noun." },
    { question: "What is a synonym for 'happy'?", answer: "Joyful" },
  ],
};

export const quizData: Record<Subject, QuizQuestion[]> = {
  Python: [
    {
      question: "Which of the following is a Python keyword?",
      options: ["loop", "define", "def", "func"],
      correctAnswer: "def",
    },
    {
      question: "What does 'if __name__ == \"__main__\"' mean?",
      options: [
        "Imports a module",
        "Runs code only if file is run directly",
        "Defines a main class",
        "None of the above",
      ],
      correctAnswer: "Runs code only if file is run directly",
    },
    {
      question: "What is the output of '2 ** 3'?",
      options: ["5", "6", "8", "9"],
      correctAnswer: "8",
    },
    {
      question: "Which data type is immutable?",
      options: ["List", "Set", "Dictionary", "Tuple"],
      correctAnswer: "Tuple",
    },
    {
      question: "Which of these is used for comments?",
      options: ["//", "#", "<!-- -->", "/* */"],
      correctAnswer: "#",
    },
  ],
  Maths: [
    {
      question: "What is 12 ÷ 4?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "3",
    },
    {
      question: "What is the area of a rectangle with sides 3 and 5?",
      options: ["8", "15", "10", "20"],
      correctAnswer: "15",
    },
    {
      question: "What is the next prime number after 7?",
      options: ["9", "10", "11", "13"],
      correctAnswer: "11",
    },
    {
      question: "What is 25% of 200?",
      options: ["25", "40", "50", "60"],
      correctAnswer: "50",
    },
    {
      question: "What is 2³?",
      options: ["6", "8", "9", "4"],
      correctAnswer: "8",
    },
  ],
  English: [
    {
      question: "What is the plural of 'child'?",
      options: ["childs", "children", "childes", "childer"],
      correctAnswer: "children",
    },
    {
      question: "Choose the correct verb: 'He ____ to the market yesterday.'",
      options: ["go", "goes", "went", "gone"],
      correctAnswer: "went",
    },
    {
      question: "What is the opposite of 'happy'?",
      options: ["glad", "joyful", "sad", "pleased"],
      correctAnswer: "sad",
    },
    {
      question: "Which of these is a conjunction?",
      options: ["and", "very", "quickly", "blue"],
      correctAnswer: "and",
    },
    {
      question: "What punctuation ends a question?",
      options: [".", "!", "?", ","],
      correctAnswer: "?",
    },
  ],
}; 