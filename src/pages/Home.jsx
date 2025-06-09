"use client"

import { startViewTransition } from "../utils/transitions"
import Hero from "../components/Hero"
import AboutSection from "../components/AboutSection"
import Gallery from "../components/Gallery"
import EventPreview from "../components/EventPreview"
import ArticlePreview from "../components/ArticlePreview"
import Contact from "../components/Contact"

function Home({ onNavigate }) {
  const handleNavigate = (page, id = null) => {
    startViewTransition(() => {
      onNavigate(page, id)
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero and Contact sections with unified background */}
      <div
        className="relative"
        style={{
          backgroundImage: "url('/src/assets/bg-hero.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* Hero Section */}
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

      {/* Contact Section with same background as Hero */}
      <div
        className="relative"
        style={{
          backgroundImage: "url('/src/assets/bg-hero.png')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* Contact Section */}
        <div className="relative z-10 backdrop-blur-sm">
          <Contact />
          {/* Footer */}
          <footer className="bg-transparent text-white text-center py-4 mt-auto">
            <p className="text-xs lg:text-sm">© 2025 Sikelor. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Home
