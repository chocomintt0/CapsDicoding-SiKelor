"use client"

import { useEffect, useState } from "react"
import { startViewTransition } from "../utils/transitions"
import Hero from "../components/Hero"
import AboutSection from "../components/AboutSection"
import Gallery from "../components/Gallery"
import EventPreview from "../components/EventPreview"
import ArticlePreview from "../components/ArticlePreview"

function Home({ onNavigate }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (page, id = null) => {
    startViewTransition(() => {
      onNavigate(page, id)
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative"
        style={{
          backgroundImage: "url('/src/assets/bg-hero.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "110%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="relative z-10">
          <Hero onNavigate={onNavigate} />
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery onNavigate={handleNavigate} />

      {/* About Section */}
      <AboutSection onNavigate={onNavigate} />

      {/* Event Preview Section */}
      <EventPreview onViewAllEvents={handleNavigate} />

      {/* Article Preview Section */}
      <ArticlePreview onViewAllArticles={handleNavigate} />

      {/* Footer Section */}
        <div className="bg-gradient-to-t from-[#bdbbbbd5] to-[#ffffffd7] text-black px-6 pt-24 pb-4 mt-0">
          <div className="max-w-6xl mx-auto transition-all duration-700 ease-out transform">
            <div className="grid grid-cols-1 pl-[77px] sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm shadow-xl p-14">
              <div>
                {/* Logo */}
                <img src="/src/assets/logo-away.png" alt="SIKELOR Logo" className="h-12 mb-3" />
                <p className="text-black/80">
                  Sistem Informasi Kebudayaan dan Edukasi Rakyat. Menyediakan eksplorasi budaya Sulawesi Tengah secara digital dan interaktif.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-base mb-3">Navigation</h4>
                <ul className="space-y-2 text-black/80">
                  <li><a href="#" className="hover:text-white">Home</a></li>
                  <li><a href="#" className="hover:text-white">Event</a></li>
                  <li><a href="#" className="hover:text-white">Artikel</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-base mb-3">Contact</h4>
                <ul className="space-y-2 text-black/80">
                  <li>Email: <a href="mailto:info@sikelor.id" className="hover:text-white">info@sikelor.id</a></li>
                  <li>Telp: +62 812-3456-7890</li>
                  <li>Alamat: Palu, Sulawesi Tengah</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-base mb-3">Follow Us</h4>
                <div className="flex space-x-4 mt-2 text-lg">
                  <a href="#" className="hover:text-white transition">🌐</a>
                  <a href="#" className="hover:text-white transition">🐦</a>
                  <a href="#" className="hover:text-white transition">📷</a>
                  <a href="#" className="hover:text-white transition">▶️</a>
                </div>
              </div>
            </div>

            <hr className="border-black/40" />

            <p className="text-center text-black/60 text-sm mt-4 mb-0">
              © {new Date().getFullYear()} SIKELOR. All rights reserved.
            </p>
          </div>
        </div>
    </div>
  )
}

export default Home
