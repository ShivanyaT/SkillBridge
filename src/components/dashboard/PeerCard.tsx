
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PeerCardProps {
  name: string;
  skills: string[];
  avatarUrl?: string;
  onConnect: () => void;
}

const PeerCard: React.FC<PeerCardProps> = ({
  name,
  skills,
  avatarUrl,
  onConnect
}) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-grow">
            <h3 className="font-medium">{name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          <Button 
            size="sm" 
            onClick={onConnect}
            className="bg-primary/20 text-primary hover:bg-primary/30"
          >
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerCard;
