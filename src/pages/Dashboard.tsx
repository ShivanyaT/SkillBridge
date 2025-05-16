
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/dashboard/StatCard';
import PeerCard from '@/components/dashboard/PeerCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  name: string;
  streak: number;
  quiz_points: number;
  badges: string[];
}

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('name, streak, quiz_points, badges')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          
          setProfile(data as UserProfile);
        } catch (error) {
          console.error('Error fetching profile:', error);
          // Fallback profile data
          setProfile({
            name: user.user_metadata?.name || 'User',
            streak: 0,
            quiz_points: 0,
            badges: []
          });
        } finally {
          setIsProfileLoading(false);
        }
      }
    };
    
    fetchProfile();
  }, [user]);

  const handleConnect = (peerName: string) => {
    toast({
      title: "Connection request sent",
      description: `You've sent a connection request to ${peerName}.`,
    });
  };

  if (isLoading || isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const userName = profile?.name || user.user_metadata?.name || 'User';
  const userStreak = profile?.streak || 0;
  const userPoints = profile?.quiz_points || 0;
  const userBadges = profile?.badges || [];

  // Mock peers data
  const suggestedPeers = [
    { id: '1', name: 'Alex Johnson', skills: ['Python', 'Machine Learning', 'Data Science'] },
    { id: '2', name: 'Jamie Smith', skills: ['Maths', 'Statistics', 'Calculus'] },
    { id: '3', name: 'Morgan Lee', skills: ['English', 'Literature', 'Creative Writing'] },
    { id: '4', name: 'Taylor Brown', skills: ['Python', 'Web Development', 'JavaScript'] },
  ];

  return (
    <div className="container max-w-7xl mx-auto p-4">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
        <p className="text-muted-foreground">Continue your learning journey where you left off.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Current Streak"
          value={userStreak}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>}
          description="Days in a row"
          trend={{ value: 20, isPositive: true }}
        />
        <StatCard
          title="Quiz Points"
          value={userPoints}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>}
          description="Total earned points"
        />
        <StatCard
          title="Badges Earned"
          value={userBadges.length}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-medal"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" /><path d="M11 12 5.12 2H2l7 12" /><path d="m13 12 5.88-10H22l-7 12" /><path d="M12 8V2" /><circle cx="12" cy="17" r="5" /></svg>}
          description="Achievement badges"
        />
        <StatCard
          title="Subjects"
          value="3"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>}
          description="Learning topics"
        />
      </div>

      <Tabs defaultValue="learn">
        <TabsList className="mb-6">
          <TabsTrigger value="learn">Continue Learning</TabsTrigger>
          <TabsTrigger value="peers">Suggested Peers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="learn">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-skill-purple to-skill-indigo h-36 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 12-8.6 3.91a2 2 0 0 1-1.65 0L3.4 12.18" /></svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Flashcards</h3>
                  <p className="text-muted-foreground mb-4">Practice with interactive flashcards</p>
                  <Button onClick={() => navigate('/flashcards')} variant="outline" className="w-full">Continue</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-skill-blue to-skill-teal h-36 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" /><path d="M16 8V5c0-1.1.9-2 2-2" /><path d="M12 13h4" /><path d="M12 18h6a2 2 0 0 1 2 2v1" /><path d="M12 8h8" /><path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" /></svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Quiz Challenge</h3>
                  <p className="text-muted-foreground mb-4">Test your knowledge with quizzes</p>
                  <Button onClick={() => navigate('/quiz')} variant="outline" className="w-full">Start Quiz</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-36 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-medal"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" /><path d="M11 12 5.12 2H2l7 12" /><path d="m13 12 5.88-10H22l-7 12" /><path d="M12 8V2" /><circle cx="12" cy="17" r="5" /></svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Your Achievements</h3>
                  <p className="text-muted-foreground mb-4">View your learning progress and badges</p>
                  <Button variant="outline" className="w-full">View Stats</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="peers">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Learning Peers</CardTitle>
              <CardDescription>Connect with other learners who share your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestedPeers.map((peer) => (
                  <PeerCard
                    key={peer.id}
                    name={peer.name}
                    skills={peer.skills}
                    onConnect={() => handleConnect(peer.name)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
