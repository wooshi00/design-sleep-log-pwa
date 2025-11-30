import { useState } from "react";
import { Bell, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

export function Reminders() {
  const [bedtimeEnabled, setBedtimeEnabled] = useState(false);
  const [bedtimeReminder, setBedtimeReminder] = useState("22:00");
  const [waketimeEnabled, setWaketimeEnabled] = useState(false);
  const [waketimeReminder, setWaketimeReminder] = useState("07:00");

  const handleSave = () => {
    // In a real app, this would save to localStorage or database
    alert("Reminders saved! (This is a demo - notifications would require PWA service worker)");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-purple-100">Sleep Reminders</h2>
        <p className="text-purple-300">
          Set notifications to help maintain a consistent sleep schedule
        </p>
      </div>

      {/* Bedtime Reminder */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-700/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white">Bedtime Reminder</h3>
                <p className="text-purple-300">Get notified when it's time to sleep</p>
              </div>
            </div>
            <Switch
              checked={bedtimeEnabled}
              onCheckedChange={setBedtimeEnabled}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bedtime" className="text-purple-200">
              Reminder Time
            </Label>
            <Input
              id="bedtime"
              type="time"
              value={bedtimeReminder}
              onChange={(e) => setBedtimeReminder(e.target.value)}
              disabled={!bedtimeEnabled}
              className="bg-purple-950/50 border-purple-600/50 text-white disabled:opacity-50"
            />
          </div>
          {bedtimeEnabled && (
            <div className="bg-purple-950/30 rounded-lg p-4 border border-purple-700/30">
              <p className="text-purple-200">
                You'll receive a notification at <strong className="text-white">{bedtimeReminder}</strong> to start winding down for bed.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wake Time Reminder */}
      <Card className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 border-orange-700/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white">Wake Time Reminder</h3>
                <p className="text-orange-200">Get notified when it's time to wake up</p>
              </div>
            </div>
            <Switch
              checked={waketimeEnabled}
              onCheckedChange={setWaketimeEnabled}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-600 data-[state=checked]:to-yellow-600"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="waketime" className="text-orange-200">
              Reminder Time
            </Label>
            <Input
              id="waketime"
              type="time"
              value={waketimeReminder}
              onChange={(e) => setWaketimeReminder(e.target.value)}
              disabled={!waketimeEnabled}
              className="bg-orange-950/50 border-orange-600/50 text-white disabled:opacity-50"
            />
          </div>
          {waketimeEnabled && (
            <div className="bg-orange-950/30 rounded-lg p-4 border border-orange-700/30">
              <p className="text-orange-200">
                You'll receive a notification at <strong className="text-white">{waketimeReminder}</strong> to help you wake up on time.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg"
      >
        <Bell className="w-5 h-5 mr-2" />
        Save Reminders
      </Button>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-600/30">
        <CardContent className="py-6 space-y-3">
          <div className="flex items-start gap-2">
            <Bell className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="text-white">About Notifications</h3>
              <p className="text-purple-200">
                To receive notifications, you'll need to:
              </p>
              <ul className="space-y-1 text-purple-300 ml-4">
                <li>• Install this app to your home screen</li>
                <li>• Grant notification permissions when prompted</li>
                <li>• Keep the app installed on your device</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700/30">
        <CardContent className="py-6">
          <h3 className="text-white mb-3">Sleep Schedule Tips</h3>
          <ul className="space-y-2 text-purple-200">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Try to go to bed and wake up at the same time every day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Set your bedtime 8-10 hours before your wake time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Start winding down 30-60 minutes before bedtime</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
