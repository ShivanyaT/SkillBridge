import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Loader2, Plus, Trophy } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { toast } from 'sonner';
import { quizData, type Subject } from '@/services/mockData';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer?: string;
  isSubmitted: boolean;
}

const subjects: Subject[] = ['Python', 'Maths', 'English'];

const Quiz: React.FC = () => {
  const { isConfigured } = useSettings();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | ''>('');
  const [topic, setTopic] = useState('');
  const [showResults, setShowResults] = useState(false);

  const generateQuiz = () => {
    if (!selectedSubject) return;

    const newQuestions = quizData[selectedSubject].map((q, index) => ({
      id: `${Date.now()}-${index}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      isSubmitted: false,
    }));

    setQuestions(newQuestions);
    setShowResults(false);
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (showResults) return;
    
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, selectedAnswer: answer } : q
    ));
  };

  const submitQuiz = () => {
    const allAnswered = questions.every(q => q.selectedAnswer);
    if (!allAnswered) {
      alert('Please answer all questions before submitting');
      return;
    }

    setQuestions(questions.map(q => ({ ...q, isSubmitted: true })));
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuestions([]);
    setShowResults(false);
  };

  const getScore = () => {
    const correct = questions.filter(q => q.selectedAnswer === q.correctAnswer).length;
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quiz Challenge</h1>
          <div className="flex gap-2">
            {questions.length > 0 && !showResults && (
              <Button onClick={submitQuiz}>
                Submit Quiz
              </Button>
            )}
            <Button
              onClick={questions.length > 0 ? resetQuiz : generateQuiz}
              disabled={!selectedSubject && !questions.length}
              className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90"
            >
              {questions.length > 0 ? 'New Quiz' : 'Start Quiz'}
            </Button>
          </div>
        </div>

        {questions.length === 0 && (
          <div>
            <Select
              value={selectedSubject}
              onValueChange={(value) => setSelectedSubject(value as Subject)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {showResults && (
          <Card className="p-6 bg-gradient-to-r from-skill-purple/10 to-skill-indigo/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
                <p className="text-muted-foreground">
                  You got {getScore().correct} out of {getScore().total} questions correct ({getScore().percentage}%)
                </p>
              </div>
              <Trophy className={`h-12 w-12 ${
                getScore().percentage === 100 ? 'text-yellow-500' :
                getScore().percentage >= 80 ? 'text-skill-purple' :
                'text-muted-foreground'
              }`} />
            </div>
          </Card>
        )}

        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">
                    Question {index + 1}
                  </h3>
                  {question.isSubmitted && (
                    <span className={`font-medium ${
                      question.selectedAnswer === question.correctAnswer
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {question.selectedAnswer === question.correctAnswer ? 'Correct' : 'Incorrect'}
                    </span>
                  )}
                </div>
                
                <p>{question.question}</p>

                <RadioGroup
                  value={question.selectedAnswer}
                  onValueChange={(value) => handleAnswerSelect(question.id, value)}
                  className="space-y-2"
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`${question.id}-${optionIndex}`}
                        disabled={question.isSubmitted}
                        className={question.isSubmitted ? (
                          option === question.correctAnswer
                            ? 'border-green-500 text-green-500'
                            : option === question.selectedAnswer
                            ? 'border-red-500 text-red-500'
                            : ''
                        ) : ''}
                      />
                      <label
                        htmlFor={`${question.id}-${optionIndex}`}
                        className={`text-sm ${
                          question.isSubmitted && option === question.correctAnswer
                            ? 'text-green-600 dark:text-green-400 font-medium'
                            : ''
                        }`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </Card>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="text-center text-muted-foreground">
            Select a subject and click "Start Quiz" to begin!
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
