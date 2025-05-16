
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FlipHorizontal } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FlashcardData {
  question: string;
  answer: string;
}

const flashcardsData = {
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

const Flashcards: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [subject, setSubject] = useState<keyof typeof flashcardsData>('Python');
  const navigate = useNavigate();

  const subjects = Object.keys(flashcardsData) as Array<keyof typeof flashcardsData>;

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container max-w-5xl mx-auto p-4">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <p className="text-muted-foreground">Review and learn with interactive flashcards.</p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-64">
              <label htmlFor="subject-select" className="block text-sm font-medium mb-2">
                Select Subject
              </label>
              <Select
                value={subject}
                onValueChange={(value) => setSubject(value as keyof typeof flashcardsData)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((sub) => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {flashcardsData[subject].map((flashcard, index) => (
          <FlashcardItem 
            key={index} 
            flashcard={flashcard} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

interface FlashcardItemProps {
  flashcard: FlashcardData;
  index: number;
}

const FlashcardItem: React.FC<FlashcardItemProps> = ({ flashcard, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div className="h-[220px] perspective-1000">
      <div 
        className={`relative w-full h-full transition-all duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Question Side */}
        <Card 
          className={`absolute w-full h-full ${
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
          }}
        >
          <CardContent className="flex flex-col justify-between h-full p-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Card {index + 1}</div>
              <div className="mt-2 text-lg font-medium">
                {flashcard.question}
              </div>
            </div>
            <Button 
              onClick={handleFlip} 
              className="mt-4"
              variant="outline"
            >
              <FlipHorizontal className="mr-2 h-4 w-4" />
              Show Answer
            </Button>
          </CardContent>
        </Card>
        
        {/* Answer Side */}
        <Card 
          className={`absolute w-full h-full ${
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ 
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <CardContent className="flex flex-col justify-between h-full p-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Answer</div>
              <div className="mt-2 text-lg font-medium">
                {flashcard.answer}
              </div>
            </div>
            <Button 
              onClick={handleFlip} 
              className="mt-4"
              variant="outline"
            >
              <FlipHorizontal className="mr-2 h-4 w-4" />
              Show Question
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Flashcards;
