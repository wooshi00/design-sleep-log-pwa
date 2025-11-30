import { Moon, TrendingUp, Award, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DashboardProps {
  sleepLogs: any[];
}

export function Dashboard({ sleepLogs }: DashboardProps) {
  const calculateStreak = () => {
    if (sleepLogs.length === 0) return 0;
    
    const sortedLogs = [...sleepLogs].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedLogs.length; i++) {
      const logDate = new Date(sortedLogs[i].date);
      logDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (logDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateAverageSleep = () => {
    if (sleepLogs.length === 0) return 0;
    
    const totalHours = sleepLogs.reduce((sum, log) => sum + log.hours, 0);
    return (totalHours / sleepLogs.length).toFixed(1);
  };

  const getAverageQuality = () => {
    if (sleepLogs.length === 0) return 0;
    
    const totalQuality = sleepLogs.reduce((sum, log) => sum + log.quality, 0);
    return Math.round(totalQuality / sleepLogs.length);
  };

  const streak = calculateStreak();
  const avgSleep = calculateAverageSleep();
  const avgQuality = getAverageQuality();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-block">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <Moon className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="bg-gradient-to-r from-purple-200 via-purple-100 to-pink-200 bg-clip-text text-transparent">
          Welcome to The Sleep Coach
        </h1>
        <p className="text-purple-200 max-w-2xl mx-auto">
          Track your sleep, build healthy habits, and wake up refreshed. Your journey to better rest starts here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 border-purple-700/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-purple-100">Current Streak</CardTitle>
            <Award className="w-6 h-6 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-white">{streak}</span>
                <span className="text-purple-300">days</span>
              </div>
              <p className="text-purple-300">Keep it going!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/30 border-blue-700/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-blue-100">Total Logs</CardTitle>
            <Moon className="w-6 h-6 text-blue-300" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-white">{sleepLogs.length}</span>
                <span className="text-blue-300">entries</span>
              </div>
              <p className="text-blue-300">Great progress!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-900/40 to-pink-800/30 border-pink-700/50 hover:shadow-lg hover:shadow-pink-500/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-pink-100">Avg Sleep</CardTitle>
            <Clock className="w-6 h-6 text-pink-300" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-white">{avgSleep}</span>
                <span className="text-pink-300">hours</span>
              </div>
              <p className="text-pink-300">
                {parseFloat(avgSleep) >= 8 ? "Perfect!" : "Aim for 8-10hrs"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-800/30 border-purple-700/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-purple-100">Sleep Quality</CardTitle>
            <TrendingUp className="w-6 h-6 text-purple-300" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-white">{avgQuality}</span>
                <span className="text-purple-300">/ 5</span>
              </div>
              <p className="text-purple-300">
                {avgQuality >= 4 ? "Excellent!" : "You've got this"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PWA Install Prompt */}
      <Card className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 border-purple-600/50">
        <CardContent className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-white mb-1">Install The Sleep Coach</h3>
                <p className="text-purple-200">
                  Add to your home screen for quick access and offline support
                </p>
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg hover:shadow-purple-500/50">
              Add to Home Screen
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="text-center space-y-4">
        <h3 className="text-purple-100">Quick Start</h3>
        <p className="text-purple-300">
          Get started by logging your first sleep entry or explore the sleep sounds to help you relax.
        </p>
      </div>
    </div>
  );
}