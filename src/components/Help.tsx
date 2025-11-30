import { HelpCircle, Moon, BarChart3, Music, Bell, Upload, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Help() {
  const features = [
    {
      icon: Moon,
      title: "Sleep Log",
      description: "Track your sleep by entering bedtime, wake time, and quality ratings. View your complete sleep history in an organized table.",
      color: "from-purple-600 to-blue-600",
      steps: [
        "Enter your bedtime and wake time",
        "Rate your sleep quality using the emoji slider",
        "Add optional notes about your sleep",
        "Click 'Add Sleep Log' to save your entry",
      ],
    },
    {
      icon: BarChart3,
      title: "Statistics",
      description: "Visualize your sleep patterns with charts and track important metrics like streaks and sleep debt.",
      color: "from-blue-600 to-cyan-600",
      steps: [
        "View weekly bar charts of your sleep hours",
        "Track your sleep quality trends over time",
        "Monitor your current streak and best record",
        "Keep an eye on your sleep debt",
      ],
    },
    {
      icon: Music,
      title: "Sleep Sounds",
      description: "Play calming sounds to help you relax and fall asleep more easily.",
      color: "from-purple-600 to-pink-600",
      steps: [
        "Choose from rain, white noise, ocean, or wind sounds",
        "Click play to start the sound",
        "Adjust the volume to your preference",
        "Let the sounds help you drift off to sleep",
      ],
    },
    {
      icon: Bell,
      title: "Reminders",
      description: "Set notifications for bedtime and wake time to maintain a consistent sleep schedule.",
      color: "from-orange-600 to-yellow-600",
      steps: [
        "Toggle on the bedtime or wake time reminder",
        "Set your preferred notification time",
        "Click 'Save Reminders' to activate",
        "Grant notification permissions when prompted",
      ],
    },
    {
      icon: Upload,
      title: "Upload Schedule",
      description: "Import your schedule to visualize busy days and plan your sleep accordingly.",
      color: "from-indigo-600 to-purple-600",
      steps: [
        "Prepare a CSV file with your schedule",
        "Click the upload area and select your file",
        "View your week with color-coded activity levels",
        "Plan better sleep on busy days",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-block">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-purple-100">How to Use The Sleep Coach</h2>
        <p className="text-purple-300 max-w-2xl mx-auto">
          Your complete guide to tracking sleep and building better rest habits
        </p>
      </div>

      {/* Getting Started */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-100">
            <Sparkles className="w-6 h-6" />
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-purple-200">
            Welcome to The Sleep Coach! This app helps you track your sleep, understand your patterns, and improve your rest.
          </p>
          <div className="bg-purple-950/30 rounded-lg p-4 space-y-2">
            <p className="text-white">Quick Start Tips:</p>
            <ul className="space-y-1 text-purple-300 ml-4">
              <li>• Start by logging your sleep each morning</li>
              <li>• Check your stats weekly to spot patterns</li>
              <li>• Use sleep sounds to help you relax</li>
              <li>• Set reminders to maintain consistency</li>
              <li>• Install the app for quick access</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card
            key={index}
            className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-700/30"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white">{feature.title}</h3>
                  <p className="text-purple-300">{feature.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-purple-200">How to use:</p>
                <ol className="space-y-2 ml-4">
                  {feature.steps.map((step, stepIndex) => (
                    <li
                      key={stepIndex}
                      className="text-purple-300 flex items-start gap-2"
                    >
                      <span className="text-purple-400 font-semibold flex-shrink-0">
                        {stepIndex + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Sleep Tips */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-blue-100">Sleep Tips for Teens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-purple-200">
            <p>
              Teenagers need 8-10 hours of sleep per night. Here are some tips to help you get better rest:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Keep a consistent sleep schedule, even on weekends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Avoid screens 30-60 minutes before bed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Keep your room cool, dark, and quiet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Avoid caffeine after 2 PM</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Exercise regularly, but not right before bed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>Create a relaxing bedtime routine</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-600/30">
        <CardContent className="py-6">
          <h3 className="text-white mb-2">Privacy & Data</h3>
          <p className="text-purple-200">
            All your sleep data is stored locally on your device. Your information stays private and is never shared with anyone. You can clear your data anytime from your browser settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}