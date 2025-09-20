import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { 
  Heart, 
  Sparkles, 
  Shield, 
  Users, 
  Palette, 
  Brain,
  Gamepad2,
  Home,
  User,
  Menu,
  X,
  Star,
  Smile,
  Settings,
  Moon,
  Sun,
  LogOut,
  Bell
} from 'lucide-react';
import { Toaster } from './components/ui/sonner';

// Import providers and components
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { LandingPage } from './components/LandingPage';
import { AccountSettings } from './components/AccountSettings';

// Import existing components
import { Dashboard } from './components/Dashboard';
import { MirrorMentor } from './components/MirrorMentor';
import { CreativeChallenges } from './components/CreativeChallenges';
import { MoodTracker } from './components/MoodTracker';
import { CommunitySupport } from './components/CommunitySupport';
import { ParentDashboard } from './components/ParentDashboard';

function AppContent() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [currentSection, setCurrentSection] = useState<string>('dashboard');
  const [currentMood, setCurrentMood] = useState('energetic');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mood configuration
  const moodOptions = [
    { emoji: '😊', label: 'Happy', value: 'happy', lightColor: 'text-green-700 bg-green-100 border-green-300', darkColor: 'dark:text-green-300 dark:bg-green-900/30 dark:border-green-600/50' },
    { emoji: '😌', label: 'Calm', value: 'calm', lightColor: 'text-blue-700 bg-blue-100 border-blue-300', darkColor: 'dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-600/50' },
    { emoji: '😐', label: 'Neutral', value: 'neutral', lightColor: 'text-gray-700 bg-gray-100 border-gray-300', darkColor: 'dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600/50' },
    { emoji: '😔', label: 'Sad', value: 'sad', lightColor: 'text-indigo-700 bg-indigo-100 border-indigo-300', darkColor: 'dark:text-indigo-300 dark:bg-indigo-900/30 dark:border-indigo-600/50' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated', lightColor: 'text-red-700 bg-red-100 border-red-300', darkColor: 'dark:text-red-300 dark:bg-red-900/30 dark:border-red-600/50' },
    { emoji: '😰', label: 'Anxious', value: 'anxious', lightColor: 'text-yellow-700 bg-yellow-100 border-yellow-300', darkColor: 'dark:text-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-600/50' },
    { emoji: '😴', label: 'Tired', value: 'tired', lightColor: 'text-purple-700 bg-purple-100 border-purple-300', darkColor: 'dark:text-purple-300 dark:bg-purple-900/30 dark:border-purple-600/50' },
    { emoji: '🔥', label: 'Energetic', value: 'energetic', lightColor: 'text-orange-700 bg-orange-100 border-orange-300', darkColor: 'dark:text-orange-300 dark:bg-orange-900/30 dark:border-orange-600/50' },
  ];

  const getCurrentMoodInfo = () => {
    return moodOptions.find(mood => mood.value === currentMood) || moodOptions[7]; // Default to energetic
  };

  // Show landing page if user is not authenticated
  if (!user) {
    return <LandingPage />;
  }

  const youthNavItems = [
    { id: 'dashboard', label: '🏠 My Space', icon: Home },
    { id: 'mood', label: '💝 Feelings Check', icon: Heart },
    { id: 'challenges', label: '🎨 Fun Quests', icon: Palette },
    { id: 'mentor', label: '✨ Magic Friend', icon: Sparkles },
    { id: 'community', label: '👥 Share Corner', icon: Users },
  ];

  const renderCurrentSection = () => {
    if (user.type === 'parent') {
      return <ParentDashboard />;
    }

    switch (currentSection) {
      case 'dashboard':
        return <Dashboard userName={user.name} currentMood={currentMood} onNavigate={setCurrentSection} />;
      case 'mood':
        return <MoodTracker onMoodChange={setCurrentMood} currentMood={currentMood} />;
      case 'challenges':
        return <CreativeChallenges />;
      case 'mentor':
        return <MirrorMentor userName={user.name} currentMood={currentMood} />;
      case 'community':
        return <CommunitySupport />;
      case 'settings':
        return <AccountSettings />;
      default:
        return <Dashboard userName={user.name} currentMood={currentMood} onNavigate={setCurrentSection} />;
    }
  };

  const getCurrentSectionTitle = () => {
    if (user.type === 'parent') return 'Parent Dashboard';
    if (currentSection === 'settings') return 'Account Settings';
    
    const section = youthNavItems.find(item => item.id === currentSection);
    return section ? section.label : '🏠 My Space';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/20 px-4 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Creative Mirror</h1>
            <p className="text-xs text-muted-foreground">✨ {getCurrentMoodInfo().emoji} {getCurrentMoodInfo().label}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-2xl hover:bg-white/20 dark:hover:bg-gray-800/20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-black w-80 h-full p-6 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="w-12 h-12 border-2 border-gradient-to-r from-blue-400 to-purple-400">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            {/* Navigation */}
            {user.type === 'youth' && (
              <nav className="space-y-3 mb-8">
                {youthNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentSection === item.id ? 'default' : 'ghost'}
                      className="w-full justify-start rounded-2xl text-left h-auto py-4 px-4"
                      onClick={() => {
                        setCurrentSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-base">{item.label}</span>
                    </Button>
                  );
                })}
              </nav>
            )}

            {/* Settings and Theme */}
            <div className="space-y-3 border-t border-white/20 dark:border-gray-800/20 pt-6">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-2xl"
                onClick={() => {
                  setCurrentSection('settings');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-2xl"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-2xl text-red-600 hover:text-red-700"
                onClick={logout}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex md:w-80 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-1 min-h-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-r border-white/20 dark:border-gray-800/20 shadow-2xl">
            {/* Logo */}
            <div className="flex items-center h-20 px-6 border-b border-white/20 dark:border-gray-800/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Creative Mirror</h1>
                  <p className="text-sm text-muted-foreground">✨ AI-Powered Wellness</p>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="p-6">
              <Card className="border-white/20 dark:border-gray-800/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12 border-2 border-gradient-to-r from-blue-400 to-purple-400">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="w-8 h-8"
                    >
                      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="w-full justify-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-0"
                  >
                    {user.type === 'youth' ? '🧒 Youth Account' : '👨‍👩‍👧‍👦 Parent Account'}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 pb-6 space-y-3">
              {user.type === 'youth' ? (
                youthNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentSection === item.id ? 'default' : 'ghost'}
                      className="w-full justify-start rounded-2xl text-left h-auto py-4 px-4 hover:bg-white/20 dark:hover:bg-gray-800/20 hover:shadow-lg transition-all duration-200"
                      onClick={() => setCurrentSection(item.id)}
                    >
                      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-base">{item.label}</span>
                    </Button>
                  );
                })
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10" />
                  </div>
                  <p className="text-lg font-medium">👨‍👩‍👧‍👦 Parent Mode</p>
                  <p className="text-sm">Viewing insights & progress</p>
                </div>
              )}
            </nav>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-white/20 dark:border-gray-800/20">
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-2xl"
                  onClick={() => setCurrentSection('settings')}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Account Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-2xl text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  onClick={logout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="p-6 border-t border-white/20 dark:border-gray-800/20">
              <Card className="border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600 dark:text-green-300" />
                    </div>
                    <span className="font-medium text-green-900 dark:text-green-200">🛡️ Super Safe Space</span>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                    Your secrets are safe with us! Everything you share is private and watched over by caring grown-ups. 💚
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:pl-80 flex flex-col flex-1">
          {/* Header */}
          <header className="hidden md:flex h-20 items-center px-8 border-b border-white/20 dark:border-gray-800/20 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">{getCurrentSectionTitle()}</h2>
              {user.type === 'youth' && currentSection !== 'settings' && (
                <Badge 
                  variant="secondary" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${getCurrentMoodInfo().lightColor} ${getCurrentMoodInfo().darkColor}`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Feeling: {getCurrentMoodInfo().label} {getCurrentMoodInfo().emoji}</span>
                </Badge>
              )}
            </div>
            
            <div className="ml-auto flex items-center gap-3">
              <Badge variant="outline" className="px-4 py-2 rounded-full border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30">
                <Brain className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-blue-700 dark:text-blue-300">🧠 AI Helper</span>
              </Badge>
              {user.type === 'youth' && (
                <Badge variant="outline" className="px-4 py-2 rounded-full border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/30">
                  <Gamepad2 className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="text-purple-700 dark:text-purple-300">🎮 Game Time!</span>
                </Badge>
              )}
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 md:p-8">
            {renderCurrentSection()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}