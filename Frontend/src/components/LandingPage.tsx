import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { AuthForms } from './AuthForms';
import { useTheme } from './ThemeProvider';
import { 
  Sparkles, 
  Shield, 
  Heart, 
  Users, 
  Brain,
  Gamepad2,
  Palette,
  Star,
  Moon,
  Sun,
  ArrowRight,
  Check,
  Zap,
  Lock,
  Globe
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: Brain,
      title: "AI Mirror Mentor",
      description: "Your personal AI companion that understands your emotions and guides your growth journey.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Gamepad2,
      title: "Gaming Integration",
      description: "Transform your gaming sessions into personalized creative challenges and emotional insights.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Palette,
      title: "Creative Challenges",
      description: "AI-generated art, writing, and creative projects tailored to your gaming style and mood.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Advanced AI analyzes your emotional patterns and provides personalized wellness insights.",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Safe Community",
      description: "Connect with peers in a professionally moderated, anonymous, and supportive environment.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "End-to-end encryption, anonymous posting, and complete confidentiality guaranteed.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "95%", label: "Improved Mood" },
    { number: "24/7", label: "AI Support" },
    { number: "100%", label: "Private & Safe" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Creative Mirror
              </h1>
              <p className="text-xs text-white/60">AI-Powered Mental Wellness</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAuth(true)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Sign In
            </Button>
            <Button
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/10 border-white/20 text-white backdrop-blur-sm">
            <Sparkles className="w-3 h-3 mr-1" />
            Next-Generation Mental Wellness
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Transform Gaming into
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Emotional Growth
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
            AI-powered platform that turns your gaming sessions into personalized creative challenges,
            emotional insights, and mental wellness support - completely confidential and stigma-free.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-lg px-8 py-6 shadow-2xl"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              <Shield className="w-5 h-5 mr-2" />
              For Parents
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Our cutting-edge technology combines gaming analysis, mood detection, and creative AI to provide 
            personalized mental wellness support that adapts to your unique journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Privacy & Safety Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Privacy is Our Priority
            </h2>
            <p className="text-xl text-white/80">
              We've built Creative Mirror with privacy-first design to ensure your mental health journey remains completely confidential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20">
              <CardContent className="p-8 text-center">
                <Lock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">End-to-End Encryption</h3>
                <p className="text-white/70 text-sm">All conversations and data are encrypted and never shared with third parties.</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">Anonymous Community</h3>
                <p className="text-white/70 text-sm">Share and connect without revealing your identity in our safe space.</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">Professional Moderation</h3>
                <p className="text-white/70 text-sm">Mental health professionals monitor our platform for safety and support.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <Card className="border-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20">
          <CardContent className="p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Ready to Transform Your Gaming into Growth?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of young people already using Creative Mirror to build emotional resilience, 
              creativity, and mental wellness through AI-powered gaming insights.
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-lg px-12 py-6 shadow-2xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-12 border-t border-white/10">
        <div className="text-center text-white/60">
          <p>&copy; 2024 Creative Mirror. Transforming gaming into emotional growth.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

      {/* Auth Dialog */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="max-w-md p-0 bg-transparent border-0 shadow-none">
          <DialogTitle className="sr-only">Sign In or Sign Up</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new account or sign in to your existing Creative Mirror account to access AI-powered mental wellness features.
          </DialogDescription>
          <AuthForms onClose={() => setShowAuth(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}