import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Github, Twitter, Edit2, ChevronDown } from 'lucide-react'

interface ProfileStats {
  easy: { solved: number; total: number }
  medium: { solved: number; total: number }
  hard: { solved: number; total: number }
  totalSolved: number
  totalQuestions: number
  attempting: number
  rank: number
  activeDays: number
  maxStreak: number
}

const stats: ProfileStats = {
  easy: { solved: 31, total: 831 },
  medium: { solved: 5, total: 1748 },
  hard: { solved: 0, total: 760 },
  totalSolved: 36,
  totalQuestions: 3339,
  attempting: 2,
  rank: 2020757,
  activeDays: 25,
  maxStreak: 4
}

const dailyPracticeData = [
  { date: '2023-10-01', problems: 3 },
  { date: '2023-10-02', problems: 5 },
  { date: '2023-10-03', problems: 2 },
  { date: '2023-10-04', problems: 4 },
  { date: '2023-10-05', problems: 6 },
  { date: '2023-10-06', problems: 1 },
  { date: '2023-10-07', problems: 3 },
  { date: '2023-10-08', problems: 4 },
  { date: '2023-10-09', problems: 2 },
  { date: '2023-10-10', problems: 5 },
  { date: '2023-10-11', problems: 3 },
  { date: '2023-10-12', problems: 4 },
  { date: '2023-10-13', problems: 2 },
  { date: '2023-10-14', problems: 6 },
]

export default function Profile() {
  const [currentView, setCurrentView] = useState('Current')

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <aside className="w-64 p-6 flex flex-col space-y-6 border-r">
        <div className="flex flex-col items-center text-center">
          <img
            src="/placeholder.svg?height=100&width=100"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h1 className="text-xl font-bold">Guilherme Bayer</h1>
          <p className="text-muted-foreground">iamgbayer</p>
          <p className="mt-2">Rank {stats.rank.toLocaleString()}</p>
        </div>

        <Button className="w-full" variant="outline">
          <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
        </Button>

        <div className="flex flex-col gap-2">
          <a href="https://twitter.com/iamgbayer" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Twitter className="h-4 w-4" /> Twitter
          </a>
          <a href="https://github.com/iamgbayer" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Progress Circle */}
            <div className="flex flex-col items-center justify-start">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-4xl font-bold">{stats.totalSolved}</div>
                  <div className="text-sm text-muted-foreground">/{stats.totalQuestions}</div>
                  <div className="text-sm text-green-500 mt-2">Solved</div>
                </div>
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 120}
                    strokeDashoffset={2 * Math.PI * 120 * (1 - stats.totalSolved / stats.totalQuestions)}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#84cc16" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </div>
              <div className="mt-4 text-center text-muted-foreground">
                {stats.attempting} Attempting
              </div>
            </div>

            {/* Daily Practice Graph */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Daily Practice</h2>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Problem Statistics */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-500">Easy</span>
                    <span>{stats.easy.solved}/{stats.easy.total}</span>
                  </div>
                  <Progress value={(stats.easy.solved / stats.easy.total) * 100} className="bg-muted" />

                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500">Medium</span>
                    <span>{stats.medium.solved}/{stats.medium.total}</span>
                  </div>
                  <Progress value={(stats.medium.solved / stats.medium.total) * 100} className="bg-muted" />

                  <div className="flex justify-between items-center">
                    <span className="text-red-500">Hard</span>
                    <span>{stats.hard.solved}/{stats.hard.total}</span>
                  </div>
                  <Progress value={(stats.hard.solved / stats.hard.total) * 100} className="bg-muted" />
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Badges</h2>
                <div className="text-center p-8">
                  <div className="text-4xl font-bold">0</div>
                  <p className="text-muted-foreground mt-2">No badges earned yet</p>
                </div>
              </CardContent>
            </Card>

            {/* Activity Calendar */}
            <div>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div>Total active days: {stats.activeDays}</div>
                <div>Max streak: {stats.maxStreak}</div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  Current <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-52 gap-1">
                {Array.from({ length: 52 * 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-muted rounded-sm"
                    style={{
                      opacity: Math.random() > 0.8 ? 0.8 : 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}