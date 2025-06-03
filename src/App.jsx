"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Articles from "./pages/Articles"
import Events from "./pages/Events"

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  const handleNavigate = (page) => {
    console.log("Navigating to:", page)
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "articles":
        return <Articles onNavigate={handleNavigate} />
      case "event":
        return <Events onNavigate={handleNavigate} />
      case "about":
        return (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <h1 className="text-2xl text-gray-600">About Page - Coming Soon</h1>
          </div>
        )
      default:
        return (
          <div className="relative">
            <Navbar onNavigate={handleNavigate} />
            <Hero />
          </div>
        )
    }
  }

  return <div className="relative">{renderPage()}</div>
}

export default App
