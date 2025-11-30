import { Logo } from "./Logo";
import { Home, Moon, Music, BarChart3, Bell, Upload, HelpCircle } from "lucide-react";

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Navigation({ currentView, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "log", label: "Log", icon: Moon },
    { id: "sounds", label: "Sounds", icon: Music },
    { id: "stats", label: "Stats", icon: BarChart3 },
    { id: "reminders", label: "Reminders", icon: Bell },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e27]/95 backdrop-blur-lg border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden sm:block bg-gradient-to-r from-purple-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
              The Sleep Coach
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                      : "text-purple-200 hover:bg-purple-900/30 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}