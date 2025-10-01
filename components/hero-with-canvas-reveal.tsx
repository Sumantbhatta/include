"use client"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import GridBackground from "./grid-background"
import Footer from "./footer" // Import the Footer component

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * canvas.height));

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default function HeroWithCanvasReveal() {
  const [showCards, setShowCards] = useState(false)
  const [matrixText, setMatrixText] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (showCards) {
      const chars = "01"
      const targetText = "FAST FINGERS CHALLENGE"
      let index = 0

      const interval = setInterval(() => {
        if (index < targetText.length) {
          // Show random characters
          const randomPart = Array.from(
            { length: Math.min(10, targetText.length - index) },
            () => chars[Math.floor(Math.random() * chars.length)],
          ).join("")
          
          setMatrixText(targetText.substring(0, index) + randomPart)
          
          // After a brief moment, show the correct character
          setTimeout(() => {
            index++
            setMatrixText(targetText.substring(0, index))
          }, 80)
        } else {
          clearInterval(interval)
        }
      }, 150)

      return () => clearInterval(interval)
    } else {
      setMatrixText("")
    }
  }, [showCards])

  const handleGetStarted = () => {
    setShowCards(true)
    // Smooth scroll to about section
    setTimeout(() => {
      document.getElementById("about-section")?.scrollIntoView({
        behavior: "smooth",
      })
    }, 100)
  }

  const handleCardClick = (eventType: string) => {
    router.push(`/register?event=${eventType}`)
  }

  const handleDownloadRulebook = () => {
    // Check if file exists
    fetch('/assets/Rule_book_include.pdf')
      .then(response => {
        if (response.ok) {
          console.log('File exists, starting download...')
          // Proceed with download
          const link = document.createElement('a')
          link.href = '/assets/Rule_book_include.pdf'
          link.download = 'Rule_book_include.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          console.error('File not found. Status:', response.status)
          console.log('Full URL:', window.location.origin + '/assets/Rule_book_include.pdf')
          alert('Rule book file not found. Please contact the organizers.')
        }
      })
      .catch(error => {
        console.error('Error checking file:', error)
        alert('Error downloading rule book. Please try again later.')
      })
  }

  const handleRegister = () => {
    router.push("/register")
  }

  return (
    <div className="relative min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas Reveal Effect Background */}
        <div className="absolute inset-0">
          <CanvasRevealEffect
            animationSpeed={2}
            containerClassName="bg-black"
            colors={[
              [0, 180, 0], // Brighter green
              [0, 220, 0], // Even brighter green
              [100, 255, 100], // Light green
            ]}
            dotSize={3}
            opacities={[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1]}
          />
          {/* Overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-4 font-sans">
            #include
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-sans">
            Get ready to plug into the mainframe! Presenting #include
            <br />
            ultimate tech showdown designed to test your skills!
          </p>
          <div className="mt-10">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 font-sans"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {showCards && (
        <div className="relative">
          <div className="absolute inset-0 bg-black">
            <GridBackground />
          </div>
          <div className="relative z-10">
            <div id="about-section" className="relative py-20 px-4 sm:px-6 lg:px-8">
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 font-sans">#include yourselves</h2>

                <div className="p-8 mb-8 border border-green-600/20">
                  <h3 className="text-2xl font-bold text-green-400 mb-4 font-sans">About ACE</h3>
                  <p className="text-gray-200 text-lg leading-relaxed font-sans">
                    ACE (Association of Computer Engineering) is a dynamic association from the Computer Science
                    Department at SUIET (Srinivas University Institute of Engineering and Technology, Mukka) that leverages skills and fosters innovation among students. We organize cutting-edge
                    technical events, workshops, and competitions to bridge the gap between academic learning and industry
                    requirements, empowering students to excel in the ever-evolving tech landscape. Our mission is to create a vibrant tech community within SUIET that encourages collaboration, learning, and growth.
                  </p>
                </div>

                <div className="p-8 mb-10 border border-green-600/20">
                  <p className="text-gray-200 text-lg leading-relaxed mb-6 font-sans">
                    #include is a tech-inspired event series designed to challenge creativity, logic, innovation, and
                    skills through engaging competitions — #include&lt;code&gt; for programming, #include&lt;web&gt; for
                    web design, #include&lt;idea&gt; for idea pitching, and #include&lt;type&gt; for typing speed and
                    accuracy. It brings together tech enthusiasts to showcase talent in a fun, retro-themed environment
                    celebrating problem-solving and innovation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button
                    onClick={handleDownloadRulebook}
                    className="bg-gradient-to-r from-green-800 to-green-700 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 border border-green-600/50 backdrop-blur-sm font-sans"
                    style={{
                      background: `
                      linear-gradient(135deg, rgba(0, 100, 0, 0.8) 0%, rgba(0, 80, 0, 0.9) 100%),
                      radial-gradient(circle at 30% 30%, rgba(0, 150, 0, 0.3) 0%, transparent 70%)
                    `,
                    }}
                  >
                    Download Rule Book
                  </Button>

                  <Button
                    onClick={handleRegister}
                    className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 border border-green-500/50 backdrop-blur-sm font-sans"
                    style={{
                      background: `
                      linear-gradient(135deg, rgba(0, 120, 0, 0.9) 0%, rgba(0, 100, 0, 1) 100%),
                      radial-gradient(circle at 30% 30%, rgba(0, 180, 0, 0.4) 0%, transparent 70%)
                    `,
                    }}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>

            <div id="cards-section" className="relative py-20 px-4 sm:px-6 lg:px-8">
              {/* Cards Section */}
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 justify-items-center">
                  {/* Card 1 - #include<code> */}
                  <div className="transform transition-all duration-700 ease-out animate-in slide-in-from-left-10 fade-in-0 w-full max-w-sm">
                    <div
                      onClick={() => handleCardClick("code")}
                      className="group relative h-[420px] w-full rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-900/30 overflow-hidden backdrop-blur-sm border border-green-600/30"
                      style={{
                        background: `
                        radial-gradient(circle at 20% 80%, rgba(0, 100, 0, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(0, 120, 0, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(0, 80, 0, 0.05) 0%, transparent 50%),
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 100, 0, 0.03) 2px,
                          rgba(0, 100, 0, 0.03) 4px
                        ),
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 100, 0, 0.03) 2px,
                          rgba(0, 100, 0, 0.03) 4px
                        ),
                        linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)
                      `,
                      }}
                    >
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `
                            radial-gradient(circle at 10% 10%, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                            radial-gradient(circle at 30% 20%, rgba(0, 200, 0, 0.08) 1px, transparent 1px),
                            radial-gradient(circle at 50% 30%, rgba(0, 150, 0, 0.06) 1px, transparent 1px),
                            radial-gradient(circle at 70% 40%, rgba(0, 180, 0, 0.07) 1px, transparent 1px),
                            radial-gradient(circle at 90% 50%, rgba(0, 220, 0, 0.09) 1px, transparent 1px),
                            radial-gradient(circle at 20% 60%, rgba(0, 160, 0, 0.05) 1px, transparent 1px),
                            radial-gradient(circle at 40% 70%, rgba(0, 190, 0, 0.08) 1px, transparent 1px),
                            radial-gradient(circle at 60% 80%, rgba(0, 140, 0, 0.06) 1px, transparent 1px),
                            radial-gradient(circle at 80% 90%, rgba(0, 210, 0, 0.07) 1px, transparent 1px)
                          `,
                            backgroundSize:
                              "20px 20px, 25px 25px, 30px 30px, 22px 22px, 28px 28px, 24px 24px, 26px 26px, 32px 32px, 18px 18px",
                          }}
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-green-800/30 rounded-2xl"></div>

                      <div className="relative z-10 h-full flex flex-col">
                        <div className="mb-4 flex-shrink-0">
                          <img
                            src="/coding-terminal-with-green-matrix-code.jpg"
                            alt="Programming Contest"
                            className="w-full h-32 object-cover rounded-lg opacity-80"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-white text-xl font-bold mb-3 font-sans">#include&lt;code&gt;</h3>
                          <p className="text-gray-200 text-sm mb-4 font-sans leading-relaxed">
                            A programming contest to test logic and problem-solving skills
                          </p>
                        </div>

                        <div className="text-gray-300 text-sm space-y-3 font-sans">
                          <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm border border-green-600/20">
                            <div className="space-y-2">
                              <p className="text-white font-semibold">📅 October 6, 2024</p>
                              <p className="text-gray-300">⏰ 9:00 AM - 12:00 PM</p>
                              <p className="text-gray-300">📍 COE Lab-1</p>
                              <p className="text-green-400 font-semibold">👤 Individual Event</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 - #include<web> */}
                  <div className="transform transition-all duration-700 ease-out animate-in slide-in-from-bottom-10 fade-in-0 delay-200 w-full max-w-sm">
                    <div
                      onClick={() => handleCardClick("web")}
                      className="group relative h-[420px] w-full rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-900/30 overflow-hidden backdrop-blur-sm border border-green-600/30"
                      style={{
                        background: `
                        radial-gradient(circle at 20% 80%, rgba(0, 100, 0, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(0, 120, 0, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(0, 80, 0, 0.05) 0%, transparent 50%),
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 100, 0, 0.03) 2px,
                          rgba(0, 100, 0, 0.03) 4px
                        ),
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 100, 0, 0.03) 2px,
                          rgba(0, 100, 0, 0.03) 4px
                        ),
                        linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)
                      `,
                      }}
                    >
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `
                            radial-gradient(circle at 15% 15%, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                            radial-gradient(circle at 35% 25%, rgba(0, 200, 0, 0.08) 1px, transparent 1px),
                            radial-gradient(circle at 55% 35%, rgba(0, 150, 0, 0.06) 1px, transparent 1px),
                            radial-gradient(circle at 75% 45%, rgba(0, 180, 0, 0.07) 1px, transparent 1px),
                            radial-gradient(circle at 85% 55%, rgba(0, 220, 0, 0.09) 1px, transparent 1px),
                            radial-gradient(circle at 25% 65%, rgba(0, 160, 0, 0.05) 1px, transparent 1px),
                            radial-gradient(circle at 45% 75%, rgba(0, 190, 0, 0.08) 1px, transparent 1px),
                            radial-gradient(circle at 65% 85%, rgba(0, 140, 0, 0.06) 1px, transparent 1px),
                            radial-gradient(circle at 85% 95%, rgba(0, 210, 0, 0.07) 1px, transparent 1px)
                          `,
                            backgroundSize:
                              "18px 18px, 23px 23px, 28px 28px, 20px 20px, 26px 26px, 22px 22px, 24px 24px, 30px 30px, 16px 16px",
                          }}
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-green-800/30 rounded-2xl"></div>

                      <div className="relative z-10 h-full flex flex-col">
                        <div className="mb-4 flex-shrink-0">
                          <img
                            src="/retro-computer.png"
                            alt="Web Design Challenge"
                            className="w-full h-32 object-cover rounded-lg opacity-80"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-white text-xl font-bold mb-3 font-sans">#include&lt;web&gt;</h3>
                          <p className="text-gray-200 text-sm mb-4 font-sans leading-relaxed">
                            A creative web designing challenge to build innovative and responsive websites
                          </p>
                        </div>

                        <div className="text-gray-300 text-sm space-y-3 font-sans">
                          <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm border border-green-600/20">
                            <div className="space-y-2">
                              <p className="text-white font-semibold">📅 October 6, 2024</p>
                              <p className="text-gray-300">⏰ 9:00 AM - 12:00 PM</p>
                              <p className="text-gray-300">📍 COE Lab-2</p>
                              <p className="text-green-400 font-semibold">👥 Team Event (1-2 members)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 - #include<idea> */}
                  <div className="transform transition-all duration-700 ease-out animate-in slide-in-from-right-10 fade-in-0 delay-400 w-full max-w-sm">
                    <div
                      onClick={() => handleCardClick("idea")}
                      className="group relative h-[420px] w-full rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-900/30 overflow-hidden backdrop-blur-sm border border-green-600/30"
                      style={{
                        background: `
                        radial-gradient(circle at 20% 80%, rgba(0, 100, 0, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(0, 120, 0, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(0, 80, 0, 0.05) 0%, transparent 50%),
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 100, 0, 0.03) 2px,
                          rgba(0, 100, 0, 0.03) 4px
                        ),
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 100, 0, 0.03) 2px,
                          rgba(0, 100, 0, 0.03) 4px
                        ),
                        linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)
                      `,
                      }}
                    >
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `
                            radial-gradient(circle at 12% 18%, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                            radial-gradient(circle at 32% 28%, rgba(0, 200, 0, 0.08) 1px, transparent 1px),
                            radial-gradient(circle at 52% 38%, rgba(0, 150, 0, 0.06) 1px, transparent 1px),
                            radial-gradient(circle at 72% 48%, rgba(0, 180, 0, 0.07) 1px, transparent 1px),
                            radial-gradient(circle at 92% 58%, rgba(0, 220, 0, 0.09) 1px, transparent 1px),
                            radial-gradient(circle at 22% 68%, rgba(0, 160, 0, 0.05) 1px, transparent 1px),
                            radial-gradient(circle at 42% 78%, rgba(0, 190, 0, 0.08) 1px, transparent 1px),
                            radial-gradient(circle at 62% 88%, rgba(0, 140, 0, 0.06) 1px, transparent 1px),
                            radial-gradient(circle at 82% 98%, rgba(0, 210, 0, 0.07) 1px, transparent 1px)
                          `,
                            backgroundSize:
                              "19px 19px, 24px 24px, 29px 29px, 21px 21px, 27px 27px, 23px 23px, 25px 25px, 31px 31px, 17px 17px",
                          }}
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-green-800/30 rounded-2xl"></div>

                      <div className="relative z-10 h-full flex flex-col">
                        <div className="mb-4 flex-shrink-0">
                          <img
                            src="/lightbulb-innovation-brainstorming-presentation.jpg"
                            alt="Idea Pitching Event"
                            className="w-full h-32 object-cover rounded-lg opacity-80"
                          />
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-white text-xl font-bold mb-3 font-sans">#include&lt;idea&gt;</h3>
                          <p className="text-gray-200 text-sm mb-4 font-sans leading-relaxed">
                            An idea pitching event to showcase innovative solutions and entrepreneurial thinking
                          </p>
                        </div>

                        <div className="text-gray-300 text-sm space-y-3 font-sans">
                          <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm border border-green-600/20">
                            <div className="space-y-2">
                              <p className="text-white font-semibold">📅 October 6, 2024</p>
                              <p className="text-gray-300">⏰ 9:00 AM - 12:00 PM</p>
                              <p className="text-gray-300">📍 COE Lab-3</p>
                              <p className="text-green-400 font-semibold">👥 Team Event (1-2 members)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <div className="font-mono text-green-400 text-2xl md:text-3xl font-bold tracking-wider mb-4 min-h-[3rem] flex items-center justify-center">
                    {matrixText}
                  </div>
                  <p className="text-gray-300 text-lg mb-8 font-sans">
                    Want to grab more goodies and have some fun? Join our special typing challenge!
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="transform transition-all duration-700 ease-out animate-in slide-in-from-bottom-10 fade-in-0 delay-600 w-full max-w-5xl">
                    <div
                      onClick={() => handleCardClick("type")}
                      className="group relative h-[560px] rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-900/30 overflow-hidden backdrop-blur-sm border border-green-600/30"
                      style={{
                        background: `
                        radial-gradient(circle at 20% 80%, rgba(0, 100, 0, 0.12) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(0, 120, 0, 0.12) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(0, 80, 0, 0.08) 0%, transparent 50%),
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 100, 0, 0.04) 2px,
                          rgba(0, 100, 0, 0.04) 4px
                        ),
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 100, 0, 0.04) 2px,
                          rgba(0, 100, 0, 0.04) 4px
                        ),
                        linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)
                      `,
                      }}
                    >
                      <div className="absolute inset-0 opacity-25">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `
                            radial-gradient(circle at 8% 12%, rgba(0, 255, 0, 0.12) 1px, transparent 1px),
                            radial-gradient(circle at 18% 22%, rgba(0, 200, 0, 0.10) 1px, transparent 1px),
                            radial-gradient(circle at 28% 32%, rgba(0, 150, 0, 0.08) 1px, transparent 1px),
                            radial-gradient(circle at 38% 42%, rgba(0, 180, 0, 0.09) 1px, transparent 1px),
                            radial-gradient(circle at 48% 52%, rgba(0, 220, 0, 0.11) 1px, transparent 1px),
                            radial-gradient(circle at 58% 62%, rgba(0, 160, 0, 0.07) 1px, transparent 1px),
                            radial-gradient(circle at 68% 72%, rgba(0, 190, 0, 0.10) 1px, transparent 1px),
                            radial-gradient(circle at 78% 82%, rgba(0, 140, 0, 0.08) 1px, transparent 1px),
                            radial-gradient(circle at 88% 92%, rgba(0, 210, 0, 0.09) 1px, transparent 1px),
                            radial-gradient(circle at 14% 24%, rgba(0, 170, 0, 0.06) 1px, transparent 1px),
                            radial-gradient(circle at 34% 44%, rgba(0, 230, 0, 0.08) 1px, transparent 1px),
                            radial-gradient(circle at 54% 64%, rgba(0, 130, 0, 0.07) 1px, transparent 1px),
                            radial-gradient(circle at 74% 84%, rgba(0, 200, 0, 0.09) 1px, transparent 1px),
                            radial-gradient(circle at 94% 4%, rgba(0, 180, 0, 0.08) 1px, transparent 1px)
                          `,
                            backgroundSize:
                              "15px 15px, 18px 18px, 21px 21px, 16px 16px, 19px 19px, 17px 17px, 20px 20px, 22px 22px, 14px 14px, 23px 23px, 13px 13px, 24px 24px, 12px 12px, 25px 25px",
                          }}
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-green-800/30 rounded-2xl"></div>

                      <div className="relative z-10 h-full flex flex-col">
                        <div className="mb-6 flex-shrink-0">
                          <img
                            src="/mechanical-keyboard-typing-speed-test-interface.jpg"
                            alt="Typing Challenge"
                            className="w-full h-40 object-cover rounded-lg opacity-80"
                          />
                        </div>

                        <div className="flex-grow text-center">
                          <h3 className="text-white text-2xl font-bold mb-4 font-sans">#include&lt;type&gt;</h3>
                          <p className="text-gray-200 text-base mb-6 font-sans leading-relaxed max-w-2xl mx-auto">
                            A typing challenge to test speed, accuracy, and control on the keyboard
                          </p>
                        </div>

                        <div className="text-gray-300 text-sm space-y-3 font-sans">
                          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-green-600/20">
                            <div className="space-y-2">
                              <p className="text-white font-semibold">📅 October 6, 2024</p>
                              <p className="text-gray-300">⏰ 12:00 PM - 1:00 PM</p>
                              <p className="text-gray-300">📍 COE Lab-4</p>
                              <p className="text-green-400 font-semibold">👤 Individual Event</p>
                            </div>
                            <div className="bg-green-600/20 rounded-lg p-3 border border-green-500/30 mt-3">
                              <p className="text-white text-center font-bold">🎯 Open to All Participants!</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conditionally render Footer only when showCards is true */}
      {showCards && <Footer />}
    </div>
  )
}