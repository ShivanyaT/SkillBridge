
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FlashcardItem, { Flashcard } from '@/components/flashcards/FlashcardItem';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { generateFlashcards } from '@/utils/api';

const Flashcards: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [subject, setSubject] = useState('Python');
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const subjects = ['Python', 'Maths', 'English'];

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate('/login');
    }
  }, [user, isAuthLoading, navigate]);

  useEffect(() => {
    // Load initial flashcards
    handleGenerateFlashcards();
  }, [subject]);

  const handleGenerateFlashcards = async () => {
    setIsLoading(true);
    try {
      const generatedFlashcards = await generateFlashcards(subject);
      setFlashcards(generatedFlashcards);
      toast({
        title: "Flashcards loaded",
        description: `${generatedFlashcards.length} ${subject} flashcards are ready for you.`,
      });
    } catch (error) {
      toast({
        title: "Failed to load flashcards",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container max-w-5xl mx-auto p-4">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <p className="text-muted-foreground">Review and learn with interactive flashcards.</p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Study Settings</CardTitle>
          <CardDescription>Choose a subject and generate flashcards to study</CardDescription>
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
              onClick={handleGenerateFlashcards} 
              className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Generate Flashcards
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-lg">Generating flashcards...</span>
        </div>
      ) : flashcards.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {flashcards.map((flashcard, index) => (
            <FlashcardItem 
              key={flashcard.id} 
              flashcard={flashcard} 
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-lg mb-2">No flashcards available</div>
          <p className="text-muted-foreground">Select a subject and generate flashcards to start studying</p>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
