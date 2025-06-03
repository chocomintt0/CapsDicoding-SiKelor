"use client"

import { useState, useEffect } from "react"
import EventNavbar from "../components/EventNavbar"
import EventCard from "../components/EventCard"
import EventSearch from "../components/EventSearch"

export default function Events({ onNavigate }) {
  const allEvents = [
    {
      id: 1,
      date: "15",
      month: "JUN",
      image: "/placeholder.svg?height=128&width=192",
      title: "Pameran Artefak Megalitik Lembah Bada",
      description: "Pameran khusus menampilkan koleksi artefak megalitik dari Lembah Bada yang penuh misteri.",
      eventDate: "JUN 15, 2025",
      eventTime: "09:00 WITA",
      fullDate: "2025-06-15",
      status: "upcoming",
    },
    {
      id: 2,
      date: "10",
      month: "MAY",
      image: "/placeholder.svg?height=128&width=192",
      title: "Workshop Tenun Tradisional Donggala",
      description: "Belajar teknik tenun tradisional Donggala langsung dari pengrajin berpengalaman.",
      eventDate: "MAY 10, 2025",
      eventTime: "14:00 WITA",
      fullDate: "2025-05-10",
      status: "ongoing",
    },
    {
      id: 3,
      date: "25",
      month: "APR",
      image: "/placeholder.svg?height=128&width=192",
      title: "Seminar Sejarah Kerajaan Kaili",
      description: "Diskusi mendalam tentang sejarah dan peradaban Kerajaan Kaili di Sulawesi Tengah.",
      eventDate: "APR 25, 2025",
      eventTime: "10:00 WITA",
      fullDate: "2025-04-25",
      status: "completed",
    },
    {
      id: 4,
      date: "20",
      month: "JUL",
      image: "/placeholder.svg?height=128&width=192",
      title: "Tur Museum Malam Hari",
      description: "Pengalaman unik menjelajahi museum di malam hari dengan pencahayaan khusus.",
      eventDate: "JUL 20, 2025",
      eventTime: "19:00 WITA",
      fullDate: "2025-07-20",
      status: "upcoming",
    },
    {
      id: 5,
      date: "05",
      month: "AUG",
      image: "/placeholder.svg?height=128&width=192",
      title: "Festival Musik Tradisional Sulawesi Tengah",
      description: "Pertunjukan musik tradisional dari berbagai suku di Sulawesi Tengah.",
      eventDate: "AUG 05, 2025",
      eventTime: "16:00 WITA",
      fullDate: "2025-08-05",
      status: "upcoming",
    },
    {
      id: 6,
      date: "12",
      month: "MAR",
      image: "/placeholder.svg?height=128&width=192",
      title: "Peluncuran Koleksi Numismatik Baru",
      description: "Perkenalan koleksi mata uang kuno terbaru dari berbagai era di Sulawesi Tengah.",
      eventDate: "MAR 12, 2025",
      eventTime: "11:00 WITA",
      fullDate: "2025-03-12",
      status: "completed",
    },
  ]

  const [events, setEvents] = useState(allEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("date-asc")
  const [activeStatuses, setActiveStatuses] = useState([])

  useEffect(() => {
    let filteredEvents = [...allEvents]

    if (searchTerm) {
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (activeStatuses.length > 0) {
      filteredEvents = filteredEvents.filter((event) => activeStatuses.includes(event.status))
    }

    switch (sortOption) {
      case "date-asc":
        filteredEvents.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate))
        break
      case "date-desc":
        filteredEvents.sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate))
        break
      case "a-z":
        filteredEvents.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "z-a":
        filteredEvents.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "status":
        const statusOrder = { upcoming: 1, ongoing: 2, completed: 3 }
        filteredEvents.sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
        break
      default:
        break
    }

    setEvents(filteredEvents)
  }, [searchTerm, sortOption, activeStatuses])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleSort = (option) => {
    setSortOption(option)
  }

  const handleStatusChange = (statuses) => {
    setActiveStatuses(statuses)
  }

  return (
    <div className="min-h-screen bg-white">
      <EventNavbar onNavigate={onNavigate} />

      {/* Add padding top to account for fixed navbar */}
      <div className="pt-24 max-w-4xl mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Temukan berbagai acara menarik yang diselenggarakan di museum. Bergabunglah dengan pameran, workshop,
            seminar, dan acara budaya yang selalu memberikan pengalaman baru untuk dijelajahi!
          </p>
        </div>

        {/* Search and Filter Section */}
        <EventSearch onSearch={handleSearch} onSort={handleSort} onStatusChange={handleStatusChange} />

        {/* Events List */}
        {events.length > 0 ? (
          <div className="space-y-0">
            {events.map((event, index) => (
              <div key={event.id}>
                <EventCard
                  date={event.date}
                  month={event.month}
                  image={event.image}
                  title={event.title}
                  description={event.description}
                  eventDate={event.eventDate}
                  eventTime={event.eventTime}
                />
                {index < events.length - 1 && <hr className="border-gray-300" />}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada event yang sesuai dengan kriteria pencarian Anda.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSortOption("date-asc")
                setActiveStatuses([])
              }}
              className="mt-4 text-[#475F45] hover:text-[#3a4f38] font-medium"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
