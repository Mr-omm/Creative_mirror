import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Smile, 
  Meh, 
  Frown, 
  Heart, 
  Brain,
  TrendingUp,
  Calendar,
  Clock,
  Zap
} from 'lucide-react';

const moodOptions = [
  { 
    emoji: '😊', 
    label: 'Happy', 
    value: 'happy', 
    lightColor: 'bg-green-100 border-green-300 text-green-700',
    darkColor: 'dark:bg-green-900/30 dark:border-green-600/50 dark:text-green-300',
    gradientColor: 'from-green-400 to-emerald-500'
  },
  { 
    emoji: '😌', 
    label: 'Calm', 
    value: 'calm', 
    lightColor: 'bg-blue-100 border-blue-300 text-blue-700',
    darkColor: 'dark:bg-blue-900/30 dark:border-blue-600/50 dark:text-blue-300',
    gradientColor: 'from-blue-400 to-cyan-500'
  },
  { 
    emoji: '😐', 
    label: 'Neutral', 
    value: 'neutral', 
    lightColor: 'bg-gray-100 border-gray-300 text-gray-700',
    darkColor: 'dark:bg-gray-800/50 dark:border-gray-600/50 dark:text-gray-300',
    gradientColor: 'from-gray-400 to-slate-500'
  },
  { 
    emoji: '😔', 
    label: 'Sad', 
    value: 'sad', 
    lightColor: 'bg-indigo-100 border-indigo-300 text-indigo-700',
    darkColor: 'dark:bg-indigo-900/30 dark:border-indigo-600/50 dark:text-indigo-300',
    gradientColor: 'from-indigo-400 to-blue-500'
  },
  { 
    emoji: '😤', 
    label: 'Frustrated', 
    value: 'frustrated', 
    lightColor: 'bg-red-100 border-red-300 text-red-700',
    darkColor: 'dark:bg-red-900/30 dark:border-red-600/50 dark:text-red-300',
    gradientColor: 'from-red-400 to-pink-500'
  },
  { 
    emoji: '😰', 
    label: 'Anxious', 
    value: 'anxious', 
    lightColor: 'bg-yellow-100 border-yellow-300 text-yellow-700',
    darkColor: 'dark:bg-yellow-900/30 dark:border-yellow-600/50 dark:text-yellow-300',
    gradientColor: 'from-yellow-400 to-orange-500'
  },
  { 
    emoji: '😴', 
    label: 'Tired', 
    value: 'tired', 
    lightColor: 'bg-purple-100 border-purple-300 text-purple-700',
    darkColor: 'dark:bg-purple-900/30 dark:border-purple-600/50 dark:text-purple-300',
    gradientColor: 'from-purple-400 to-violet-500'
  },
  { 
    emoji: '🔥', 
    label: 'Energetic', 
    value: 'energetic', 
    lightColor: 'bg-orange-100 border-orange-300 text-orange-700',
    darkColor: 'dark:bg-orange-900/30 dark:border-orange-600/50 dark:text-orange-300',
    gradientColor: 'from-orange-400 to-red-500'
  },
];

interface MoodEntry {
  id: string;
  mood: string;
  intensity: number;
  note?: string;
  timestamp: Date;
  triggers?: string[];
}

interface MoodTrackerProps {
  onMoodChange?: (mood: string) => void;
  currentMood?: string;
}

