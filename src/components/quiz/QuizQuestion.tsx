
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  subject: string;
}

interface QuizQuestionProps {
  question: QuizQuestion;
  selectedOption: string | null;
  onSelectOption: (optionId: string) => void;
  isSubmitted: boolean;
  questionNumber: number;
}

const QuizQuestionComponent: React.FC<QuizQuestionProps> = ({
  question,
  selectedOption,
  onSelectOption,
  isSubmitted,
  questionNumber
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-base font-medium flex justify-between">
          <span>Question {questionNumber}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
            {question.subject}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">{question.question}</div>
        <RadioGroup 
          value={selectedOption || undefined} 
          onValueChange={onSelectOption}
          disabled={isSubmitted}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div 
              key={option.id} 
              className={`flex items-center space-x-2 rounded-md border p-3 ${
                isSubmitted && option.isCorrect 
                  ? 'border-green-500 bg-green-500/10' 
                  : isSubmitted && selectedOption === option.id && !option.isCorrect
                  ? 'border-red-500 bg-red-500/10'
                  : ''
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1">
                {option.text}
              </Label>
              {isSubmitted && option.isCorrect && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-green-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default QuizQuestionComponent;
