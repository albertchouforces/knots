import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KnotIllustration } from './KnotIllustrations';
import { AutoPlayControls } from './AutoPlayControls';

interface KnotAnimationProps {
  currentStep: number;
  knotId: string;
  totalSteps: number;
  onStepChange: (step: number) => void;
}

export const KnotAnimation = ({ currentStep, knotId, totalSteps, onStepChange }: KnotAnimationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalTime, setIntervalTime] = useState(10); // Default 10 seconds
  const [timeLeft, setTimeLeft] = useState(intervalTime);
  const prevStep = useRef(currentStep);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle play/pause toggle
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeLeft(intervalTime); // Reset timer when starting
    }
  };
  
  // Handle autoplay logic
  useEffect(() => {
    if (isPlaying) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Start the timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next step when timer reaches 0
            if (currentStep < totalSteps) {
              onStepChange(currentStep + 1);
            } else {
              // Loop back to step 1 when reaching the end
              onStepChange(1);
            }
            return intervalTime; // Reset timer for next step
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      // Clear timer when paused
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Clean up timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentStep, totalSteps, intervalTime, onStepChange]);
  
  // This effect ensures that play state is preserved during step changes
  useEffect(() => {
    // If step changes externally (via pagination controls), maintain play state
    // The isAnimating check ensures we don't interrupt the animation
    if (!isAnimating && isPlaying) {
      // Reset timeLeft to interval time for the new step
      setTimeLeft(intervalTime);
    }
  }, [currentStep, isAnimating, isPlaying, intervalTime]);
  
  // Reset timer when interval changes, but preserve play state
  useEffect(() => {
    if (isPlaying) {
      // If currently playing, reset the timer to the new interval time
      setTimeLeft(intervalTime);
    } else {
      // If paused, just update the time left without starting the animation
      setTimeLeft(intervalTime);
    }
  }, [intervalTime, isPlaying]);
  
  // Handle step transitions with loading states
  useEffect(() => {
    if (prevStep.current !== currentStep) {
      setIsLoading(true);
      setIsAnimating(true);
      
      // Preserve the current time left relative to interval time when changing steps
      // This creates a more natural transition
      const currentTimeLeftRatio = timeLeft / intervalTime;
      setTimeLeft(Math.max(1, Math.round(intervalTime * currentTimeLeftRatio)));
      
      // Short delay to show loading state before showing the new illustration
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setIsAnimating(false), 600);
      }, 500);
      
      prevStep.current = currentStep;
      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
    }
  }, [currentStep, intervalTime, timeLeft]);
  
  // Persist play state and interval time across re-renders
  useEffect(() => {
    // This effect only runs on component mount/unmount
    return () => {
      // Cleanup timer on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Store interval time in localStorage to persist across navigation
  useEffect(() => {
    // Load saved interval time on component mount
    const savedIntervalTime = localStorage.getItem('knotIntervalTime');
    if (savedIntervalTime) {
      setIntervalTime(parseInt(savedIntervalTime, 10));
    }
  }, []);
  
  // Save interval time when it changes
  useEffect(() => {
    localStorage.setItem('knotIntervalTime', intervalTime.toString());
  }, [intervalTime]);

  return (
    <motion.div 
      className="relative w-full h-64 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg knot-animation-container bg-gray-50 flex items-center justify-center"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            className="absolute inset-0 flex items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.div 
            key={`content-${currentStep}`}
            className="absolute inset-0 flex items-center justify-center bg-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-full h-full relative flex items-center justify-center p-4">
              <div className="w-full h-full flex items-center justify-center">
                <KnotIllustration 
                  knotId={knotId} 
                  stepNumber={currentStep} 
                  className="w-full h-full flex items-center justify-center" 
                />
              </div>
              <div 
                className={`absolute top-4 right-4 bg-blue-600 bg-opacity-80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-400 border-opacity-30 shadow-md ${isAnimating ? 'animate-pulse' : ''}`}
              >
                Step {currentStep}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Auto-play controls */}
      <AutoPlayControls 
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        intervalTime={intervalTime}
        setIntervalTime={setIntervalTime}
        currentStep={currentStep}
        totalSteps={totalSteps}
        timeLeft={timeLeft}
        looping={true}
      />
    </motion.div>
  );
};
