import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Moon, 
  Sun, 
  Camera, 
  Save,
  LogOut,
  Trash2,
  Settings
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AccountSettings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [parentalControls, setParentalControls] = useState(user?.type === 'youth');

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    toast.success('Profile updated successfully! 🎉');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
  };

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    toast.error('Account deletion would require confirmation');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-muted-foreground">Manage your Creative Mirror experience</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/20 backdrop-blur-sm">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-gradient-to-r from-blue-400 to-purple-400">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge 
                    variant="outline" 
                    className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
                  >
                    {user.type === 'youth' ? '🧒 Youth Account' : '👨‍👩‍👧‍👦 Parent Account'}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedName : user.name}
                    onChange={(e) => setEditedName(e.target.value)}
                    disabled={!isEditing}
                    className="bg-background/50 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editedEmail : user.email}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    disabled={!isEditing}
                    className="bg-background/50 border-white/20"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-emerald-500 to-blue-500">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium flex items-center gap-2">
                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>

              <Separator className="bg-white/20" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Push Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for new challenges and messages
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get weekly progress reports via email
                  </p>
                </div>
                <Switch
                  checked={emailUpdates}
                  onCheckedChange={setEmailUpdates}
                />
              </div>

              {user.type === 'youth' && (
                <>
                  <Separator className="bg-white/20" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Parental Controls
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow parents to view progress and activity
                      </p>
                    </div>
                    <Switch
                      checked={parentalControls}
                      onCheckedChange={setParentalControls}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg border border-green-200 dark:border-green-700">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">🔒 End-to-End Encryption</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    All your conversations with the AI Mirror Mentor are encrypted and private.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">👤 Anonymous Community</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your community posts are anonymous by default to protect your identity.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">🛡️ Professional Moderation</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Our community is monitored by mental health professionals for safety.
                  </p>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Download My Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Terms of Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card className="border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Account Actions</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                    These actions will affect your account permanently. Please proceed with caution.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-2">
                <h4 className="font-medium">Account Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Account Type</p>
                    <p className="font-medium">{user.type === 'youth' ? 'Youth' : 'Parent'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Member Since</p>
                    <p className="font-medium">January 2024</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account ID</p>
                    <p className="font-medium font-mono text-xs">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}