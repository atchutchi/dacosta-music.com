"use client"

import { useState, useEffect } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video autoPlay muted loop playsInline className="hero-video" poster="/images/dj-performance-1.png">
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        {/* Fallback image if video doesn't load */}
      </video>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 tracking-tighter">
            DA COSTA <span className="text-stroke">MUSIC</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/80">
            Bridging culture, creativity, and global sound by developing standout talent and curating experiences that
            elevate African electronic music.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-black hover:bg-white/90 min-w-[150px]">Our Roster</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 min-w-[150px]">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6" />
        </div>
      </div>
    </section>
  )
}
