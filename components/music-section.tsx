"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  audioSrc?: string
}

export default function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(30)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(30)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number | null>(null)

  const playlists = [
    {
      id: "afro-house",
      name: "Afro House",
      tracks: [
        {
          id: "track1",
          title: "Rhythmic Journey",
          artist: "Caiiro",
          duration: "6:24",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
        {
          id: "track2",
          title: "Ancestral Drums",
          artist: "Da Capo",
          duration: "7:15",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        },
        {
          id: "track3",
          title: "Sunset Melodies",
          artist: "Enoo Napa",
          duration: "5:48",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        },
        {
          id: "track4",
          title: "Urban Echoes",
          artist: "Caiiro",
          duration: "6:52",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        },
        {
          id: "track5",
          title: "Tribal Fusion",
          artist: "Da Capo",
          duration: "8:10",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        },
      ],
    },
    {
      id: "deep-tech",
      name: "Deep Tech",
      tracks: [
        {
          id: "track6",
          title: "Midnight Groove",
          artist: "Enoo Napa",
          duration: "7:32",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        },
        {
          id: "track7",
          title: "Electric Soul",
          artist: "Caiiro",
          duration: "6:45",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        },
        {
          id: "track8",
          title: "Urban Pulse",
          artist: "Da Capo",
          duration: "8:20",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        },
        {
          id: "track9",
          title: "Distant Horizons",
          artist: "Enoo Napa",
          duration: "7:05",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        },
        {
          id: "track10",
          title: "Rhythm Section",
          artist: "Caiiro",
          duration: "6:18",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        },
      ],
    },
    {
      id: "afro-tech",
      name: "Afro Tech",
      tracks: [
        {
          id: "track11",
          title: "Digital Savanna",
          artist: "Da Capo",
          duration: "7:48",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        },
        {
          id: "track12",
          title: "Future Roots",
          artist: "Enoo Napa",
          duration: "6:55",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        },
        {
          id: "track13",
          title: "Cosmic Drums",
          artist: "Caiiro",
          duration: "8:12",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        },
        {
          id: "track14",
          title: "Tribal Code",
          artist: "Da Capo",
          duration: "7:30",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        },
        {
          id: "track15",
          title: "Electronic Safari",
          artist: "Enoo Napa",
          duration: "6:40",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        },
      ],
    },
  ]

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(playlists[0].tracks[currentTrack].audioSrc)

      audioRef.current.addEventListener("loadedmetadata", () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration)
        }
      })

      audioRef.current.addEventListener("ended", () => {
        nextTrack()
      })
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("loadedmetadata", () => {})
        audioRef.current.removeEventListener("ended", () => {})
      }
    }
  }, [])

  useEffect(() => {
    // Update audio source when track changes
    if (audioRef.current) {
      audioRef.current.src = playlists[0].tracks[currentTrack].audioSrc || ""
      audioRef.current.load()

      if (isPlaying) {
        audioRef.current.play()
        startProgressAnimation()
      }
    }
  }, [currentTrack])

  useEffect(() => {
    // Update volume
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const startProgressAnimation = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)

      animationRef.current = requestAnimationFrame(startProgressAnimation)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      } else {
        audioRef.current.play()
        startProgressAnimation()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playTrack = (index: number) => {
    setCurrentTrack(index)
    setIsPlaying(true)

    if (audioRef.current) {
      audioRef.current.src = playlists[0].tracks[index].audioSrc || ""
      audioRef.current.load()
      audioRef.current.play()
      startProgressAnimation()
    }
  }

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % playlists[0].tracks.length
    setCurrentTrack(nextIndex)
  }

  const prevTrack = () => {
    const prevIndex = currentTrack === 0 ? playlists[0].tracks.length - 1 : currentTrack - 1
    setCurrentTrack(prevIndex)
  }

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        setVolume(previousVolume)
        audioRef.current.volume = previousVolume / 100
      } else {
        setPreviousVolume(volume)
        setVolume(0)
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <section id="music" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Music
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 max-w-2xl mx-auto"
          >
            Explore our curated playlists featuring the latest releases and timeless classics from our roster of
            talented artists.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="afro-house" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {playlists.map((playlist) => (
                <TabsTrigger key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {playlists.map((playlist) => (
              <TabsContent key={playlist.id} value={playlist.id} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 rounded-lg overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-xl font-semibold">{playlist.name} Playlist</h3>
                  </div>
                  <div className="divide-y divide-white/10">
                    {playlist.tracks.map((track, index) => (
                      <div
                        key={track.id}
                        className={`flex items-center p-4 hover:bg-white/10 cursor-pointer ${
                          currentTrack === index && isPlaying ? "bg-white/10" : ""
                        }`}
                        onClick={() => playTrack(index)}
                      >
                        <div className="w-8 text-center text-white/60">
                          {currentTrack === index && isPlaying ? (
                            <div className="flex space-x-1 justify-center">
                              <div className="w-1 h-8 bg-white animate-pulse"></div>
                              <div className="w-1 h-8 bg-white animate-pulse delay-75"></div>
                              <div className="w-1 h-8 bg-white animate-pulse delay-150"></div>
                            </div>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="font-medium">{track.title}</p>
                          <p className="text-sm text-white/60">{track.artist}</p>
                        </div>
                        <div className="text-white/60">{track.duration}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Music Player */}
          <div className="music-player fixed bottom-0 left-0 right-0 border-t border-white/10 p-4 z-40">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 mr-4 mb-4 md:mb-0 text-center md:text-left">
                  <p className="font-medium truncate">{playlists[0].tracks[currentTrack].title}</p>
                  <p className="text-sm text-white/60 truncate">{playlists[0].tracks[currentTrack].artist}</p>
                </div>

                <div className="flex flex-col items-center w-full md:w-auto">
                  <div className="flex items-center space-x-4 mb-2">
                    <Button variant="ghost" size="icon" onClick={prevTrack}>
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextTrack}>
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center w-full max-w-md space-x-2">
                    <span className="text-xs text-white/60 w-10">{formatTime(currentTime)}</span>
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={1}
                      className="w-full"
                      onValueChange={(value) => handleTimeChange(value)}
                    />
                    <span className="text-xs text-white/60 w-10">{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex-1 ml-4 flex items-center justify-end mt-4 md:mt-0">
                  <Button variant="ghost" size="icon" onClick={toggleMute}>
                    {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    className="w-full max-w-xs mx-4"
                    onValueChange={(value) => {
                      setVolume(value[0])
                      setIsMuted(value[0] === 0)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
