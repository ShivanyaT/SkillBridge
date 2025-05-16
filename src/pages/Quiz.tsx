
import React from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import QuizSettings from '@/components/quiz/QuizSettings';
import QuizContent from '@/components/quiz/QuizContent';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Quiz: React.FC = () => {
  const {
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
  } = useQuiz();

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
      
      <QuizSettings
        subject={subject}
        subjects={subjects}
        isLoading={isLoading}
        onSubjectChange={setSubject}
        onGenerateQuiz={handleGenerateQuiz}
      />
      
      <QuizContent
        questions={questions}
        isLoading={isLoading}
        isSubmitted={isSubmitted}
        selectedOptions={selectedOptions}
        score={score}
        onSelectOption={handleSelectOption}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    </div>
  );
};

export default Quiz;
