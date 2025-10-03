"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [dotCount, setDotCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const maxDots = 300
    const interval = setInterval(() => {
      setDotCount((prev) => {
        if (prev >= maxDots) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => onComplete(), 200)
          }, 300)
          return prev
        }
        return prev + Math.floor(Math.random() * 4) + 2
      })
    }, 40)

    return () => clearInterval(interval)
  }, [onComplete])

  const generateDots = () => {
    const dots = []
    for (let i = 0; i < dotCount; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.random() * 4 + 1
      const opacity = Math.random() * 0.9 + 0.1
      const delay = Math.random() * 1.5

      dots.push(
        <motion.div
          key={i}
          className="absolute bg-green-400 rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: opacity,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            delay: delay * 0.1,
            ease: "linear",
          }}
        />,
      )
    }
    return dots
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "linear" }}
      style={{ pointerEvents: isComplete ? "none" : "auto" }}
    >
      <div className="absolute inset-0">{generateDots()}</div>
    </motion.div>
  )
}
