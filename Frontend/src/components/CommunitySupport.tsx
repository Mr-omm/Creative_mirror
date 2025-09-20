import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Share2, 
  Shield, 
  Star,
  BookOpen,
  Headphones,
  UserPlus,
  Lock
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommunityPost {
  id: string;
  author: string;
  content: string;
  type: 'story' | 'art' | 'support' | 'achievement';
  timestamp: Date;
  likes: number;
  comments: number;
  isAnonymous: boolean;
  tags: string[];
}

interface SupportResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'hotline' | 'chat';
  isEmergency?: boolean;
}

export function CommunitySupport() {
  const [posts] = useState<CommunityPost[]>([
    {
      id: '1',
      author: 'CreativeBuilder23',
      content: 'Just finished my first digital art piece inspired by my Minecraft world! It really helped me process some tough feelings today. Art therapy through gaming is real! 🎨',
      type: 'achievement',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      likes: 12,
      comments: 5,
      isAnonymous: false,
      tags: ['creativity', 'mindfulness', 'art'],
    },
    {
      id: '2',
      author: 'Anonymous',
      content: 'Been feeling really anxious about school lately. Gaming used to be my escape but now even that feels overwhelming. Anyone else feel this way?',
      type: 'support',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      likes: 8,
      comments: 12,
      isAnonymous: true,
      tags: ['anxiety', 'school', 'support'],
    },
    {
      id: '3',
      author: 'QuestMaster99',
      content: 'Sharing the story I wrote about my character\'s journey through depression. Writing it helped me understand my own feelings better.',
      type: 'story',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      likes: 24,
      comments: 8,
      isAnonymous: false,
      tags: ['creative-writing', 'mental-health', 'storytelling'],
    },
  ]);

  const [supportResources] = useState<SupportResource[]>([
    {
      id: '1',
      title: 'Crisis Text Line',
      description: 'Free 24/7 support for people in crisis. Text HOME to 741741.',
      type: 'hotline',
      isEmergency: true,
    },
    {
      id: '2',
      title: 'Teen Mental Health First Aid',
      description: 'Learn to recognize signs of mental health challenges in yourself and friends.',
      type: 'article',
    },
    {
      id: '3',
      title: 'Mindfulness for Gamers',
      description: 'Guided meditation specifically designed for young gamers dealing with stress.',
      type: 'video',
    },
    {
      id: '4',
      title: 'Peer Support Chat',
      description: 'Connect with trained peer counselors in our moderated chat rooms.',
      type: 'chat',
    },
  ]);

  const getPostTypeIcon = (type: CommunityPost['type']) => {
    switch (type) {
      case 'story': return <BookOpen className="w-4 h-4" />;
      case 'art': return <Heart className="w-4 h-4" />;
      case 'support': return <Users className="w-4 h-4" />;
      case 'achievement': return <Star className="w-4 h-4" />;
    }
  };

  const getPostTypeColor = (type: CommunityPost['type']) => {
    switch (type) {
      case 'story': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'art': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'support': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'achievement': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getResourceIcon = (type: SupportResource['type']) => {
    switch (type) {
      case 'article': return <BookOpen className="w-5 h-5" />;
      case 'video': return <Headphones className="w-5 h-5" />;
      case 'hotline': return <MessageCircle className="w-5 h-5" />;
      case 'chat': return <Users className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Safe Community</h2>
          <p className="text-muted-foreground">Connect, share, and support each other</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">Moderated & Safe</span>
        </div>
      </div>

      <Tabs defaultValue="community" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="community">Community Feed</TabsTrigger>
          <TabsTrigger value="resources">Support Resources</TabsTrigger>
          <TabsTrigger value="create">Share Something</TabsTrigger>
        </TabsList>

        <TabsContent value="community" className="mt-6">
          <div className="space-y-4">
            {/* Community Guidelines */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Community Guidelines</span>
                </div>
                <p className="text-sm text-blue-700">
                  This is a safe space for sharing and support. Be kind, respectful, and remember that everyone is on their own journey. All posts are moderated by trained professionals.
                </p>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>
                        {post.isAnonymous ? '?' : post.author.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">
                          {post.isAnonymous ? 'Anonymous' : post.author}
                        </span>
                        {post.isAnonymous && (
                          <Lock className="w-3 h-3 text-muted-foreground" />
                        )}
                        <Badge className={getPostTypeColor(post.type)}>
                          {getPostTypeIcon(post.type)}
                          <span className="ml-1 capitalize">{post.type}</span>
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {post.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-sm mb-3">{post.content}</p>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className="space-y-4">
            {/* Emergency Resources */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Need Help Right Now?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {supportResources.filter(r => r.isEmergency).map((resource) => (
                    <div key={resource.id} className="flex items-center gap-3 p-3 bg-white border border-red-200 rounded-lg">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <p className="font-medium text-red-900">{resource.title}</p>
                        <p className="text-sm text-red-700">{resource.description}</p>
                      </div>
                      <Button variant="destructive">
                        Get Help Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* General Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {supportResources.filter(r => !r.isEmergency).map((resource) => (
                    <div key={resource.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                      <Button variant="outline">
                        Access
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Help */}
            <Card>
              <CardHeader>
                <CardTitle>Find Professional Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Sometimes we need extra support. Here are resources to find professional help in your area.
                  </p>
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Find a Therapist
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Online Counseling
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Share with the Community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <BookOpen className="w-6 h-6" />
                  <span>Share a Story</span>
                  <span className="text-xs text-muted-foreground">Creative writing inspired by gaming</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Heart className="w-6 h-6" />
                  <span>Share Art</span>
                  <span className="text-xs text-muted-foreground">Digital art or creative projects</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Users className="w-6 h-6" />
                  <span>Ask for Support</span>
                  <span className="text-xs text-muted-foreground">Get help from the community</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Star className="w-6 h-6" />
                  <span>Share Achievement</span>
                  <span className="text-xs text-muted-foreground">Celebrate your progress</span>
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Privacy & Safety</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You can choose to post anonymously. All content is reviewed by trained moderators before going live. Your safety and privacy are our top priorities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}