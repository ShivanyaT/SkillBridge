
import React from 'react';
import { Button } from '@/components/ui/button';
import QuizQuestion, { QuizQuestion as QuizQuestionType } from '@/components/quiz/QuizQuestion';
import QuizResults from '@/components/quiz/QuizResults';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';

interface QuizContentProps {
  questions: QuizQuestionType[];
  isLoading: boolean;
  isSubmitted: boolean;
  selectedOptions: Record<string, string>;
  score: number | null;
  onSelectOption: (questionId: string, optionId: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({
  questions,
  isLoading,
  isSubmitted,
  selectedOptions,
  score,
  onSelectOption,
  onSubmit,
  onReset
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-lg">Generating quiz...</span>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-lg mb-2">No quiz available</div>
        <p className="text-muted-foreground">Select a subject and generate a quiz to start</p>
      </div>
    );
  }

  return (
    <div>
      {questions.map((question, index) => (
        <QuizQuestion 
          key={question.id} 
          question={question} 
          selectedOption={selectedOptions[question.id] || null}
          onSelectOption={(optionId) => onSelectOption(question.id, optionId)}
          isSubmitted={isSubmitted}
          questionNumber={index + 1}
        />
      ))}
      
      {isSubmitted ? (
        <QuizResults score={score || 0} total={questions.length} onReset={onReset} />
      ) : (
        <div className="flex justify-center mt-6 mb-8">
          <Button 
            onClick={onSubmit} 
            className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90 px-8"
            size="lg"
          >
            Submit Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizContent;
