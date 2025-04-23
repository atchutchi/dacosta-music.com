import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-white.png"
                alt="Da Costa Music"
                width={120}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-white/70 mb-6">
              A creative agency and talent management company representing a new era of African electronic music.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/dacosta_music/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#about" className="text-white/70 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#roster" className="text-white/70 hover:text-white">
                  Artist Roster
                </Link>
              </li>
              <li>
                <Link href="/#music" className="text-white/70 hover:text-white">
                  Music
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-white/70 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/#blog" className="text-white/70 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-white/70 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Artists</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/artists/caiiro" className="text-white/70 hover:text-white">
                  Caiiro
                </Link>
              </li>
              <li>
                <Link href="/artists/dacapo" className="text-white/70 hover:text-white">
                  Da Capo
                </Link>
              </li>
              <li>
                <Link href="/artists/enoonapa" className="text-white/70 hover:text-white">
                  Enoo Napa
                </Link>
              </li>
              <li>
                <Link href="/b3b" className="text-white/70 hover:text-white">
                  B3B Concept
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter for the latest updates on releases, events, and exclusive content.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/5 border border-white/10 rounded-l-md px-4 py-2 w-full focus:outline-none focus:border-white"
              />
              <button className="bg-white text-black px-4 py-2 rounded-r-md hover:bg-white/90">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Da Costa Music. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-white/60 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-white/60 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
