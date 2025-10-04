"use client"

import type { HTMLAttributes } from "react"
import { useState } from "react"

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

function ContactCard() {
  const [showContact, setShowContact] = useState(false)

  return (
    <div className="relative">
      {/* Contact Button */}
      <button
        onClick={() => setShowContact(!showContact)}
        className="rounded-xl bg-gradient-to-r from-green-800 to-green-700 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 px-6 text-sm transition-all duration-300 ease-in-out transform hover:scale-105 border border-green-600/50 backdrop-blur-sm shadow-lg"
      >
        📞 Contact Us
      </button>

      {/* Contact Card */}
      {showContact && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-80">
          <div className="relative rounded-2xl bg-gradient-to-b from-[#171a17] to-[#0b0e0b] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.8)] ring-1 ring-green-800/30 backdrop-blur-sm">
            {/* Close button */}
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-2 right-2 text-green-400 hover:text-green-300 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-800/20 transition-colors"
            >
              ×
            </button>

            {/* Contact Header */}
            <div className="text-center mb-4">
              <h3 className="text-green-400 font-bold text-lg mb-2">Get In Touch</h3>
              <div className="w-16 h-0.5 bg-green-400 mx-auto"></div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-black/30 border border-green-600/20">
                <div className="text-green-400 text-lg">📱</div>
                <div>
                  <p className="text-gray-300 text-xs">Phone</p>
                  <a 
                    href="tel:+916364209277"
                    className="text-white font-mono hover:text-green-400 transition-colors"
                  >
                    +91 6364209277
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-black/30 border border-green-600/20">
                <div className="text-green-400 text-lg">📧</div>
                <div>
                  <p className="text-gray-300 text-xs">Email</p>
                  <a 
                    href="mailto:sumantsbhatta@gmail.com"
                    className="text-white font-mono hover:text-green-400 transition-colors break-all"
                  >
                    sumantsbhatta@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs">Feel free to reach out for any queries about #include events!</p>
            </div>
          </div>

          {/* Arrow pointing down to button */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-green-800/30"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Footer(props: FooterProps) {
  return (
    <footer
      {...props}
      className={`relative w-full overflow-hidden bg-gradient-to-b from-black via-[#0b0f0b] to-black ${props.className ?? ""}`}
    >
      {/* Top subtle green glow */}
      <div className="pointer-events-none absolute -top-24 left-0 right-0 h-32 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(0,180,90,0.35),rgba(0,0,0,0))]" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative grid items-end gap-6 md:grid-cols-[1fr_360px]">
          {/* Left: vintage keyboard panel */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[#171a17] to-[#0b0e0b] p-5 shadow-[inset_0_-2px_16px_rgba(0,0,0,0.65)] ring-1 ring-green-800/20">
            {/* grill */}
            <div className="mb-6 space-y-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-2 rounded bg-black/50 shadow-inner ring-1 ring-black/40" />
              ))}
            </div>

            {/* keys row */}
            <div className="grid grid-cols-4 gap-3">
              {[
                "#include",
                "#include<web>",
                "code",
                "idea",
              ].map((label) => (
                <button
                  key={label}
                  className="rounded-[14px] px-3 py-3 text-[11px] font-bold tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_6px_12px_rgba(0,0,0,0.5)] ring-1 ring-black/60 bg-[linear-gradient(180deg,#2a2d2a,#101310)] hover:bg-[linear-gradient(180deg,#323632,#141814)] active:translate-y-0.5"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* space bar */}
            <div className="mt-4">
              <div className="rounded-xl bg-[linear-gradient(180deg,#232623,#0d100d)] ring-1 ring-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_14px_rgba(0,0,0,0.6)] px-4 py-4 text-center text-xs font-semibold tracking-wide text-green-200/90">
                #include&lt;type&gt;
              </div>
            </div>
          </div>

          {/* Right: smaller centered CRT with # */}
          <div className="relative mx-auto w-full max-w-[360px]">
            <div className="relative rounded-[24px] ring-1 ring-green-800/25 bg-gradient-to-b from-[#151815] to-[#0b0e0b] p-5 shadow-lg">
              {/* mounting screws */}
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 rounded-full bg-[#070a07] shadow ring-2 ring-black/70" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 rounded-full bg-[#070a07] shadow ring-2 ring-black/70" />
              <div className="pointer-events-none absolute left-3 bottom-3 h-3 w-3 rounded-full bg-[#070a07] shadow ring-2 ring-black/70" />
              <div className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 rounded-full bg-[#070a07] shadow ring-2 ring-black/70" />

              <div className="relative mx-auto aspect-square w-full max-w-[280px] rounded-full bg-[#090d09] p-4 ring-1 ring-green-700/30 shadow-[inset_0_0_80px_rgba(0,255,120,0.06)]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-[radial-gradient(58%_60%_at_50%_40%,rgba(0,120,60,0.3),rgba(0,20,0,0.92))]">
                  <div className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,255,120,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,120,0.14) 1px, transparent 1px)",
                      backgroundSize: "18px 18px, 18px 18px",
                    }}
                  />
                  <div className="absolute inset-x-0 top-1/3 h-8 bg-[radial-gradient(50%_100%_at_50%_50%,rgba(0,255,120,0.28),transparent)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative select-none">
                      <span className="relative z-10 font-mono text-[220px] leading-none text-gray-300 drop-shadow-[0_0_12px_rgba(200,200,200,0.45)]">#</span>
                      <span aria-hidden className="absolute left-0 top-0 font-mono text-[220px] leading-none text-[#cfd3cf] opacity-60 translate-x-[0.5px] mix-blend-screen animate-[glitch1_2.2s_infinite]">#</span>
                      <span aria-hidden className="absolute left-0 top-0 font-mono text-[220px] leading-none text-[#9ea3a0] opacity-45 -translate-x-[0.5px] mix-blend-screen animate-[glitch2_2.6s_infinite]">#</span>
                      <span aria-hidden className="absolute left-0 top-0 font-mono text-[220px] leading-none text-gray-400 opacity-35 animate-[blink_3.2s_infinite]">#</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 flex justify-center">
          <ContactCard />
        </div>

        <div className="mt-8 flex items-center justify-between text-xs text-green-300/60">
          <span>© {new Date().getFullYear()} #include</span>
          <span className="uppercase tracking-widest">Crafted with <span className="text-green-400">0x</span> energy</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes glitch1 {
          0%, 100% { transform: translate(0, 0); filter: none; }
          10% { transform: translate(1px, -0.5px) skewX(0.3deg); }
          20% { transform: translate(-0.5px, 0.8px) skewY(-0.3deg); }
          30% { transform: translate(0.8px, 0.4px) skewX(-0.2deg); }
          40% { transform: translate(-0.8px, -0.6px); }
          50% { transform: translate(0.6px, 0.6px); }
          60% { transform: translate(-0.4px, 0.2px); }
          70% { transform: translate(0.2px, -0.6px); }
          80% { transform: translate(-0.6px, 0.4px); }
          90% { transform: translate(0.4px, -0.2px); }
        }
        @keyframes glitch2 {
          0%, 100% { transform: translate(0, 0); filter: none; }
          12% { transform: translate(-1px, 0.6px) skewX(-0.3deg); }
          22% { transform: translate(0.7px, -0.7px) skewY(0.3deg); }
          32% { transform: translate(-0.9px, -0.3px); }
          42% { transform: translate(0.9px, 0.7px); }
          52% { transform: translate(-0.7px, 0.3px); }
          62% { transform: translate(0.5px, -0.5px); }
          72% { transform: translate(-0.3px, 0.5px); }
          82% { transform: translate(0.7px, -0.3px); }
          92% { transform: translate(-0.5px, 0.2px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.35; }
          10% { opacity: 0.2; }
          20% { opacity: 0.5; }
          30% { opacity: 0.25; }
          40% { opacity: 0.6; }
          50% { opacity: 0.25; }
          60% { opacity: 0.5; }
          70% { opacity: 0.2; }
          80% { opacity: 0.6; }
          90% { opacity: 0.25; }
        }
      `}</style>
    </footer>
  )
}
