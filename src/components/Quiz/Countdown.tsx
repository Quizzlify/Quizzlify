import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  onTimeout: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    // pour reset le timer
    setTimeLeft(10);
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime < 1) {
          clearInterval(timer);

          setTimeout(() => {
            onTimeout();
          }, 0);
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);


    return () => {
      clearInterval(timer);
    };
  }, [onTimeout]);

  return (
    <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md">
      <div className="text-6xl font-bold text-blue-600">
        {timeLeft}
      </div>
    </div>
  );
};

export default CountdownTimer;