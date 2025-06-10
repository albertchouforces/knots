import { FC, useEffect, useState } from 'react';
import { Pause, Play, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

interface AutoPlayControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  intervalTime: number;
  setIntervalTime: (time: number) => void;
  currentStep: number;
  totalSteps: number;
  timeLeft: number;
  looping?: boolean;
}

export const AutoPlayControls: FC<AutoPlayControlsProps> = ({
  isPlaying,
  togglePlay,
  intervalTime,
  setIntervalTime,
  currentStep,
  totalSteps,
  timeLeft,
  looping = false,
}) => {
  // Predefined interval options
  const intervalOptions = [5, 10, 15, 20, 30];
  const [showSettings, setShowSettings] = useState(false);

  // Animation for progress bar
  const progressPercentage = (timeLeft / intervalTime) * 100;

  return (
    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
      {/* Progress bar and countdown timer (only visible when playing) */}
      {isPlaying && (
        <>
          <motion.div 
            className="relative h-1 bg-gray-200 rounded-full overflow-hidden w-24 mr-1"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '6rem' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div
            className="bg-blue-600 bg-opacity-90 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full mr-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {timeLeft}s
          </motion.div>
        </>
      )}

      {/* Play/Pause button */}
      <motion.button
        className={`w-10 h-10 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-lg transition-colors border ${
          isPlaying 
            ? 'bg-blue-700 bg-opacity-95 border-blue-300 ring-2 ring-blue-400 ring-opacity-50' 
            : 'bg-blue-600 bg-opacity-90 border-blue-400 hover:bg-blue-700'
        }`}
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </motion.button>

      {/* Timer settings */}
      <div className="relative">
        <motion.button
          className="w-10 h-10 bg-gray-600 bg-opacity-80 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors border border-gray-500"
          onClick={() => setShowSettings(!showSettings)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Timer size={18} />
        </motion.button>

        {/* Dropdown menu for timer settings */}
        {showSettings && (
          <motion.div 
            className="absolute right-0 bottom-12 bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-48"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="text-sm font-medium text-gray-700 mb-2">
              Time between steps: {intervalTime}s
            </div>
            <div className="grid grid-cols-5 gap-1">
              {intervalOptions.map((time) => (
                <button
                  key={time}
                  className={`px-2 py-1 text-xs rounded ${
                    intervalTime === time
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    setIntervalTime(time);
                    setShowSettings(false);
                  }}
                >
                  {time}s
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Step {currentStep} of {totalSteps}
              {looping && <span className="ml-1 text-blue-500">(looping)</span>}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
