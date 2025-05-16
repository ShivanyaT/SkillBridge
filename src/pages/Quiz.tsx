
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QuizQuestion, { QuizQuestion as QuizQuestionType } from '@/components/quiz/QuizQuestion';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { generateQuiz } from '@/utils/api';

const Quiz: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [subject, setSubject] = useState('Python');
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const subjects = ['Python', 'Maths', 'English'];

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate('/login');
    }
  }, [user, isAuthLoading, navigate]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    setIsSubmitted(false);
    setScore(null);
    setSelectedOptions({});
    
    try {
      const generatedQuiz = await generateQuiz(subject);
      setQuestions(generatedQuiz);
      toast({
        title: "Quiz loaded",
        description: `${generatedQuiz.length} ${subject} questions are ready for you.`,
      });
    } catch (error) {
      toast({
        title: "Failed to load quiz",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    const unansweredQuestions = questions.filter(q => !selectedOptions[q.id]);
    
    if (unansweredQuestions.length > 0) {
      toast({
        title: "Incomplete quiz",
        description: `Please answer all ${unansweredQuestions.length} remaining questions.`,
        variant: "destructive",
      });
      return;
    }
    
    let correctCount = 0;
    
    questions.forEach(question => {
      const selectedOption = question.options.find(opt => opt.id === selectedOptions[question.id]);
      if (selectedOption && selectedOption.isCorrect) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setIsSubmitted(true);
    
    toast({
      title: "Quiz submitted!",
      description: `You scored ${correctCount} out of ${questions.length}.`,
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setScore(null);
    setSelectedOptions({});
    handleGenerateQuiz();
  };

  useEffect(() => {
    handleGenerateQuiz();
  }, [subject]);

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Quiz Challenge</h1>
        <p className="text-muted-foreground">Test your knowledge with multiple choice questions.</p>
      </div>
      
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
                onValueChange={setSubject}
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
              onClick={handleGenerateQuiz} 
              className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Generate New Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-lg">Generating quiz...</span>
        </div>
      ) : questions.length > 0 ? (
        <div>
          {questions.map((question, index) => (
            <QuizQuestion 
              key={question.id} 
              question={question} 
              selectedOption={selectedOptions[question.id] || null}
              onSelectOption={(optionId) => handleSelectOption(question.id, optionId)}
              isSubmitted={isSubmitted}
              questionNumber={index + 1}
            />
          ))}
          
          {isSubmitted ? (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
                  <div className="text-5xl font-bold mb-4 gradient-text">{score} / {questions.length}</div>
                  <p className="mb-6 text-muted-foreground">
                    {score === questions.length 
                      ? 'Perfect score! Amazing job!' 
                      : score! >= questions.length / 2 
                        ? 'Well done! Keep practicing to improve.'
                        : 'Keep practicing. You\'ll do better next time!'}
                  </p>
                  <Button 
                    onClick={handleReset} 
                    className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90"
                  >
                    Try Another Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex justify-center mt-6 mb-8">
              <Button 
                onClick={handleSubmit} 
                className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90 px-8"
                size="lg"
              >
                Submit Quiz
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-lg mb-2">No quiz available</div>
          <p className="text-muted-foreground">Select a subject and generate a quiz to start</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
