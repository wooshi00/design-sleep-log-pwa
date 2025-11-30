import { useState } from "react";
import { Moon, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SleepLogProps {
  sleepLogs: any[];
  onAddLog: (log: any) => void;
  onDeleteLog: (id: string) => void;
}

export function SleepLog({ sleepLogs, onAddLog, onDeleteLog }: SleepLogProps) {
  const [bedtimeHour, setBedtimeHour] = useState("");
  const [bedtimeMinute, setBedtimeMinute] = useState("00");
  const [bedtimePeriod, setBedtimePeriod] = useState("PM");
  
  const [waketimeHour, setWaketimeHour] = useState("");
  const [waketimeMinute, setWaketimeMinute] = useState("00");
  const [waketimePeriod, setWaketimePeriod] = useState("AM");
  
  const [quality, setQuality] = useState(3);
  const [notes, setNotes] = useState("");

  const qualityEmojis = ["😫", "😟", "😐", "😊", "🤩"];

  // Convert 12-hour time to 24-hour format
  const convertTo24Hour = (hour: string, minute: string, period: string): string => {
    let hour24 = parseInt(hour);
    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }
    return `${hour24.toString().padStart(2, "0")}:${minute}`;
  };

  // Convert 24-hour time to 12-hour format with AM/PM
  const convertTo12Hour = (time24: string): string => {
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr);
    const period = hour >= 12 ? "PM" : "AM";
    
    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour -= 12;
    }
    
    return `${hour}:${minute} ${period}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bedtimeHour || !waketimeHour) return;

    // Convert to 24-hour format for calculation
    const bedtime24 = convertTo24Hour(bedtimeHour, bedtimeMinute, bedtimePeriod);
    const waketime24 = convertTo24Hour(waketimeHour, waketimeMinute, waketimePeriod);

    // Create date objects for calculation
    const bedDate = new Date(`2000-01-01T${bedtime24}:00`);
    let wakeDate = new Date(`2000-01-01T${waketime24}:00`);
    
    // If wake time is earlier than bedtime, assume it's the next day
    if (wakeDate <= bedDate) {
      wakeDate = new Date(`2000-01-02T${waketime24}:00`);
    }
    
    const hours = (wakeDate.getTime() - bedDate.getTime()) / (1000 * 60 * 60);

    const log = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      bedtime: bedtime24,
      waketime: waketime24,
      hours: Math.round(hours * 10) / 10,
      quality,
      notes,
    };

    onAddLog(log);
    setBedtimeHour("");
    setBedtimeMinute("00");
    setBedtimePeriod("PM");
    setWaketimeHour("");
    setWaketimeMinute("00");
    setWaketimePeriod("AM");
    setQuality(3);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      {/* Entry Form */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-100">
            <Moon className="w-6 h-6" />
            Log Your Sleep
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bedtime Section */}
            <div className="space-y-2">
              <Label className="text-purple-200">Bedtime</Label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="bedtime-hour" className="text-purple-300 text-sm">
                    Hour
                  </Label>
                  <Select value={bedtimeHour} onValueChange={setBedtimeHour}>
                    <SelectTrigger
                      id="bedtime-hour"
                      className="bg-purple-950/50 border-purple-600/50 text-white"
                    >
                      <SelectValue placeholder="12" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                        <SelectItem key={h} value={h.toString()}>
                          {h}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bedtime-minute" className="text-purple-300 text-sm">
                    Minute
                  </Label>
                  <Select value={bedtimeMinute} onValueChange={setBedtimeMinute}>
                    <SelectTrigger
                      id="bedtime-minute"
                      className="bg-purple-950/50 border-purple-600/50 text-white"
                    >
                      <SelectValue placeholder="00" />
                    </SelectTrigger>
                    <SelectContent>
                      {["00", "15", "30", "45"].map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bedtime-period" className="text-purple-300 text-sm">
                    AM/PM
                  </Label>
                  <Select value={bedtimePeriod} onValueChange={setBedtimePeriod}>
                    <SelectTrigger
                      id="bedtime-period"
                      className="bg-purple-950/50 border-purple-600/50 text-white"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Wake Time Section */}
            <div className="space-y-2">
              <Label className="text-purple-200">Wake Time</Label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="waketime-hour" className="text-purple-300 text-sm">
                    Hour
                  </Label>
                  <Select value={waketimeHour} onValueChange={setWaketimeHour}>
                    <SelectTrigger
                      id="waketime-hour"
                      className="bg-purple-950/50 border-purple-600/50 text-white"
                    >
                      <SelectValue placeholder="7" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                        <SelectItem key={h} value={h.toString()}>
                          {h}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="waketime-minute" className="text-purple-300 text-sm">
                    Minute
                  </Label>
                  <Select value={waketimeMinute} onValueChange={setWaketimeMinute}>
                    <SelectTrigger
                      id="waketime-minute"
                      className="bg-purple-950/50 border-purple-600/50 text-white"
                    >
                      <SelectValue placeholder="00" />
                    </SelectTrigger>
                    <SelectContent>
                      {["00", "15", "30", "45"].map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="waketime-period" className="text-purple-300 text-sm">
                    AM/PM
                  </Label>
                  <Select value={waketimePeriod} onValueChange={setWaketimePeriod}>
                    <SelectTrigger
                      id="waketime-period"
                      className="bg-purple-950/50 border-purple-600/50 text-white"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-purple-200">
                Sleep Quality: {qualityEmojis[quality - 1]}
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-purple-300">Poor</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="flex-1 h-3 bg-purple-950/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                />
                <span className="text-purple-300">Great</span>
              </div>
              <div className="flex justify-between px-2">
                {qualityEmojis.map((emoji, index) => (
                  <span
                    key={index}
                    className={`transition-all ${
                      quality === index + 1 ? "scale-125" : "opacity-50"
                    }`}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-purple-200">
                Notes (optional)
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did you feel? Any dreams?"
                className="bg-purple-950/50 border-purple-600/50 text-white placeholder:text-purple-400 min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Sleep Log
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Log History */}
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-blue-100">Sleep History</CardTitle>
        </CardHeader>
        <CardContent>
          {sleepLogs.length === 0 ? (
            <div className="text-center py-12">
              <Moon className="w-16 h-16 mx-auto mb-4 text-purple-400 opacity-50" />
              <p className="text-purple-300">No sleep logs yet. Start tracking your sleep above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-700/50">
                    <th className="text-left py-3 px-4 text-purple-200">Date</th>
                    <th className="text-left py-3 px-4 text-purple-200">Bedtime</th>
                    <th className="text-left py-3 px-4 text-purple-200">Wake Time</th>
                    <th className="text-left py-3 px-4 text-purple-200">Hours</th>
                    <th className="text-left py-3 px-4 text-purple-200">Quality</th>
                    <th className="text-left py-3 px-4 text-purple-200">Notes</th>
                    <th className="text-left py-3 px-4 text-purple-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {[...sleepLogs].reverse().map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-purple-700/30 hover:bg-purple-900/20 transition-colors"
                    >
                      <td className="py-3 px-4 text-white">{log.date}</td>
                      <td className="py-3 px-4 text-purple-200">{convertTo12Hour(log.bedtime)}</td>
                      <td className="py-3 px-4 text-purple-200">{convertTo12Hour(log.waketime)}</td>
                      <td className="py-3 px-4 text-white">{log.hours}h</td>
                      <td className="py-3 px-4">
                        <span className="text-2xl">{qualityEmojis[log.quality - 1]}</span>
                      </td>
                      <td className="py-3 px-4 text-purple-300 max-w-xs truncate">
                        {log.notes || "-"}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteLog(log.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}