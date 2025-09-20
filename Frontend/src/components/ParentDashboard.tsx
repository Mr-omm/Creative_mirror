import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  Heart, 
  Star, 
  Brain,
  Users,
  Calendar,
  Shield,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

interface SkillProgress {
  name: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
}

interface WeeklyReport {
  moodAverage: number;
  challengesCompleted: number;
  creativityScore: number;
  emotionalGrowth: number;
  highlights: string[];
  concerns: string[];
}

export function ParentDashboard() {
  const [childName] = useState('Alex');
  const [weeklyReport] = useState<WeeklyReport>({
    moodAverage: 7.2,
    challengesCompleted: 8,
    creativityScore: 85,
    emotionalGrowth: 78,
    highlights: [
      'Completed first creative writing challenge',
      'Showed increased confidence in sharing work',
      'Used art therapy techniques during frustration',
      'Helped another community member with anxiety'
    ],
    concerns: [
      'Some gaming sessions ended in frustration',
      'Mood dips on Sunday evenings (school anxiety?)'
    ]
  });

  const [skillProgress] = useState<SkillProgress[]>([
    { name: 'Creativity', current: 85, target: 90, trend: 'up' },
    { name: 'Emotional Regulation', current: 78, target: 85, trend: 'up' },
    { name: 'Problem Solving', current: 92, target: 95, trend: 'stable' },
    { name: 'Social Connection', current: 65, target: 75, trend: 'up' },
    { name: 'Resilience', current: 70, target: 80, trend: 'up' }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>{childName}'s Wellness Journey</h2>
          <p className="text-muted-foreground">Track growth, insights, and well-being</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">Privacy Protected</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2 text-pink-500" />
            <div className="text-2xl font-semibold">{weeklyReport.moodAverage}/10</div>
            <p className="text-sm text-muted-foreground">Average Mood</p>
            <Badge variant="secondary" className="mt-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.5 from last week
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-semibold">{weeklyReport.challengesCompleted}</div>
            <p className="text-sm text-muted-foreground">Challenges Completed</p>
            <Badge variant="secondary" className="mt-2">
              This week
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-semibold">{weeklyReport.creativityScore}%</div>
            <p className="text-sm text-muted-foreground">Creativity Score</p>
            <Badge variant="secondary" className="mt-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              Growing
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-semibold">{weeklyReport.emotionalGrowth}%</div>
            <p className="text-sm text-muted-foreground">Emotional Growth</p>
            <Badge variant="secondary" className="mt-2">
              Strong progress
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Weekly Overview</TabsTrigger>
          <TabsTrigger value="skills">Skill Development</TabsTrigger>
          <TabsTrigger value="activities">Suggested Activities</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6">
            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  This Week's Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyReport.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <Star className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-green-800">{highlight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Areas to Watch */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  Areas to Watch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyReport.concerns.map((concern, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-yellow-800">{concern}</p>
                        <Button variant="link" className="h-auto p-0 text-xs text-yellow-700">
                          Get suggestions →
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  AI Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">🎮 Gaming-Wellness Connection</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    {childName} shows strongest emotional regulation after creative building sessions. Consider encouraging more sandbox-style games during stressful periods.
                  </p>
                  <Button size="sm" variant="outline">Learn More</Button>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">✨ Creativity Catalyst</h4>
                  <p className="text-sm text-purple-700 mb-3">
                    Art therapy challenges are having a significant positive impact. Consider introducing offline art supplies that complement their digital creations.
                  </p>
                  <Button size="sm" variant="outline">Get Art Suggestions</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Development Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillProgress.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        {getTrendIcon(skill.trend)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {skill.current}% / {skill.target}%
                      </span>
                    </div>
                    <Progress value={skill.current} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current Level</span>
                      <span>Target</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Recommended Family Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <h4 className="font-medium">Weekend Building Project</h4>
                      <Badge variant="secondary">30-60 min</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on {childName}'s love for creative building, try constructing something physical together - LEGO, cardboard, or a simple DIY project.
                    </p>
                    <Button size="sm">Get Project Ideas</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-pink-500" />
                      <h4 className="font-medium">Emotion Check-in Ritual</h4>
                      <Badge variant="secondary">5-10 min</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create a daily or weekly ritual where you both share how you're feeling using the same mood tracking tools {childName} uses.
                    </p>
                    <Button size="sm">Learn How</Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <h4 className="font-medium">Creative Story Time</h4>
                      <Badge variant="secondary">15-20 min</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Take turns adding to a story inspired by {childName}'s recent gaming adventures. This builds on their creative writing progress.
                    </p>
                    <Button size="sm">Start Story</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Privacy & Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🔒 What's Protected</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• All conversations with Mirror Mentor are encrypted</li>
                    <li>• Personal mood data is anonymized in our systems</li>
                    <li>• Community posts can be made anonymously</li>
                    <li>• No gaming data is shared with third parties</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">👀 What You Can See</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Weekly wellness summaries and trends</li>
                    <li>• Skill development progress</li>
                    <li>• Completed creative challenges (not content unless shared)</li>
                    <li>• General activity patterns and insights</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">🤝 Shared with Professionals</h4>
                  <p className="text-sm text-purple-700">
                    Only in emergency situations or if explicitly requested by you, anonymized data may be shared with mental health professionals. {childName} will always be informed of any data sharing.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">AI Monitoring</p>
                      <p className="text-xs text-muted-foreground">Detects concerning patterns</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Crisis Detection</p>
                      <p className="text-xs text-muted-foreground">Immediate professional referral</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Moderated Community</p>
                      <p className="text-xs text-muted-foreground">All posts reviewed by experts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Secure Platform</p>
                      <p className="text-xs text-muted-foreground">End-to-end encryption</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}