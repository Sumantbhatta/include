'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils"; // Add this import for the cn utility

interface CanvasRevealEffectProps {
  containerClassName?: string;
}

export const CanvasRevealEffect = ({
  // ... existing props ...
  containerClassName,
}) => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Your mouse move handler implementation
  };
  
  useEffect(() => {
    // ... existing effect code ...
    
    // Add loading state management
    setIsLoading(false);
    
    return () => {
      // ... existing cleanup ...
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className={containerClassName ? `w-full h-full ${containerClassName}` : "w-full h-full"}
      />
    </>
  );
};