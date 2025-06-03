"use client"

import { useState, useEffect } from "react"
import { startViewTransition } from "./utils/transitions"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Articles from "./pages/Articles"
import Events from "./pages/Events"
import Scan from "./pages/Scan"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleNavigate = (page) => {
    if (isTransitioning || page === currentPage) return

    console.log("Navigating to:", page)
    setIsTransitioning(true)

    // Use View Transition API for smooth page transitions
    startViewTransition(() => {
      setCurrentPage(page)
    })

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  // Add view transition names to page content
  useEffect(() => {
    const pageContent = document.querySelector("[data-page-content]")
    if (pageContent) {
      pageContent.style.viewTransitionName = "page-content"
    }
  }, [currentPage])

  const renderPage = () => {
    switch (currentPage) {
      case "articles":
        return <Articles onNavigate={handleNavigate} />
      case "event":
        return <Events onNavigate={handleNavigate} />
      case "about":
        return (
          <div className="min-h-screen bg-white flex items-center justify-center" data-page-content>
            <h1 className="text-2xl text-gray-600">About Page - Coming Soon</h1>
          </div>
        )
      case "scan":
        return <Scan onNavigate={handleNavigate} />
      default:
        return (
          <div className="relative" data-page-content>
            <Navbar onNavigate={handleNavigate} />
            <Hero onNavigate={handleNavigate} />
          </div>
        )
    }
  }

  return (
    <div className="relative">
      <div data-page-content>{renderPage()}</div>
    </div>
  )
}

export default App
