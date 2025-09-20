import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Palette, 
  Lightbulb, 
  Heart, 
  Star, 
  Trophy, 
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'creative' | 'innovative' | 'emotional';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  estimatedTime: string;
  completed: boolean;
  gameSource?: string;
}

export function CreativeChallenges() {
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Design Your Hero\'s Origin Story',
      description: 'Based on your character in last night\'s game, write a short story about their background and what drives them.',
      type: 'creative',
      difficulty: 'medium',
      points: 150,
      estimatedTime: '20-30 min',
      completed: false,
      gameSource: 'Minecraft Adventure',
    },
    {
      id: '2',
      title: 'Frustration → Art',
      description: 'I noticed you were feeling frustrated during that boss fight. Let\'s channel that energy into creating abstract art that represents overcoming challenges.',
      type: 'emotional',
      difficulty: 'easy',
      points: 100,
      estimatedTime: '15 min',
      completed: true,
      gameSource: 'Dark Souls Session',
    },
    {
      id: '3',
      title: 'Blueprint Your Dream Build',
      description: 'Turn your amazing castle design into real architectural plans. What materials would you use? How would you solve real-world engineering challenges?',
      type: 'innovative',
      difficulty: 'hard',
      points: 250,
      estimatedTime: '45 min',
      completed: false,
      gameSource: 'Creative Building Session',
    },
    {
      id: '4',
      title: 'Confidence Playlist',
      description: 'After that amazing victory, create a music playlist that captures that feeling of accomplishment. Include songs that make you feel unstoppable.',
      type: 'emotional',
      difficulty: 'easy',
      points: 75,
      estimatedTime: '10 min',
      completed: false,
      gameSource: 'Competitive Match',
    },
  ]);

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const getTypeIcon = (type: Challenge['type']) => {
    switch (type) {
      case 'creative': return <Palette className="w-4 h-4" />;
      case 'innovative': return <Lightbulb className="w-4 h-4" />;
      case 'emotional': return <Heart className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Challenge['type']) => {
    switch (type) {
      case 'creative': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'innovative': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'emotional': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
    }
  };

  const activeChallenges = challenges.filter(c => !c.completed);
  const completedChallenges = challenges.filter(c => c.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>AI-Generated Challenges</h2>
          <p className="text-muted-foreground">Turn your gaming sessions into creative growth</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">1,250</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-orange-500" />
              <span className="font-semibold">Level 3</span>
            </div>
            <p className="text-xs text-muted-foreground">Creator</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Active ({activeChallenges.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Completed ({completedChallenges.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4">
            {activeChallenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedChallenge(challenge)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getTypeColor(challenge.type)}>
                          {getTypeIcon(challenge.type)}
                          <span className="ml-1 capitalize">{challenge.type}</span>
                        </Badge>
                        <Badge variant="outline">
                          <Star className="w-3 h-3 mr-1" />
                          {challenge.points} pts
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {challenge.estimatedTime}
                        </Badge>
                      </div>
                      
                      <h3 className="mb-2">{challenge.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{challenge.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>From: {challenge.gameSource}</span>
                          <span>•</span>
                          <span className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty.toUpperCase()}
                          </span>
                        </div>
                        
                        <Button size="sm">
                          Start Challenge
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-4">
            {completedChallenges.map((challenge) => (
              <Card key={challenge.id} className="opacity-75">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <h3>{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Completed • Earned {challenge.points} points
                      </p>
                    </div>
                    <Badge variant="outline">View Result</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Creative Challenges</span>
                <span>3/5 completed</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Emotional Growth</span>
                <span>2/3 completed</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Innovation Projects</span>
                <span>1/2 completed</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}