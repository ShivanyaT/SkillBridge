import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
          className={cn(
            "absolute w-full h-full backface-hidden transition-all duration-300",
            "!bg-blue-50 !border-blue-200 shadow-lg",
            isFlipped ? 'opacity-0' : 'opacity-100'
          )}
          style={{ '--tw-bg-opacity': '1', '--card-background': 'rgb(239 246 255)' } as React.CSSProperties}
        >
          <CardContent className="flex flex-col justify-between h-full p-6">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 font-medium">Card {index + 1}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                  {flashcard.subject}
                </span>
              </div>
              <div className="mt-6 flex items-center justify-center h-[130px] text-lg text-blue-800">
                {flashcard.question}
              </div>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={handleFlip} 
                className="w-full mt-4 bg-blue-100 hover:bg-blue-200 text-blue-600 border-blue-200"
              >
                Show Answer
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Answer Side */}
        <Card 
          className={cn(
            "absolute w-full h-full backface-hidden transition-all duration-300 rotate-y-180",
            "!bg-orange-50 !border-orange-200 shadow-lg",
            isFlipped ? 'opacity-100' : 'opacity-0'
          )}
          style={{ '--tw-bg-opacity': '1', '--card-background': 'rgb(255 247 237)' } as React.CSSProperties}
        >
          <CardContent className="flex flex-col justify-between h-full p-6">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-orange-600 font-medium">Answer</span>
                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-600 font-medium">
                  {flashcard.subject}
                </span>
              </div>
              <div className="mt-6 flex items-center justify-center h-[130px] text-lg text-orange-800">
                {flashcard.answer}
              </div>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={handleFlip} 
                className="w-full mt-4 bg-orange-100 hover:bg-orange-200 text-orange-600 border-orange-200"
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
