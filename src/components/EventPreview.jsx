"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, Clock } from "./icons"

export default function EventPreview({ onViewAllEvents }) {
  const [events] = useState([
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
  ])

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, { threshold: 0.2 })

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-t from-[#263628] via-[#476649] to-[#5f8861] py-16 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Upcoming Events</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Join us for exciting events and exhibitions that showcase the rich cultural heritage of Central Sulawesi.
          </p>
        </div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`group relative overflow-hidden cursor-pointer rounded-xl border border-white/10 backdrop-blur-lg
              transition-all duration-700 ease-out transform
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => onViewAllEvents("event-detail", event.id)}
            >
              <div className="relative z-10 group-hover:scale-[1.015] group-hover:-translate-y-1 transition-all duration-300 ease-out rounded-xl">
                <div className="flex flex-col md:flex-row">
                  {/* Date Column */}
                  <div className="bg-white/10 text-white p-4 flex flex-row md:flex-col items-center justify-center md:w-24">
                    <div className="text-2xl md:text-3xl font-bold">{event.date}</div>
                    <div className="text-sm md:text-base ml-2 md:ml-0">{event.month}</div>
                  </div>

                  {/* Image Column */}
                  <div className="md:w-1/4">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      style={{ minHeight: "120px" }}
                    />
                  </div>

                  {/* Content Column */}
                  <div className="p-4 md:p-6 flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-white/80 mb-4 text-sm md:text-base">{event.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.eventDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.eventTime}</span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === "upcoming"
                            ? "bg-blue-500/20 text-blue-200"
                            : event.status === "ongoing"
                            ? "bg-green-500/20 text-green-200"
                            : "bg-gray-500/20 text-gray-200"
                        }`}
                      >
                        {event.status === "upcoming"
                          ? "Akan Datang"
                          : event.status === "ongoing"
                          ? "Sedang Berlangsung"
                          : "Selesai"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onViewAllEvents("event")}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 border border-white/20"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  )
}