export function MoodTracker({ onMoodChange, currentMood }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string>(currentMood || '');
  const [intensity, setIntensity] = useState<number>(5);
  const [note, setNote] = useState<string>('');
  const [moodHistory] = useState<MoodEntry[]>([
    {
      id: '1',
      mood: 'happy',
      intensity: 8,
      note: 'Completed a really challenging level today!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      triggers: ['gaming', 'achievement'],
    },
    {
      id: '2',
      mood: 'frustrated',
      intensity: 6,
      note: 'Keep dying at the same boss fight',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      triggers: ['gaming', 'difficulty'],
    },
    {
      id: '3',
      mood: 'calm',
      intensity: 7,
      note: 'Built a peaceful garden in my world',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      triggers: ['creativity', 'building'],
    },
  ]);

  const handleMoodSubmit = () => {
    if (!selectedMood) return;
    
    // Here we would save the mood entry
    console.log('Mood submitted:', { mood: selectedMood, intensity, note });
    
    // Update parent component with new mood
    if (onMoodChange) {
      onMoodChange(selectedMood);
    }
    
    // Reset form
    setSelectedMood('');
    setIntensity(5);
    setNote('');
  };

  const getMoodEmoji = (moodValue: string) => {
    return moodOptions.find(mood => mood.value === moodValue)?.emoji || '😐';
  };

  const getMoodLabel = (moodValue: string) => {
    return moodOptions.find(mood => mood.value === moodValue)?.label || 'Unknown';
  };

  const getMoodColors = (moodValue: string) => {
    const mood = moodOptions.find(mood => mood.value === moodValue);
    return mood ? `${mood.lightColor} ${mood.darkColor}` : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300';
  };

  const getWeeklyMoodTrend = () => {
    // Mock trend calculation
    return {
      trend: 'up',
      percentage: 15,
      averageMood: 7.2,
    };
  };

  const trend = getWeeklyMoodTrend();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Mood & Wellness Tracker</h2>
          <p className="text-muted-foreground">Track how you're feeling and discover patterns</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1">
              <TrendingUp className={`w-4 h-4 ${trend.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              <span className="font-semibold">+{trend.percentage}%</span>
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="font-semibold">{trend.averageMood}/10</span>
            </div>
            <p className="text-xs text-muted-foreground">Avg. mood</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="check-in" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="check-in">Quick Check-in</TabsTrigger>
          <TabsTrigger value="history">Mood History</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="check-in" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                How are you feeling right now?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Selection */}
              <div>
                <label className="block mb-3">Select your mood:</label>
                <div className="grid grid-cols-4 gap-3">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.value}
                      variant={selectedMood === mood.value ? "default" : "outline"}
                      className={`h-auto py-4 flex flex-col gap-2 transition-all duration-200 hover:scale-105 ${
                        selectedMood === mood.value 
                          ? `${mood.lightColor} ${mood.darkColor} border-2 shadow-lg transform scale-105` 
                          : 'hover:bg-white/20 dark:hover:bg-gray-800/20'
                      }`}
                      onClick={() => setSelectedMood(mood.value)}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-xs">{mood.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Intensity Slider */}
              {selectedMood && (
                <div>
                  <label className="block mb-3">
                    How intense is this feeling? ({intensity}/10)
                  </label>
                  <div className="px-3">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={intensity}
                      onChange={(e) => setIntensity(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: selectedMood 
                          ? `linear-gradient(to right, #6366f1 0%, #8b5cf6 ${(intensity - 1) * 11.11}%, #e5e7eb ${(intensity - 1) * 11.11}%, #e5e7eb 100%)`
                          : undefined
                      }}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Intense</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Note */}
              <div>
                <label className="block mb-3">
                  Anything you want to share? (Optional)
                </label>
                <Textarea
                  placeholder="What's contributing to how you feel? Gaming session? School? Friends?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="resize-none"
                />
              </div>

              <Button 
                onClick={handleMoodSubmit} 
                disabled={!selectedMood}
                className="w-full"
              >
                Log My Mood
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Mood Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moodHistory.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-200 bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm">
                    <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`${getMoodColors(entry.mood)} border px-2 py-1`}>
                          {getMoodLabel(entry.mood)}
                        </Badge>
                        <Badge variant="outline" className="bg-white/80 dark:bg-gray-800/50">
                          {entry.intensity}/10
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {entry.timestamp.toLocaleString()}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-muted-foreground mb-2">{entry.note}</p>
                      )}
                      {entry.triggers && (
                        <div className="flex gap-1 flex-wrap">
                          {entry.triggers.map((trigger, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-muted/50 hover:bg-muted">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-lg backdrop-blur-sm">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">🎮 Gaming & Mood Connection</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    I noticed you feel happiest after completing challenging levels. Your mood tends to improve by 2-3 points after achievement-focused gaming sessions.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 rounded-lg backdrop-blur-sm">
                  <h4 className="font-medium text-green-900 dark:text-green-300 mb-2">✨ Your Mood Superpower</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Building and creative activities consistently boost your mood. Consider turning frustration into building projects - it's worked 4 times this week!
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30 rounded-lg backdrop-blur-sm">
                  <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2">🕒 Best Times for You</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Your mood is typically highest between 3-5 PM. This might be a great time for challenging tasks or important conversations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wellness Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Daily Check-ins</p>
                      <p className="text-sm text-muted-foreground">
                        You're on a 5-day streak! Keep it up for better mood insights.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <div>
                      <p className="font-medium">Mindfulness Break</p>
                      <p className="text-sm text-muted-foreground">
                        Try a 5-minute breathing exercise when feeling frustrated.
                      </p>
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