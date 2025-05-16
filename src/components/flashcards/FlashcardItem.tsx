
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
}

interface FlashcardItemProps {
  flashcard: Flashcard;
  index: number;
}

const FlashcardItem: React.FC<FlashcardItemProps> = ({
  flashcard,
  index
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div className="relative h-[250px] w-full perspective-1000">
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Question Side */}
        <Card 
          className={`absolute w-full h-full backface-hidden transition-all duration-300 ${
            isFlipped ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <CardContent className="flex flex-col justify-between h-full p-6">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Card {index + 1}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                  {flashcard.subject}
                </span>
              </div>
              <div className="mt-6 flex items-center justify-center h-[130px] text-lg">
                {flashcard.question}
              </div>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={handleFlip} 
                variant="outline" 
                className="w-full mt-4"
              >
                Show Answer
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Answer Side */}
        <Card 
          className={`absolute w-full h-full backface-hidden transition-all duration-300 rotate-y-180 ${
            isFlipped ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CardContent className="flex flex-col justify-between h-full p-6">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Answer</span>
                <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                  {flashcard.subject}
                </span>
              </div>
              <div className="mt-6 flex items-center justify-center h-[130px] text-lg">
                {flashcard.answer}
              </div>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={handleFlip} 
                variant="outline" 
                className="w-full mt-4"
              >
                Show Question
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlashcardItem;
