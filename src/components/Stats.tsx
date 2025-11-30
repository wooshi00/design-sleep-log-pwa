import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Award, AlertCircle } from "lucide-react";

interface StatsProps {
  sleepLogs: any[];
}

export function Stats({ sleepLogs }: StatsProps) {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const getWeeklyData = () => {
    const last7Days = getLast7Days();
    return last7Days.map((date) => {
      const log = sleepLogs.find((l) => l.date === date);
      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        hours: log ? log.hours : 0,
        quality: log ? log.quality : 0,
      };
    });
  };

  const calculateSleepDebt = () => {
    const last7Days = getLast7Days();
    const idealHours = 8;
    let debt = 0;

    last7Days.forEach((date) => {
      const log = sleepLogs.find((l) => l.date === date);
      const actualHours = log ? log.hours : 0;
      debt += Math.max(0, idealHours - actualHours);
    });

    return debt.toFixed(1);
  };

  const getBestStreak = () => {
    if (sleepLogs.length === 0) return 0;

    const sortedLogs = [...sleepLogs].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedLogs.length; i++) {
      const prevDate = new Date(sortedLogs[i - 1].date);
      const currDate = new Date(sortedLogs[i].date);
      const diffDays = Math.round(
        (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  };

  const weeklyData = getWeeklyData();
  const sleepDebt = calculateSleepDebt();
  const bestStreak = getBestStreak();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-purple-100">Sleep Statistics</h2>
        <p className="text-purple-300">Track your sleep patterns and progress</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-purple-100">Best Streak</CardTitle>
            <Award className="w-6 h-6 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-white">{bestStreak}</span>
                <span className="text-purple-300">days</span>
              </div>
              <p className="text-purple-300">Your personal record!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-red-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-red-100">Sleep Debt (7 days)</CardTitle>
            <AlertCircle className="w-6 h-6 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-white">{sleepDebt}</span>
                <span className="text-red-300">hours</span>
              </div>
              <p className="text-red-300">
                {parseFloat(sleepDebt) < 5 ? "Great job!" : "Try to catch up"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Hours Chart */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-100">
            <TrendingUp className="w-6 h-6" />
            Weekly Sleep Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sleepLogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-purple-300">No data yet. Start logging your sleep to see charts!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                <XAxis dataKey="date" stroke="#c4b5fd" />
                <YAxis stroke="#c4b5fd" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1b4b",
                    border: "1px solid #6b46c1",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="hours" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9d7ff5" />
                    <stop offset="100%" stopColor="#6b46c1" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Quality Trend Chart */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-700/50">
        <CardHeader>
          <CardTitle className="text-purple-100">Sleep Quality Trend</CardTitle>
        </CardHeader>
        <CardContent>
          {sleepLogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-purple-300">No data yet. Start logging your sleep to see trends!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                <XAxis dataKey="date" stroke="#c4b5fd" />
                <YAxis stroke="#c4b5fd" domain={[0, 5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e1b4b",
                    border: "1px solid #6b46c1",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="quality"
                  stroke="#e91e8c"
                  strokeWidth={3}
                  dot={{ fill: "#e91e8c", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-600/30">
        <CardContent className="py-6">
          <h3 className="text-white mb-3">Sleep Insights</h3>
          <ul className="space-y-2 text-purple-200">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Aim for 8-10 hours of sleep per night for optimal rest</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Consistent sleep schedules improve sleep quality</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Keep your room cool, dark, and quiet for better sleep</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
