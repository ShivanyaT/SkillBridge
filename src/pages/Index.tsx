
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const features = [
    {
      title: "Interactive Flashcards",
      description: "Create and study flashcards across multiple subjects to improve retention.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers">
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
          <path d="m22 12-8.6 3.91a2 2 0 0 1-1.65 0L3.4 12.18" />
          <path d="m22 17-8.6 3.91a2 2 0 0 1-1.65 0L3.4 17.18" />
        </svg>
      )
    },
    {
      title: "Quiz Challenges",
      description: "Test your knowledge with quizzes that adapt to your learning needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit">
          <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
          <path d="M16 8V5c0-1.1.9-2 2-2" />
          <path d="M12 13h4" />
          <path d="M12 18h6a2 2 0 0 1 2 2v1" />
          <path d="M12 8h8" />
          <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
        </svg>
      )
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed statistics and achievements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
      )
    },
    {
      title: "Peer Learning",
      description: "Connect with fellow learners and share knowledge to enhance your skills.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-background/20">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <svg
              className="w-full h-full"
              viewBox="0 0 80 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="0" cy="0" r="1" />
              <circle cx="20" cy="0" r="1" />
              <circle cx="40" cy="0" r="1" />
              <circle cx="60" cy="0" r="1" />
              <circle cx="80" cy="0" r="1" />
              
              <circle cx="0" cy="20" r="1" />
              <circle cx="20" cy="20" r="1" />
              <circle cx="40" cy="20" r="1" />
              <circle cx="60" cy="20" r="1" />
              <circle cx="80" cy="20" r="1" />
              
              <circle cx="0" cy="40" r="1" />
              <circle cx="20" cy="40" r="1" />
              <circle cx="40" cy="40" r="1" />
              <circle cx="60" cy="40" r="1" />
              <circle cx="80" cy="40" r="1" />
              
              <circle cx="0" cy="60" r="1" />
              <circle cx="20" cy="60" r="1" />
              <circle cx="40" cy="60" r="1" />
              <circle cx="60" cy="60" r="1" />
              <circle cx="80" cy="60" r="1" />
              
              <circle cx="0" cy="80" r="1" />
              <circle cx="20" cy="80" r="1" />
              <circle cx="40" cy="80" r="1" />
              <circle cx="60" cy="80" r="1" />
              <circle cx="80" cy="80" r="1" />
            </svg>
          </div>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Smarter with <span className="gradient-text">SkillBridge</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              An interactive learning platform with flashcards, quizzes, and peer learning to help you master new skills efficiently.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button 
                  className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90 px-8" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90 px-8" 
                    size="lg"
                    onClick={() => navigate('/login')}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate('/register')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
            <div className="bg-secondary/40 backdrop-blur-sm border border-border p-1 rounded-xl">
              <div className="aspect-video rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-background p-6 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-skill-purple to-skill-indigo flex items-center justify-center">
                        <span className="font-bold text-white text-lg">SB</span>
                      </div>
                      <div>
                        <h2 className="font-bold">SkillBridge Dashboard</h2>
                        <p className="text-sm text-muted-foreground">Your learning journey</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-background p-4 rounded-md border border-border">
                        <div className="text-sm mb-1 text-muted-foreground">Current Streak</div>
                        <div className="text-2xl font-bold">5 days</div>
                      </div>
                      <div className="bg-background p-4 rounded-md border border-border">
                        <div className="text-sm mb-1 text-muted-foreground">Quiz Points</div>
                        <div className="text-2xl font-bold">350</div>
                      </div>
                    </div>
                    <div className="bg-background p-4 rounded-md border border-border flex justify-between items-center">
                      <div>
                        <div className="text-sm mb-1 text-muted-foreground">Next Quiz</div>
                        <div className="font-medium">Python Basics</div>
                      </div>
                      <Button size="sm" className="bg-primary/20 text-primary hover:bg-primary/30">
                        Start
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Learn Effectively
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines the best learning techniques with modern technology to help you achieve your goals faster.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="p-6 hover:shadow-md transition-shadow border border-border/50">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Learning?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join SkillBridge today and start your journey to mastering new skills with our interactive learning platform.
          </p>
          {isAuthenticated ? (
            <Button 
              className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90 px-8" 
              size="lg"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button 
              className="bg-gradient-to-r from-skill-purple to-skill-indigo hover:opacity-90 px-8" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Create Free Account
            </Button>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-skill-purple to-skill-indigo flex items-center justify-center">
                <span className="font-bold text-white text-sm">SB</span>
              </div>
              <span className="font-bold">SkillBridge</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 SkillBridge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
