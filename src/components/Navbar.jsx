"use client"

export default function Navbar({ onNavigate, currentPage = "home" }) {
  return (
    <nav className="fixed w-full z-10 flex items-center justify-between px-[40px] py-5 my-4 bg-transparent h-[80px]">
      <img src="src/assets/logo-home.png" alt="SIKELOR Logo" className="h-[105px] object-contain" />
      <ul className="flex space-x-8 font-semibold text-white gap-6">
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onNavigate("home")
            }}
            className="hover:text-gray-400"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onNavigate("event")
            }}
            className="hover:text-gray-400"
          >
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
            className="hover:text-gray-400"
          >
            Artikel
          </a>
        </li>
      </ul>
    </nav>
  )
}
