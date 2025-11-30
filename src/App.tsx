import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { SleepLog } from "./components/SleepLog";
import { SleepSounds } from "./components/SleepSounds";
import { Stats } from "./components/Stats";
import { Reminders } from "./components/Reminders";
import { UploadSchedule } from "./components/UploadSchedule";
import { Help } from "./components/Help";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [sleepLogs, setSleepLogs] = useState<any[]>([]);

  // Load sleep logs from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem("sleepcoach-sleep-logs");
    if (savedLogs) {
      setSleepLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save sleep logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("sleepcoach-sleep-logs", JSON.stringify(sleepLogs));
  }, [sleepLogs]);

  const handleAddLog = (log: any) => {
    setSleepLogs((prev) => [...prev, log]);
  };

  const handleDeleteLog = (id: string) => {
    setSleepLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard sleepLogs={sleepLogs} />;
      case "log":
        return (
          <SleepLog
            sleepLogs={sleepLogs}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
          />
        );
      case "sounds":
        return <SleepSounds />;
      case "stats":
        return <Stats sleepLogs={sleepLogs} />;
      case "reminders":
        return <Reminders />;
      case "upload":
        return <UploadSchedule />;
      case "help":
        return <Help />;
      default:
        return <Dashboard sleepLogs={sleepLogs} />;
    }
  };

  return (
    <div className="min-h-screen pb-8">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {renderView()}
      </main>
    </div>
  );
}