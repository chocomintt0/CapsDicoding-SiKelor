"use client"

import { useState, useEffect } from "react"

export default function EventNavbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-8 py-6 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <div className="flex items-center">
        <img src="/src/assets/logo-away.png" alt="SIKELOR Logo" className="h-12 object-contain" />
      </div>
      <ul className="flex space-x-8 font-medium text-gray-700">
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onNavigate("home")
            }}
            className="hover:text-[#475F45] transition-colors"
          >
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-[#475F45] font-semibold">
            Event
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onNavigate("articles")
            }}
            className="hover:text-[#475F45] transition-colors"
          >
            Artikel
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-[#475F45] transition-colors">
            About
          </a>
        </li>
      </ul>
    </nav>
  )
}
