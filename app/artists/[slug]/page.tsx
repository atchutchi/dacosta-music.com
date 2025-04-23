"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Instagram,
  Twitter,
  Globe,
  Music,
  Calendar,
  MapPin,
  Play,
  Pause,
  ExternalLink,
  Facebook,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

interface Artist {
  id: string
  name: string
  logo: string
  image: string
  secondaryImage: string
  bio: string
  longBio: string
  genres: string[]
  stats: {
    streams?: string
    views?: string
    youtube?: string
    subscribers?: string
    followers: {
      instagram?: string
      twitter?: string
      facebook?: string
      spotify?: string
      youtube?: string
      soundcloud?: string
    }
  }
  discography: {
    albums?: Array<{
      title: string
      year: string
    }>
    eps?: Array<{
      title: string
      year: string
    }>
    tracks: Array<{
      title: string
      featuring?: string
      type?: string
    }>
  }
  liveSets: Array<{
    title: string
    url: string
  }>
  socials: {
    instagram: string
    twitter: string
    website: string
    facebook?: string
  }
  tracks: {
    id: string
    title: string
    duration: string
  }[]
  events: {
    id: string
    name: string
    date: string
    location: string
    ticketLink: string
  }[]
  gallery: string[]
}

export default function ArtistPage() {
  const params = useParams()
  const artistSlug = params.slug as string
  const [artist, setArtist] = useState<Artist | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTrack, setActiveTrack] = useState<string | null>(null)

  useEffect(() => {
    // Simulate fetching artist data
    const fetchArtist = () => {
      const artists: Artist[] = [
        {
          id: "caiiro",
          name: "Caiiro",
          logo: "/images/caiiro-logo-white.png",
          image: "/images/dj-performance-1.png",
          secondaryImage: "/images/caiiro-new-photo.jpeg",
          bio: "Renowned for his emotionally charged soundscapes and powerful Afro-Tech sets.",
          longBio:
            'Patrick Dumisani Mahlangu, known as Caiiro, is a leading South African DJ and producer in the global house music scene. Inspired by Egyptian history and diverse cultures, his unique sound has attracted a worldwide audience. His third album, Pyramids (2022), was a breakthrough success, cementing his status in electronic music.\n\nCaiiro has performed in 30+ countries across five continents, with his track "The Akan" becoming a viral sensation on major electronic stages. His remix collaboration with Adam Port on "Your Voice" became one of the year\'s biggest house hits, earning him recognition as one of 1001 Tracklists\' most influential producers in 2022.\n\nHis latest release, the self-titled album Caiiro (July 2024), has gained strong industry and listener support. It surpassed one million streams in its first month and exceeded 10 million Spotify streams in six months. Mixmag named him among the "DJs Who Defined the Year".',
          genres: ["Afro House", "Deep Tech", "Afro Tech"],
          stats: {
            streams: "90M",
            youtube: "116M",
            followers: {
              instagram: "150K",
              facebook: "467K",
            },
          },
          discography: {
            albums: [
              { title: "Agora", year: "2020" },
              { title: "Pyramids", year: "2022" },
              { title: "Caiiro", year: "2024" },
            ],
            tracks: [
              { title: "The Akan" },
              { title: "Your Voice Remix", featuring: "AWEN, Adam Port" },
              { title: "Bayede (Caiiro Remix)", featuring: "DJ Kabila" },
              { title: "Ndisize", featuring: "Amu Fati" },
            ],
          },
          liveSets: [
            { title: "Live From Descendants New York 2024", url: "https://youtu.be/aFdXXor046w" },
            { title: "Live From Defected HQ", url: "https://youtu.be/NZYPi8SCR_s" },
          ],
          socials: {
            instagram: "https://instagram.com/caiiro",
            twitter: "https://twitter.com/caiiro",
            website: "https://caiiro.com",
            facebook: "https://facebook.com/caiirodj",
          },
          tracks: [
            { id: "track1", title: "The Akan", duration: "6:24" },
            { id: "track2", title: "Your Voice (Remix)", duration: "7:15" },
            { id: "track3", title: "Bayede (Remix)", duration: "5:48" },
            { id: "track4", title: "Ndisize ft. Amu Fati", duration: "6:52" },
            { id: "track5", title: "Pyramids", duration: "8:10" },
          ],
          events: [
            {
              id: "event1",
              name: "Afro House Experience",
              date: "June 15, 2023",
              location: "London, UK",
              ticketLink: "#",
            },
            {
              id: "event2",
              name: "Summer Vibes Festival",
              date: "July 22, 2023",
              location: "Berlin, Germany",
              ticketLink: "#",
            },
            {
              id: "event3",
              name: "Club Night Special",
              date: "August 5, 2023",
              location: "Johannesburg, SA",
              ticketLink: "#",
            },
          ],
          gallery: [
            "/images/dj-performance-1.png",
            "/images/dj-performance-2.png",
            "/images/concert-phones.png",
            "/images/dj-closeup.png",
          ],
        },
        {
          id: "dacapo",
          name: "Da Capo",
          logo: "/images/Da-Capo-logo-white.png",
          image: "/images/dj-white-shirt.png",
          secondaryImage: "/images/dj-white-shirt.png",
          bio: "A visionary in Afro House and Deep Tech, known for rich, layered productions.",
          longBio:
            "Da Capo, born Nicodimas Mogashoa, is a self-taught South African DJ and producer renowned for his innovative approach to music. His stage name, 'Da Capo,' signifies a commitment to constant evolution.\n\nHaving signed with DNH Records at 20, Da Capo quickly made his mark in the Afro House scene. His 2014 debut album featured collaborations with notable vocalists. Joining Soulistic Music in 2015, he released the acclaimed 'Touched' EP in 2016.\n\nIn 2017, the highly anticipated 'Indigo Child Part I' album showcased his versatile sound, garnering over 38 million streams. Platinum-certified singles like 'Africa' and 'Kelaya' solidified his global impact. In 2020, Da Capo founded Genesys Entity, releasing hits like 'Yehla Moja.'\n\nHis international presence is evident in performances at iconic venues like OUTPUT in New York and Hï Ibiza in Ibiza. Da Capo's unwavering commitment to musical excellence continues to redefine the global house music landscape.",
          genres: ["Afro House", "Deep House", "Electronic"],
          stats: {
            streams: "85M",
            views: "14M",
            followers: {
              instagram: "250K",
              facebook: "663K",
            },
          },
          discography: {
            albums: [
              { title: "Da Capo", year: "2014" },
              { title: "Indigo Child Part I", year: "2017" },
              { title: "Genesys", year: "2020" },
              { title: "Return To The Beginning", year: "2021" },
              { title: "Bakone", year: "2023" },
            ],
            eps: [{ title: "Kunye EP6 Da Capo", year: "2023" }],
            tracks: [
              { title: "Afrika", featuring: "Tshepo King" },
              { title: "Umbovukazi" },
              { title: "Mama (Da Capo's Touch)" },
              { title: "Secret ID", featuring: "Moojo" },
            ],
          },
          liveSets: [{ title: "Kunye EP6 Da Capo", url: "https://youtu.be/j8w9SSlSk3I" }],
          socials: {
            instagram: "https://instagram.com/dacapo",
            twitter: "https://twitter.com/dacapo",
            website: "https://dacapo.com",
            facebook: "https://facebook.com/dacapomusic",
          },
          tracks: [
            { id: "track6", title: "Afrika ft. Tshepo King", duration: "7:15" },
            { id: "track7", title: "Umbovukazi", duration: "8:10" },
            { id: "track8", title: "Mama (Da Capo's Touch)", duration: "8:20" },
            { id: "track9", title: "Secret ID ft. Moojo", duration: "7:05" },
            { id: "track10", title: "Indigo Child", duration: "6:18" },
          ],
          events: [
            {
              id: "event4",
              name: "Deep House Sessions",
              date: "May 28, 2023",
              location: "Amsterdam, Netherlands",
              ticketLink: "#",
            },
            {
              id: "event5",
              name: "Electronic Nights",
              date: "June 10, 2023",
              location: "Barcelona, Spain",
              ticketLink: "#",
            },
            {
              id: "event6",
              name: "African Beats Festival",
              date: "July 15, 2023",
              location: "Cape Town, SA",
              ticketLink: "#",
            },
          ],
          gallery: [
            "/images/dj-white-shirt.png",
            "/images/dj-duo.png",
            "/images/crowd-pattern.png",
            "/images/dj-closeup.png",
          ],
        },
        {
          id: "enoonapa",
          name: "Enoo Napa",
          logo: "/images/enoo-napa-logo-white.png",
          image: "/images/dj-red-light.png",
          secondaryImage: "/images/dj-red-light.png",
          bio: "Delivers cutting-edge Afro-Electronic music with a signature edge.",
          longBio:
            "Enoo Napa, the self-taught Afro House and Afro Tech maestro from Durban, South Africa, made his mark in 2013 with a distinctive fusion of Afro House basslines and tech synths. His transformative remix of Jackie Queen's \"Conqueror\" in 2015, catching the ears of international DJs, notably Black Coffee, marked a pivotal moment in his career.\n\nOver the last 5 years, Enoo Napa has not only remixed for industry giants like Black Coffee, Mi Casa, and others but also graced prestigious stages such as Hi Ibiza, Circoloco Ibiza, and Scorpios Mykonos. His tracks, released on acclaimed labels like MoBlack and Offering Recordings, position him as a rising star in the global house music scene.\n\nAnticipation is building for Enoo Napa's highly awaited debut album, set to release in mid-2024. As a key contributor to the exposure and evolution of the Afro House/Tech sound, he is not just reshaping the cultural definition of house music but also building a movement and promising further innovation for the global house music scene.",
          genres: ["Afro Tech", "Tribal House", "Progressive"],
          stats: {
            streams: "10M",
            followers: {
              instagram: "105K",
              facebook: "238K",
              soundcloud: "12K",
            },
          },
          discography: {
            eps: [
              { title: "Behind These Walls", year: "2019" },
              { title: "Elements", year: "2019" },
              { title: "Drones", year: "2020" },
              { title: "Mind Control", year: "2021" },
              { title: "Two Zulu Men In Ibiza", year: "2022" },
            ],
            tracks: [
              { title: "Your Voice (Enoo Napa Remix)", featuring: "Caiiro x Awen", year: "2020" },
              { title: "Brocode", featuring: "DJ Merlon x Enoo Napa", year: "2024" },
            ],
          },
          liveSets: [{ title: "Enoo Napa at U'R 2022", url: "https://youtu.be/DdAwaMUnCUw" }],
          socials: {
            instagram: "https://instagram.com/enoonapa",
            twitter: "https://twitter.com/enoonapa",
            website: "https://enoonapa.com",
            facebook: "https://facebook.com/enoonapamusic",
          },
          tracks: [
            { id: "track11", title: "Behind These Walls", duration: "5:48" },
            { id: "track12", title: "Elements", duration: "7:32" },
            { id: "track13", title: "Drones", duration: "7:05" },
            { id: "track14", title: "Mind Control", duration: "6:55" },
            { id: "track15", title: "Two Zulu Men In Ibiza", duration: "6:40" },
          ],
          events: [
            {
              id: "event7",
              name: "Tech House Night",
              date: "June 3, 2023",
              location: "Paris, France",
              ticketLink: "#",
            },
            {
              id: "event8",
              name: "Progressive Sessions",
              date: "July 8, 2023",
              location: "Miami, USA",
              ticketLink: "#",
            },
            {
              id: "event9",
              name: "Tribal Gathering",
              date: "August 19, 2023",
              location: "Lagos, Nigeria",
              ticketLink: "#",
            },
          ],
          gallery: [
            "/images/dj-red-light.png",
            "/images/club-view.png",
            "/images/crowd-lights.png",
            "/images/dj-closeup.png",
          ],
        },
      ]

      const foundArtist = artists.find((a) => a.id === artistSlug)
      setArtist(foundArtist || null)
      setIsLoading(false)
    }

    fetchArtist()
  }, [artistSlug])

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-white/10 rounded mb-4"></div>
          <div className="h-4 w-48 bg-white/10 rounded"></div>
        </div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Artist Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the artist you're looking for.</p>
          <Link href="/artists">
            <Button>View All Artists</Button>
          </Link>
        </div>
      </div>
    )
  }

  const togglePlay = (trackId: string) => {
    if (activeTrack === trackId) {
      setActiveTrack(null)
    } else {
      setActiveTrack(trackId)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/artists">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Artists
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-lg"
          >
            <img
              src={artist.id === "caiiro" ? "/images/caiiro-new-photo.jpeg" : artist.secondaryImage}
              alt={artist.name}
              className="w-full h-[500px] object-cover"
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 h-20 flex items-center">
              <img
                src={
                  artist.id === "caiiro"
                    ? "/images/caiiro-white-logo.png"
                    : artist.id === "dacapo"
                      ? "/images/Da-Capo-logo-white.png"
                      : "/images/enoo-napa-logo-white.png"
                }
                alt={artist.name}
                className="h-auto max-h-20 w-auto object-contain"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {artist.genres.map((genre) => (
                <span key={genre} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            <div className="mb-8 whitespace-pre-line">
              <p className="text-white/80">{artist.longBio}</p>
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-4 mb-8">
              {artist.stats.streams && (
                <div className="bg-black border border-white/10 p-4 rounded-lg text-center min-w-[100px]">
                  <p className="text-2xl font-bold">{artist.stats.streams}</p>
                  <p className="text-sm text-white/60">Streams</p>
                </div>
              )}
              {artist.stats.youtube && (
                <div className="bg-black border border-white/10 p-4 rounded-lg text-center min-w-[100px]">
                  <p className="text-2xl font-bold">{artist.stats.youtube}</p>
                  <p className="text-sm text-white/60">YouTube</p>
                </div>
              )}
              {artist.stats.views && (
                <div className="bg-black border border-white/10 p-4 rounded-lg text-center min-w-[100px]">
                  <p className="text-2xl font-bold">{artist.stats.views}</p>
                  <p className="text-sm text-white/60">Views</p>
                </div>
              )}
              {artist.stats.followers?.instagram && (
                <div className="bg-black border border-white/10 p-4 rounded-lg text-center min-w-[100px]">
                  <p className="text-2xl font-bold">{artist.stats.followers.instagram}</p>
                  <p className="text-sm text-white/60">Instagram</p>
                </div>
              )}
              {artist.stats.followers?.facebook && (
                <div className="bg-black border border-white/10 p-4 rounded-lg text-center min-w-[100px]">
                  <p className="text-2xl font-bold">{artist.stats.followers.facebook}</p>
                  <p className="text-sm text-white/60">Facebook</p>
                </div>
              )}
              {artist.stats.followers?.soundcloud && (
                <div className="bg-black border border-white/10 p-4 rounded-lg text-center min-w-[100px]">
                  <p className="text-2xl font-bold">{artist.stats.followers.soundcloud}</p>
                  <p className="text-sm text-white/60">SoundCloud</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={artist.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/70 hover:text-white transition-colors duration-300"
              >
                <Instagram className="h-5 w-5 mr-2" />
                <span>Instagram</span>
              </a>
              {artist.socials.facebook && (
                <a
                  href={artist.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white/70 hover:text-white transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5 mr-2" />
                  <span>Facebook</span>
                </a>
              )}
              <a
                href={artist.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/70 hover:text-white transition-colors duration-300"
              >
                <Twitter className="h-5 w-5 mr-2" />
                <span>Twitter</span>
              </a>
              <a
                href={artist.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/70 hover:text-white transition-colors duration-300"
              >
                <Globe className="h-5 w-5 mr-2" />
                <span>Website</span>
              </a>
            </div>

            <Link href="/#contact">
              <Button className="bg-white text-black hover:bg-white/90">
                <Music className="mr-2 h-5 w-5" />
                Book for Event
              </Button>
            </Link>
          </motion.div>
        </div>

        <Tabs defaultValue="music" className="w-full mb-16">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="discography">Discography</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="music" className="space-y-4">
            <div className="bg-white/5 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-xl font-semibold">Latest Tracks</h3>
              </div>
              <div className="divide-y divide-white/10">
                {artist.tracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center p-4 hover:bg-white/10 cursor-pointer"
                    onClick={() => togglePlay(track.id)}
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                        {activeTrack === track.id ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-medium">{track.title}</p>
                      <p className="text-sm text-white/60">{artist.name}</p>
                    </div>
                    <div className="text-white/60">{track.duration}</div>
                  </div>
                ))}
              </div>
            </div>

            {artist.liveSets && artist.liveSets.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Live Sets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {artist.liveSets.map((set, index) => (
                    <a
                      key={index}
                      href={set.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Play className="h-5 w-5 mr-3 text-white/70" />
                      <span>{set.title}</span>
                      <ExternalLink className="h-4 w-4 ml-auto text-white/50" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="discography" className="space-y-8">
            {artist.discography.albums && artist.discography.albums.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Albums</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {artist.discography.albums.map((album, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg">
                      <div className="aspect-square bg-white/10 rounded-md mb-3 flex items-center justify-center">
                        <Music className="h-12 w-12 text-white/30" />
                      </div>
                      <h4 className="font-medium">{album.title}</h4>
                      <p className="text-sm text-white/60">{album.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {artist.discography.eps && artist.discography.eps.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">EPs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {artist.discography.eps.map((ep, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg">
                      <div className="aspect-square bg-white/10 rounded-md mb-3 flex items-center justify-center">
                        <Music className="h-12 w-12 text-white/30" />
                      </div>
                      <h4 className="font-medium">{ep.title}</h4>
                      <p className="text-sm text-white/60">{ep.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold mb-4">Selected Tracks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artist.discography.tracks.map((track, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg flex items-center">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                      <Music className="h-5 w-5 text-white/70" />
                    </div>
                    <div>
                      <h4 className="font-medium">{track.title}</h4>
                      {track.featuring && <p className="text-sm text-white/60">feat. {track.featuring}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artist.events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 mr-2 text-white/60" />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                  <div className="flex items-center mb-6 text-white/60">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-white text-black hover:bg-white/90">Get Tickets</Button>
                  </a>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {artist.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden rounded-lg aspect-square"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${artist.name} - Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">More From Da Costa Music</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/artists"
              className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">Explore Artists</h3>
              <p className="text-white/60">Discover more talented artists from our roster.</p>
            </Link>
            <Link href="/#music" className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-2">Listen to Music</h3>
              <p className="text-white/60">Explore our curated playlists and latest releases.</p>
            </Link>
            <Link
              href="/#contact"
              className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">Book an Artist</h3>
              <p className="text-white/60">Get in touch to book {artist.name} for your event.</p>
            </Link>
          </div>
          <div className="mt-8">
            <p className="text-white/60 mb-2">For booking inquiries:</p>
            <a href="mailto:bookings@dacosta-music.com" className="text-white hover:text-white/80 font-medium">
              bookings@dacosta-music.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
