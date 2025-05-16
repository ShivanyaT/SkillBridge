import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flashcardsData, type Subject } from '@/services/mockData';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  isFlipped: boolean;
}

const subjects: Subject[] = ['Python', 'Maths', 'English'];

const Flashcards: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | ''>('');

  const generateFlashcards = () => {
    if (!selectedSubject) return;

    const newCards = flashcardsData[selectedSubject].map((card, index) => ({
      id: `${Date.now()}-${index}`,
      question: card.question,
      answer: card.answer,
      isFlipped: false,
    }));

    setFlashcards(newCards);
  };

  const toggleCard = (id: string) => {
    setFlashcards(cards =>
      cards.map(card =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  const removeCard = (id: string) => {
    setFlashcards(cards => cards.filter(card => card.id !== id));
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Flashcards</h1>
          <Button
            onClick={generateFlashcards}
            disabled={!selectedSubject}
            className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90"
          >
            Show Cards
          </Button>
        </div>

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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flashcards.map((card) => (
            <Card
              key={card.id}
              className={`group relative min-h-[200px] cursor-pointer perspective-1000 transition-transform hover:scale-105 ${
                card.isFlipped ? '[transform-style:preserve-3d] rotate-y-180' : ''
              }`}
              onClick={() => toggleCard(card.id)}
            >
              <div
                className={`absolute inset-0 backface-hidden rounded-lg p-6 ${
                  card.isFlipped ? 'hidden' : 'block bg-blue-50 dark:bg-blue-950'
                }`}
              >
                <p className="text-lg font-medium">{card.question}</p>
              </div>
              <div
                className={`absolute inset-0 backface-hidden rounded-lg p-6 ${
                  card.isFlipped ? 'block bg-orange-50 dark:bg-orange-950 [transform:rotateY(180deg)]' : 'hidden'
                }`}
              >
                <p className="text-lg">{card.answer}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  removeCard(card.id);
                }}
              >
                ×
              </Button>
            </Card>
          ))}
        </div>

        {flashcards.length === 0 && (
          <div className="text-center text-muted-foreground">
            Select a subject and click "Show Cards" to start!
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
