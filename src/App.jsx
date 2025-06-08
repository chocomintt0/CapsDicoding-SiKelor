"use client"

import { useState, useEffect } from "react"
import { startViewTransition } from "./utils/transitions"
import Navbar from "./components/Navbar"
import Articles from "./pages/Articles"
import Events from "./pages/Events"
import Scan from "./pages/Scan"
import Home from "./pages/Home"
import EventDetail from "./pages/EventDetail"
import ArticleDetail from "./pages/ArticleDetail"
import Collections from "./pages/Collections"
import About from "./pages/About"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [currentId, setCurrentId] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleNavigate = (page, id = null) => {
    if (isTransitioning || (page === currentPage && id === currentId)) return

    console.log("Navigating to:", page, id ? `with ID: ${id}` : "")
    setIsTransitioning(true)

    // Use View Transition API for smooth page transitions
    startViewTransition(() => {
      setCurrentPage(page)
      setCurrentId(id)
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
      case "article-detail":
        return <ArticleDetail onNavigate={handleNavigate} articleId={currentId} />
      case "event":
        return <Events onNavigate={handleNavigate} />
      case "event-detail":
        return <EventDetail onNavigate={handleNavigate} eventId={currentId} />
      case "collections":
        return <Collections onNavigate={handleNavigate} />
      case "about":
        return <About onNavigate={handleNavigate} />
      case "scan":
        return <Scan onNavigate={handleNavigate} />
      default:
        return (
          <div className="relative" data-page-content>
            <Navbar onNavigate={handleNavigate} />
            <Home onNavigate={handleNavigate} />
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
