import React from 'react';
import { Button } from '../ui/button';
import {
  ArrowLeft,
  Award,
  Calendar,
  Flame,
  Languages,
  Settings,
  Trophy,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

//TODO Define props

export default function LearnLanguageProfilePanel() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* header */}
      <header className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5"></ArrowLeft>
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5"></Settings>
        </Button>
      </header>

      <div className="flex flex-col items-center mb-8">
        <div>
          <User className="h-16 w-16 text-primary-foreground"></User>
        </div>
        <h2 className="text-2xl font-bold">Sam Kenpachi</h2>
        <p className="text-muted-foreground">Learning Setswana</p>
      </div>

      {/* tabs - stats , achievements, progress, settings */}
      <Tabs defaultValue="stats" className="mb-8">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Flame className="h-8 w-8 text-orange-500" />
                <span className="text-3xl font-bold">5 days</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Keep it up! You're doing great.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["M","T","W","T","F","S","S"].map((day,i)=>(
                    <div
                    key={i} className='text-center text-sm font-medium'>
                        {day}
                    </div>
                ))}
            {[true, true, true, true, true, false, false].map((completed, i) => (
                  <div
                    key={i}
                    className={`h-10 rounded-md flex items-center justify-center ${
                      completed ? "bg-green-100 dark:bg-green-900/20" : "bg-muted"
                    }`}
                  >
                    {completed && <Award className="h-5 w-5 text-green-600" />}
                  </div>
                ))}


              </div>
                <div className="flex items-center justify-between text-sm">
                  <span>5/7 days completed</span>
                  <span className="text-muted-foreground">
                    Goal: 20 min/day
                  </span>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Speaking Skills</CardTitle>
            </CardHeader>
            <CardContent>
                              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Pronunciation</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Fluency</span>
                  <span className="text-sm text-muted-foreground">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Vocabulary</span>
                  <span className="text-sm text-muted-foreground">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'First Lesson', icon: Trophy, unlocked: true },
                  { name: '5 Day Streak', icon: Flame, unlocked: true },
                  {
                    name: 'Perfect Pronunciation',
                    icon: Languages,
                    unlocked: false,
                  },
                  { name: 'Conversation Master', icon: Award, unlocked: false },
                  { name: '30 Day Streak', icon: Calendar, unlocked: false },
                  { name: 'Vocabulary Expert', icon: Award, unlocked: false },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-4 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-primary/10'
                        : 'bg-muted opacity-50'
                    }`}
                  >
                    <achievement.icon
                      className={`h-8 w-8 mb-2 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                    <span className="text-sm text-center font-medium">
                      {achievement.name}
                    </span>
                    {!achievement.unlocked && (
                      <span className="text-xs text-muted-foreground mt-1">
                        Locked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Learning Language</span>
                <Button variant="outline">Setswana</Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Native Language</span>
                <Button variant="outline">English</Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Daily Goal</span>
                <Button variant="outline">20 minutes</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Daily Reminders</span>
                <Button variant="outline">On</Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Weekly Progress</span>
                <Button variant="outline">On</Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Achievement Alerts</span>
                <Button variant="outline">On</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
