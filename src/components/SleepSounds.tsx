import { useRef, useState } from "react";
import { Play, Pause, Volume2, CloudRain, Wind, Waves, Radio } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function SleepSounds() {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [volumes, setVolumes] = useState<{ [key: string]: number }>({
    rain: 50,
    whitenoise: 50,
    ocean: 50,
    wind: 50,
  });

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  // All lowercase and matches your public folder!
  const sounds = [
    {
      id: "rain",
      name: "Rain",
      icon: CloudRain,
      color: "from-blue-600 to-indigo-600",
      description: "Gentle rainfall",
      file: "/rain.mp3"
    },
    {
      id: "whitenoise",
      name: "White Noise",
      icon: Radio,
      color: "from-purple-600 to-pink-600",
      description: "Static comfort",
      file: "/whitenoise.mp3"
    },
    {
      id: "ocean",
      name: "Ocean Waves",
      icon: Waves,
      color: "from-cyan-600 to-blue-600",
      description: "Calming waves",
      file: "/ocean.mp3"
    },
    {
      id: "wind",
      name: "Wind",
      icon: Wind,
      color: "from-indigo-600 to-purple-600",
      description: "Soft breeze",
      file: "/wind.mp3"
    },
  ];

  const toggleSound = (soundId: string) => {
    Object.keys(audioRefs.current).forEach((id) => {
      if (audioRefs.current[id]) {
        audioRefs.current[id]?.pause();
        audioRefs.current[id].currentTime = 0;
      }
    });

    if (playingSound === soundId) {
      setPlayingSound(null);
    } else {
      setPlayingSound(soundId);
      setTimeout(() => {
        audioRefs.current[soundId]?.play();
      }, 0);
    }
  };

  const handleVolumeChange = (soundId: string, volume: number) => {
    setVolumes((prev) => ({ ...prev, [soundId]: volume }));
    if (audioRefs.current[soundId]) {
      audioRefs.current[soundId]!.volume = volume / 100;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-purple-100">Sleep Sounds</h2>
        <p className="text-purple-300">
          Choose calming sounds to help you relax and fall asleep
        </p>
      </div>

      {/* Sounds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sounds.map((sound) => {
          const Icon = sound.icon;
          const isPlaying = playingSound === sound.id;

          return (
            <Card
              key={sound.id}
              className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-700/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sound.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white">{sound.name}</h3>
                      <p className="text-purple-300">{sound.description}</p>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Play/Pause Button */}
                <Button
                  onClick={() => toggleSound(sound.id)}
                  className={`w-full ${
                    isPlaying
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                  } text-white shadow-lg transition-all`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Play
                    </>
                  )}
                </Button>

                {/* Hidden audio tag with loop! */}
                <audio
                  ref={(el) => (audioRefs.current[sound.id] = el)}
                  src={sound.file}
                  onEnded={() => setPlayingSound(null)}
                  volume={volumes[sound.id] / 100}
                  loop
                />

                {/* Volume Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-purple-200">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      <span>Volume</span>
                    </div>
                    <span>{volumes[sound.id]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volumes[sound.id]}
                    onChange={(e) =>
                      handleVolumeChange(sound.id, parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-purple-950/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>

                {/* Playing Indicator */}
                {isPlaying && (
                  <div className="flex items-center justify-center gap-1 py-2">
                    <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-6 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1 h-5 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-1 h-7 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
