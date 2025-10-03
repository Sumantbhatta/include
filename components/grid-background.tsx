"use client"

interface GridBackgroundProps {
  className?: string
}

export default function GridBackground({ className = "" }: GridBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Subtle dense green pixel background with vertical gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 1px 1px, rgba(0, 150, 0, 0.25) 1px, transparent 1px),
            radial-gradient(circle at 3px 3px, rgba(0, 120, 0, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 5px 5px, rgba(0, 100, 0, 0.15) 1px, transparent 1px),
            radial-gradient(circle at 7px 7px, rgba(0, 80, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px, 6px 6px, 8px 8px, 10px 10px",
        }}
      />
      
      {/* Vertical gradient overlay for fading effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.05) 25%,
              rgba(0, 0, 0, 0.15) 50%,
              rgba(0, 0, 0, 0.3) 75%,
              rgba(0, 0, 0, 0.6) 100%
            )
          `,
        }}
      />
      
      {/* Additional subtle pixel layer for top section */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 0.5px 0.5px, rgba(0, 180, 0, 0.3) 0.5px, transparent 0.5px),
            radial-gradient(circle at 1.5px 1.5px, rgba(0, 150, 0, 0.25) 0.5px, transparent 0.5px),
            radial-gradient(circle at 2.5px 2.5px, rgba(0, 120, 0, 0.2) 0.5px, transparent 0.5px)
          `,
          backgroundSize: "2px 2px, 3px 3px, 4px 4px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 70%)",
        }}
      />
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50" />
    </div>
  )
}
