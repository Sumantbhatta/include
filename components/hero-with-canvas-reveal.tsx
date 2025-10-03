"use client"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax"
import GridBackground from "./grid-background"
import Footer from "./footer"

export default function HeroWithCanvasReveal() {
  const [showCards, setShowCards] = useState(false)
  const [matrixText, setMatrixText] = useState("")
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const router = useRouter()
  const parallax = useRef<IParallax>(null!)

  const prizeImage1 = "/tshirt.png";
  const prizeImage2 = "/mug.png";

  useEffect(() => {
    if (showCards) {
      const chars = "01"
      const targetText = "FAST FINGERS CHALLENGE"
      let index = 0

      const interval = setInterval(() => {
        if (index < targetText.length) {
          const randomPart = Array.from(
            { length: Math.min(10, targetText.length - index) },
            () => chars[Math.floor(Math.random() * chars.length)],
          ).join("")
          
          setMatrixText(targetText.substring(0, index) + randomPart)
          
          setTimeout(() => {
            index++
            setMatrixText(targetText.substring(0, index))
          }, 30)
        } else {
          clearInterval(interval)
        }
      }, 60)

      return () => clearInterval(interval)
    } else {
      setMatrixText("")
    }
  }, [showCards])

  useEffect(() => {
    if (showCards) {
      // Immediate scroll without delay to prevent glitch
      const timer = setTimeout(() => {
        setIsScrollEnabled(true);
        parallax.current?.scrollTo(1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showCards]);

  const handleGetStarted = () => {
    setShowCards(true);
    // Enable scroll immediately to prevent glitch
    setIsScrollEnabled(true);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      if (parallax.current) {
        parallax.current.scrollTo(1);
      }
    }, 100);
  }

  const handleCardClick = (eventType: string) => {
    router.push(`/register?event=${eventType}`)
  }

  const handleDownloadRulebook = () => {
    fetch('/assets/Rule_book_include.pdf')
      .then(response => {
        if (response.ok) {
          const link = document.createElement('a')
          link.href = '/assets/Rule_book_include.pdf'
          link.download = 'Rule_book_include.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
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

  const totalPages = 3.3;

  return (
    <div className="w-full h-screen bg-black font-sans">
      <Parallax ref={parallax} pages={totalPages} enabled={isScrollEnabled}>
        {/* Layer 1: Sticky Background Effect */}
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={totalPages}
          style={{ zIndex: 1 }} // Lowest layer
        >
          <div className="fixed inset-0">
            <CanvasRevealEffect
              animationSpeed={2}
              containerClassName="bg-black"
              colors={[[0, 180, 0], [0, 220, 0], [100, 255, 100]]}
              dotSize={3}
              opacities={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
          </div>
        </ParallaxLayer>

        {/* Layer 2: Hero Section */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          className="flex items-center justify-center"
          style={{ zIndex: 10 }} // Above background
        >
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
        </ParallaxLayer>
        
        {/* Optimized Prize layers for smooth scrolling */}
        <ParallaxLayer
            offset={1.0}
            speed={0.8}
            style={{ zIndex: 15, pointerEvents: 'none', willChange: 'transform' }}
            className={`transition-opacity duration-300 ${showCards ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="relative w-full h-full pointer-events-none">
                <a href={prizeImage1} target="_blank" rel="noopener noreferrer" className="absolute left-[5%] sm:left-[10%] top-[20%] pointer-events-auto transform-gpu">
                    <img 
                        src={prizeImage1} 
                        alt="Prize 1" 
                        className="w-24 sm:w-32 md:w-36 h-auto object-contain rounded-lg shadow-lg hover:scale-110 transition-transform duration-200 will-change-transform"
                        loading="lazy"
                    />
                </a>
                {/* <div className="absolute left-[28%] sm:left-[17%] md:left-[14rem] top-[18%] sm:top-[17%] w-[60px] sm:w-[80px] md:w-[100px] h-[60px] sm:h-[80px] md:h-[100px] transform-gpu" style={{ color: 'rgb(0, 255, 0)' }}>
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-bounce">
                        <path d="M10 10 Q 50 50, 90 90" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M85 80 L90 90 L80 85" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </div> */}
                <span className="absolute left-[6%] sm:left-[11%] top-[14%] sm:top-[13%] text-xs sm:text-sm md:text-lg text-green-400 font-bold font-sans tracking-wide">
                    Prizes
                </span>
            </div>
        </ParallaxLayer>

        <ParallaxLayer
            offset={1.8}
            speed={0.6}
            style={{ zIndex: 15, pointerEvents: 'none', willChange: 'transform' }}
            className={`transition-opacity duration-300 ${showCards ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="relative w-full h-full pointer-events-none">
                <a href={prizeImage2} target="_blank" rel="noopener noreferrer" className="absolute right-[5%] sm:right-[10%] top-[30%] pointer-events-auto transform-gpu">
                    <img 
                        src={prizeImage2} 
                        alt="Prize 2" 
                        className="w-28 sm:w-36 md:w-40 h-auto object-contain rounded-lg shadow-lg hover:scale-110 transition-transform duration-200 will-change-transform"
                        loading="lazy"
                    />
                </a>
                {/* <div className="absolute right-[28%] sm:right-[20%] md:right-[16rem] top-[28%] w-[60px] sm:w-[80px] md:w-[100px] h-[60px] sm:h-[80px] md:h-[100px] transform-gpu" style={{ color: 'rgb(0, 255, 0)' }}>
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-bounce">
                        <path d="M90 10 Q 50 50, 10 90" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M15 80 L10 90 L20 85" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </div> */}
                <span className="absolute right-[6%] sm:right-[11%] top-[24%] text-xs sm:text-sm md:text-lg text-green-400 font-bold font-sans tracking-wide">
                    Prizes
                </span>
            </div>
        </ParallaxLayer>
        
        {/* Main Content Layer is below the prizes but fully clickable */}
        <ParallaxLayer
            offset={1}
            speed={1}
            factor={totalPages - 1}
            style={{ zIndex: 10, willChange: 'transform' }} // Below prizes, above background
            className={`transition-opacity duration-300 ease-in-out ${showCards ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="relative">
                <div className="absolute inset-0 bg-black/80 -z-10">
                    <GridBackground />
                </div>
                <div className="relative z-10">
                    <div id="about-section" className="relative py-20 px-4 sm:px-6 lg:px-8">
                      <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 font-sans">#include yourselves</h2>
                        <div className="p-8 mb-8 border border-green-600/20 backdrop-blur-sm bg-black/40 rounded-lg">
                          <h3 className="text-2xl font-bold text-green-400 mb-4 font-sans">About ACE</h3>
                          <p className="text-gray-200 text-lg leading-relaxed font-sans">
                            ACE (Association of Computer Engineering) is a dynamic association from the Computer Science
                            Department at SUIET (Srinivas University Institute of Engineering and Technology, Mukka) that leverages skills and fosters innovation among students. We organize cutting-edge
                            technical events, workshops, and competitions to bridge the gap between academic learning and industry
                            requirements, empowering students to excel in the ever-evolving tech landscape. Our mission is to create a vibrant tech community within SUIET that encourages collaboration, learning, and growth.
                          </p>
                        </div>
                        <div className="p-8 mb-10 border border-green-600/20 backdrop-blur-sm bg-black/40 rounded-lg">
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
                            style={{ background: `linear-gradient(135deg, rgba(0, 100, 0, 0.8) 0%, rgba(0, 80, 0, 0.9) 100%), radial-gradient(circle at 30% 30%, rgba(0, 150, 0, 0.3) 0%, transparent 70%)` }}
                          >
                            Download Rule Book
                          </Button>
                          <Button
                            onClick={handleRegister}
                            className="bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 border border-green-500/50 backdrop-blur-sm font-sans"
                            style={{ background: `linear-gradient(135deg, rgba(0, 120, 0, 0.9) 0%, rgba(0, 100, 0, 1) 100%), radial-gradient(circle at 30% 30%, rgba(0, 180, 0, 0.4) 0%, transparent 70%)` }}
                          >
                            Register
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div id="cards-section" className="relative py-20 px-4 sm:px-6 lg:px-8">
                      <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 justify-items-center">
                          <div className="transform transition-all duration-300 ease-out animate-in slide-in-from-left-5 fade-in-0 w-full max-w-sm">
                            <div
                              onClick={() => handleCardClick("code")}
                              className="group relative h-[420px] w-full rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-900/30 overflow-hidden backdrop-blur-sm border border-green-600/30"
                              style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-green-800/30 rounded-2xl"></div>
                              <div className="relative z-10 h-full flex flex-col">
                                <div className="mb-4 flex-shrink-0">
                                  <img src="/coding-terminal-with-green-matrix-code.jpg" alt="Programming Contest" className="w-full h-32 object-cover rounded-lg opacity-80" />
                                </div>
                                <div className="flex-grow">
                                  <h3 className="text-white text-xl font-bold mb-3 font-sans">#include&lt;code&gt;</h3>
                                  <p className="text-gray-200 text-sm mb-4 font-sans leading-relaxed">A programming contest to test logic and problem-solving skills</p>
                                </div>
                                <div className="text-gray-300 text-sm space-y-3 font-sans">
                                  <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm border border-green-600/20">
                                    <div className="space-y-2">
                                      <p className="text-white font-semibold">📅 October 6, 2025</p>
                                      <p className="text-gray-300">⏰ 9:00 AM - 12:00 PM</p>
                                      <p className="text-gray-300">📍 COE Lab-1</p>
                                      <p className="text-green-400 font-semibold">👤 Individual Event</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                           <div className="transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-5 fade-in-0 delay-100 w-full max-w-sm">
                            <div
                              onClick={() => handleCardClick("web")}
                              className="group relative h-[420px] w-full rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-900/30 overflow-hidden backdrop-blur-sm border border-green-600/30"
                              style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-green-800/30 rounded-2xl"></div>
                              <div className="relative z-10 h-full flex flex-col">
                                <div className="mb-4 flex-shrink-0">
                                  <img src="/retro-computer.png" alt="Web Design Challenge" className="w-full h-32 object-cover rounded-lg opacity-80" loading="lazy" />
                                </div>
                                <div className="flex-grow">
                                  <h3 className="text-white text-xl font-bold mb-3 font-sans">#include&lt;web&gt;</h3>
                                  <p className="text-gray-200 text-sm mb-4 font-sans leading-relaxed">A creative web designing challenge to build innovative and responsive websites</p>
                                </div>
                                <div className="text-gray-300 text-sm space-y-3 font-sans">
                                  <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm border border-green-600/20">
                                    <div className="space-y-2">
                                      <p className="text-white font-semibold">📅 October 6, 2025</p>
                                      <p className="text-gray-300">⏰ 9:00 AM - 12:00 PM</p>
                                      <p className="text-gray-300">📍 COE Lab-2</p>
                                      <p className="text-green-400 font-semibold">👥 Team Event (1-2 members)</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="transform transition-all duration-300 ease-out animate-in slide-in-from-right-5 fade-in-0 delay-200 w-full max-w-sm">
                            <div
                              onClick={() => handleCardClick("idea")}
                              className="group relative h-[420px] w-full rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-900/30 overflow-hidden backdrop-blur-sm border border-green-600/30"
                              style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-green-800/30 rounded-2xl"></div>
                              <div className="relative z-10 h-full flex flex-col">
                                <div className="mb-4 flex-shrink-0">
                                  <img src="/lightbulb-innovation-brainstorming-presentation.jpg" alt="Idea Pitching Event" className="w-full h-32 object-cover rounded-lg opacity-80" />
                                </div>
                                <div className="flex-grow">
                                  <h3 className="text-white text-xl font-bold mb-3 font-sans">#include&lt;idea&gt;</h3>
                                  <p className="text-gray-200 text-sm mb-4 font-sans leading-relaxed">An idea pitching event to showcase innovative solutions and entrepreneurial thinking</p>
                                </div>
                                <div className="text-gray-300 text-sm space-y-3 font-sans">
                                  <div className="bg-black/30 rounded-lg p-3 backdrop-blur-sm border border-green-600/20">
                                    <div className="space-y-2">
                                      <p className="text-white font-semibold">📅 October 6, 2025</p>
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
                          <p className="text-gray-300 text-lg mb-8 font-sans">Want to grab more goodies and have some fun? Join our special typing challenge!</p>
                        </div>
                        <div className="flex justify-center">
                          <div className="transform transition-all duration-300 ease-out animate-in slide-in-from-bottom-5 fade-in-0 delay-300 w-full max-w-5xl">
                              <div
                                onClick={() => handleCardClick("type")}
                                className="group relative h-[560px] rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-900/30 overflow-hidden backdrop-blur-sm border border-green-600/30"
                                style={{ background: `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)` }}
                              >
                                  <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-green-800/30 rounded-2xl"></div>
                                  <div className="relative z-10 h-full flex flex-col">
                                      <div className="mb-6 flex-shrink-0">
                                          <img src="/mechanical-keyboard-typing-speed-test-interface.jpg" alt="Typing Challenge" className="w-full h-40 object-cover rounded-lg opacity-80" />
                                      </div>
                                      <div className="flex-grow text-center">
                                          <h3 className="text-white text-2xl font-bold mb-4 font-sans">#include&lt;type&gt;</h3>
                                          <p className="text-gray-200 text-base mb-6 font-sans leading-relaxed max-w-2xl mx-auto">A typing challenge to test speed, accuracy, and control on the keyboard</p>
                                      </div>
                                      <div className="text-gray-300 text-sm space-y-3 font-sans">
                                          <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-green-600/20">
                                              <div className="space-y-2">
                                                  <p className="text-white font-semibold">📅 October 6, 2025</p>
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
                    <div id="rules-section" className="relative py-16 px-4 sm:px-6 lg:px-8">
                      <div className="max-w-4xl mx-auto">
                        <div className="transform transition-all duration-700 ease-out animate-in fade-in-0">
                          <div className="relative rounded-2xl p-8 overflow-hidden backdrop-blur-sm border border-green-600/30 bg-black/40">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-700/10 to-green-800/20 rounded-2xl"></div>
                            <div className="relative z-10">
                              <h2 className="text-3xl font-bold text-green-400 mb-6 text-center font-sans">Event Rules & Guidelines</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="bg-black/30 rounded-lg p-4 border border-green-600/20">
                                    <h3 className="text-white font-bold mb-2 font-sans">📋 General Rules</h3>
                                    <ul className="text-gray-200 text-sm space-y-2 font-sans">
                                      <li>• All participants must register before the event</li>
                                      <li>• College ID card is mandatory for verification</li>
                                      <li>• Participants must arrive 15 minutes before the event</li>
                                      <li>• Use of unfair means will lead to disqualification</li>
                                      <li>• Internet usage will be restricted during competitions</li>
                                    </ul>
                                  </div>
                                  <div className="bg-black/30 rounded-lg p-4 border border-green-600/20">
                                    <h3 className="text-white font-bold mb-2 font-sans">🏆 Judging Criteria</h3>
                                    <ul className="text-gray-200 text-sm space-y-2 font-sans">
                                      <li>• Accuracy and efficiency of solutions</li>
                                      <li>• Creativity and innovation</li>
                                      <li>• Adherence to time limits</li>
                                      <li>• Code quality and best practices</li>
                                      <li>• Presentation and communication skills</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div className="bg-black/30 rounded-lg p-4 border border-green-600/20">
                                    <h3 className="text-white font-bold mb-2 font-sans">⚡ Important Notes</h3>
                                    <ul className="text-gray-200 text-sm space-y-2 font-sans">
                                      <li>• Participants must bring their own laptops</li>
                                      <li>• Necessary software should be pre-installed</li>
                                      <li>• Power backup will be provided</li>
                                      <li>• Wi-Fi will be available for specific events</li>
                                      <li>• Lunch will be provided for all participants</li>
                                    </ul>
                                  </div>
                                  <div className="bg-red-600/20 rounded-lg p-4 border border-red-500/30">
                                    <h3 className="text-white font-bold mb-2 font-sans">⚠️ Final Decision</h3>
                                    <p className="text-white text-sm font-bold font-sans">
                                      The decision of the judges and event organizers will be final and binding in all matters.
                                      No requests for re-evaluation will be entertained.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-6 text-center">
                                <p className="text-green-400 text-sm font-semibold font-sans">
                                  For detailed rules of each event, please download the complete rule book.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Footer />
                </div>
            </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}