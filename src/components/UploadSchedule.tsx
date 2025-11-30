import { useState } from "react";
import { Upload, FileText, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function UploadSchedule() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [scheduleData, setScheduleData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file.name);

    // Simulate parsing CSV/TXT file
    // In a real app, you'd parse the file contents
    const mockData = [
      { date: "2024-11-25", events: 3, busy: "high" },
      { date: "2024-11-26", events: 1, busy: "low" },
      { date: "2024-11-27", events: 5, busy: "high" },
      { date: "2024-11-28", events: 2, busy: "medium" },
      { date: "2024-11-29", events: 0, busy: "low" },
      { date: "2024-11-30", events: 4, busy: "high" },
      { date: "2024-12-01", events: 2, busy: "medium" },
    ];

    setScheduleData(mockData);
  };

  const getBusyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500/80";
      case "medium":
        return "bg-yellow-500/80";
      case "low":
        return "bg-green-500/80";
      default:
        return "bg-gray-500/80";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-purple-100">Upload Schedule</h2>
        <p className="text-purple-300">
          Import your schedule to visualize busy days and plan better sleep
        </p>
      </div>

      {/* Upload Card */}
      <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-100">
            <Upload className="w-6 h-6" />
            Import Schedule File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-purple-600/50 rounded-xl p-8 text-center hover:border-purple-500/70 transition-colors">
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-purple-300">CSV or TXT files supported</p>
              </div>
            </label>
          </div>

          {uploadedFile && (
            <div className="bg-purple-950/30 rounded-lg p-4 border border-purple-700/30 flex items-center gap-3">
              <FileText className="w-5 h-5 text-purple-400" />
              <div className="flex-1">
                <p className="text-white">{uploadedFile}</p>
                <p className="text-purple-300">File uploaded successfully</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Visualization */}
      {scheduleData.length > 0 && (
        <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-100">
              <Calendar className="w-6 h-6" />
              Your Week at a Glance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Color Legend */}
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500/80"></div>
                <span className="text-purple-200">Low Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-500/80"></div>
                <span className="text-purple-200">Medium Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-500/80"></div>
                <span className="text-purple-200">High Activity</span>
              </div>
            </div>

            {/* Schedule Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {scheduleData.map((day) => (
                <div
                  key={day.date}
                  className={`${getBusyColor(
                    day.busy
                  )} rounded-xl p-4 text-center space-y-2 hover:scale-105 transition-transform`}
                >
                  <p className="text-white">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-white">{day.events} events</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Card */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-600/30">
        <CardContent className="py-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
            <div className="space-y-3">
              <h3 className="text-white">How to Use Schedule Upload</h3>
              <p className="text-purple-200">
                Upload a CSV or TXT file with your schedule to see which days are busiest. This helps you plan ahead for better sleep on demanding days.
              </p>
              <div className="space-y-2">
                <p className="text-purple-200">
                  <strong className="text-white">File Format:</strong>
                </p>
                <div className="bg-purple-950/50 rounded-lg p-3 font-mono text-purple-300">
                  date,events,busy<br />
                  2024-11-25,3,high<br />
                  2024-11-26,1,low
                </div>
              </div>
              <ul className="space-y-1 text-purple-200 ml-4">
                <li>• On busy days, try to protect your sleep time</li>
                <li>• Plan for wind-down activities before bed</li>
                <li>• Consider earlier bedtimes on high-stress days</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
