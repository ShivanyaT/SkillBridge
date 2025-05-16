
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface QuizSettingsProps {
  subject: string;
  subjects: string[];
  isLoading: boolean;
  onSubjectChange: (value: string) => void;
  onGenerateQuiz: () => void;
}

const QuizSettings: React.FC<QuizSettingsProps> = ({
  subject,
  subjects,
  isLoading,
  onSubjectChange,
  onGenerateQuiz
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Quiz Settings</CardTitle>
        <CardDescription>Choose a subject and start your quiz</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-64">
            <Select
              value={subject}
              onValueChange={onSubjectChange}
              disabled={isLoading}
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
          <Button 
            onClick={onGenerateQuiz} 
            className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
            Generate New Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizSettings;
