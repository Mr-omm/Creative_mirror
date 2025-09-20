import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Sparkles, Heart, Send, Gamepad2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
  mood?: string;
}

interface MirrorMentorProps {
  userName: string;
  currentMood: string;
}

export function MirrorMentor({ userName, currentMood }: MirrorMentorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi there, ${userName}! 🌟 I'm so excited to chat with you today! I saw your amazing Minecraft building session - wow, you're so creative! 🏰✨ Want to turn your awesome creation into a magical story or super cool art project? I have some really fun ideas! 🎨`,
      sender: 'mentor',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const mentorResponses = [
    "Wow, that sounds super creative! 🌟 Based on your awesome gaming session, I have the most amazing challenge that will help you shine even brighter! ✨",
    "I can tell you might be feeling a little mixed up inside, and that's totally okay! 💙 Would you like to try a super fun art activity to help your feelings feel better? 🎨",
    "Your gaming style today reminds me of a real-life inventor! 🚀 You're so smart! Want to turn your amazing virtual builds into real-world magic? ⭐",
    "I noticed you were solving so many puzzles in your game - you're like a problem-solving superhero! 🦸‍♀️ How about we use those superpowers on something that's been on your mind? 💫",
    "That's so cool! 😄 Tell me more about what you were thinking! I love hearing about your ideas! 🌈",
    "You're doing such a great job sharing with me! 🤗 I'm so proud of you for being brave and talking about your feelings! 💪✨"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      mood: currentMood,
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Simulate AI response
    setTimeout(() => {
      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: mentorResponses[Math.floor(Math.random() * mentorResponses.length)],
        sender: 'mentor',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, mentorMessage]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <Card className="h-full flex flex-col border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl">
      <CardHeader className="pb-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-t-lg">
        <CardTitle className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white text-xl">
                ✨
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center text-yellow-700 text-xs">
              💫
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">✨ Magic Friend</h3>
            <p className="text-sm text-purple-600">Your caring AI buddy</p>
          </div>
          <Badge className="bg-pink-200 text-pink-700 border-pink-300 px-3 py-1 rounded-full">
            <Heart className="w-3 h-3 mr-1" />
            💝 Super Kind
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'mentor' && (
                  <div className="relative mt-1">
                    <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 text-white text-lg">
                        ✨
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-300 rounded-full flex items-center justify-center text-xs">
                      💫
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-4 rounded-3xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white border-2 border-blue-200'
                      : 'bg-white border-2 border-purple-100'
                  }`}
                >
                  <p className={`text-base leading-relaxed ${message.sender === 'user' ? 'text-white' : 'text-purple-800'}`}>{message.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.mood && (
                      <Badge variant="outline" className="text-xs">
                        Feeling: {message.mood}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder="Tell me how you're feeling or what's on your mind..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-2 text-xs text-muted-foreground">
          <Gamepad2 className="w-4 h-4" />
          <span>Last game session analyzed • Mood-aware responses • 100% confidential</span>
        </div>
      </CardContent>
    </Card>
  );
}