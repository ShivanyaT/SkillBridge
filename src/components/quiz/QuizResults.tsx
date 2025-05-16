
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizResultsProps {
  score: number;
  total: number;
  onReset: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ score, total, onReset }) => {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
          <div className="text-5xl font-bold mb-4 gradient-text">{score} / {total}</div>
          <p className="mb-6 text-muted-foreground">
            {score === total 
              ? 'Perfect score! Amazing job!' 
              : score >= total / 2 
                ? 'Well done! Keep practicing to improve.'
                : 'Keep practicing. You\'ll do better next time!'}
          </p>
          <Button 
            onClick={onReset} 
            className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90"
          >
            Try Another Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResults;
