"use client"
import { useEffect, useRef } from "react"

interface MatrixRainBackgroundProps {
  className?: string
}

export default function MatrixRainBackground({ className = "" }: MatrixRainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix characters (mix of katakana, numbers, and symbols)
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?"
    const charArray = chars.split("")

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      // Create fade effect with gradient overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle gradient light effect from top
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 50, 0, 0.1)")
      gradient.addColorStop(0.3, "rgba(0, 0, 0, 0.02)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.05)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Create gradient for each character (brighter at top, dimmer at bottom)
        const charGradient = ctx.createLinearGradient(x, y - fontSize * 3, x, y + fontSize)
        charGradient.addColorStop(0, "rgba(0, 255, 0, 1)")
        charGradient.addColorStop(0.3, "rgba(0, 200, 0, 0.8)")
        charGradient.addColorStop(0.7, "rgba(0, 150, 0, 0.4)")
        charGradient.addColorStop(1, "rgba(0, 100, 0, 0.1)")

        ctx.fillStyle = charGradient
        ctx.fillText(char, x, y)

        // Add glow effect for leading characters
        if (Math.random() > 0.98) {
          ctx.shadowColor = "#00ff00"
          ctx.shadowBlur = 10
          ctx.fillStyle = "rgba(0, 255, 0, 0.9)"
          ctx.fillText(char, x, y)
          ctx.shadowBlur = 0
        }

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: -1 }} />
}
