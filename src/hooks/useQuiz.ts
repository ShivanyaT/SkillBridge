
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { generateQuiz } from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';

export const useQuiz = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [subject, setSubject] = useState('Python');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
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

  return {
    subject,
    subjects,
    questions,
    selectedOptions,
    isSubmitted,
    score,
    isLoading,
    isAuthLoading,
    user,
    setSubject,
    handleSelectOption,
    handleGenerateQuiz,
    handleSubmit,
    handleReset
  };
};
