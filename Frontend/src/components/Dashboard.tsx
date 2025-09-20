import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Sparkles, 
  Heart, 
  Gamepad2, 
  Palette, 
  Users, 
  TrendingUp,
  Star,
  Calendar,
  MessageCircle,
  Smile
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardProps {
  userName: string;
  currentMood: string;
  onNavigate: (section: string) => void;
}

export function Dashboard({ userName, currentMood, onNavigate }: DashboardProps) {
  const [recentActivity] = useState([
    {
      id: '1',
      type: 'challenge',
      title: 'Completed "Hero\'s Origin Story"',
      points: 150,
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'mood',
      title: 'Logged feeling energetic after gaming',
      points: 25,
      time: '3 hours ago'
    },
    {
      id: '3',
      type: 'community',
      title: 'Received 5 likes on art piece',
      points: 50,
      time: '1 day ago'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl p-8 text-white shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-white/30 shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-yellow-300 to-orange-300 text-white text-2xl">
                  {userName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center border-2 border-white">
                <Smile className="w-4 h-4 text-yellow-700" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Hey there, {userName}! 👋</h1>
              <p className="text-white/90 text-lg">Ready for some magical adventures today?</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
            <Badge className="bg-white/20 border-white/20 text-white px-4 py-2 rounded-full text-base">
              <Heart className="w-4 h-4 mr-2" />
              Feeling {currentMood} 😊
            </Badge>
            <Badge className="bg-white/20 border-white/20 text-white px-4 py-2 rounded-full text-base">
              <Star className="w-4 h-4 mr-2" />
              ⭐ Level 3 Creator
            </Badge>
            <Badge className="bg-white/20 border-white/20 text-white px-4 py-2 rounded-full text-base">
              🔥 3 Day Streak!
            </Badge>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 text-6xl opacity-20">
          ✨🌈🎮
        </div>
        <div className="absolute bottom-4 right-8 text-4xl opacity-30">
          🎨🎯⭐
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100"
          onClick={() => onNavigate('mood')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-pink-700">💝 Feelings Check</h3>
            <p className="text-sm text-pink-600">How's your heart today?</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100"
          onClick={() => onNavigate('challenges')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-purple-700">🎨 Fun Quests</h3>
            <p className="text-sm text-purple-600">Magical challenges await!</p>
            <Badge variant="secondary" className="mt-3 bg-purple-200 text-purple-700 rounded-full px-3 py-1">✨ 3 Ready!</Badge>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100"
          onClick={() => onNavigate('mentor')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-blue-700">✨ Magic Friend</h3>
            <p className="text-sm text-blue-600">Chat with your AI buddy!</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-green-200 bg-gradient-to-br from-green-50 to-green-100"
          onClick={() => onNavigate('community')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-green-700">👥 Share Corner</h3>
            <p className="text-sm text-green-600">Safe space for friends!</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Snapshot */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-orange-700">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              🌟 Your Amazing Adventures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-orange-100">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-orange-800">{activity.title}</p>
                    <div className="flex items-center gap-2 text-sm text-orange-600 mt-1">
                      <span>⏰ {activity.time}</span>
                      <span>•</span>
                      <span className="font-medium">⭐ +{activity.points} points</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Gaming Insights */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-700">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              🎮 Gaming Magic Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center text-3xl">
                🏰
              </div>
              <div className="flex-1">
                <p className="font-bold text-blue-800">🎯 Last Epic Session</p>
                <p className="text-blue-600 text-sm mt-1">
                  Wow! 3 hours of creative building detected! 
                  <br />
                  ✨ New art challenge unlocked!
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => onNavigate('challenges')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl py-3 text-base font-medium shadow-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                🎨 See My Magic Challenges!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goals */}
      <Card className="border-rainbow bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-700 text-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            🌟 This Week's Super Goals!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200 rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <p className="font-bold text-green-800 text-lg">🎨 Art Explorer</p>
              <p className="text-green-700 mb-3">Complete 2 art challenges</p>
              <Badge className="bg-green-200 text-green-800 px-4 py-2 rounded-full border-green-300">⭐ 1/2 Done!</Badge>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200 rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <p className="font-bold text-blue-800 text-lg">💝 Feelings Friend</p>
              <p className="text-blue-700 mb-3">Daily mood tracking</p>
              <Badge className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full border-blue-300">🔥 5/7 Days!</Badge>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200 rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="font-bold text-purple-800 text-lg">👥 Kindness Hero</p>
              <p className="text-purple-700 mb-3">Share or support others</p>
              <Badge className="bg-purple-200 text-purple-800 px-4 py-2 rounded-full border-purple-300">✨ 2/3 Done!</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-cyan-700">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-3xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            ✨ Your Magic Friend Says...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white text-xl">
                  ✨
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center text-yellow-700">
                💫
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-cyan-100 mb-4">
                <p className="text-cyan-800 text-base leading-relaxed">
                  "Hey {userName}! 🌟 I noticed you're feeling {currentMood} today - that's awesome! 
                  Based on your epic Minecraft building session, I've got the PERFECT magical challenge 
                  waiting for you! Want to turn your amazing virtual castle into a super cool story? 
                  It's going to be incredible! 🏰✨"
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => onNavigate('mentor')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl px-6 py-3 text-base font-medium shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  💬 Chat Now!
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('challenges')}
                  className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 rounded-2xl px-6 py-3 text-base"
                >
                  🎯 See Challenge
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}