"use client"

import { useState } from "react"
import EventNavbar from "../components/EventNavbar"
import { Calendar, Clock, MapPin, Users } from "../components/icons"

export default function EventDetail({ onNavigate, eventId }) {
  // Mock event data - in real app, this would be fetched based on eventId
  const [event] = useState({
    id: 1,
    date: "15",
    month: "JUN",
    year: "2025",
    image: "/placeholder.svg?height=400&width=800",
    title: "Pameran Artefak Megalitik Lembah Bada",
    description:
      "Pameran khusus menampilkan koleksi artefak megalitik dari Lembah Bada yang penuh misteri dan sejarah peradaban kuno Sulawesi Tengah.",
    fullDescription: `Pameran Artefak Megalitik Lembah Bada merupakan pameran khusus yang menampilkan koleksi lengkap artefak megalitik dari Lembah Bada, salah satu situs arkeologi paling penting di Sulawesi Tengah. 

    Lembah Bada terkenal dengan patung-patung megalitik yang misterius, yang diperkirakan berasal dari abad ke-13 hingga ke-15 Masehi. Patung-patung ini, yang dikenal dengan nama "Arca Bada", memiliki bentuk yang unik dan masih menyimpan banyak misteri tentang peradaban yang membuatnya.

    Dalam pameran ini, pengunjung akan dapat melihat:
    - Replika patung megalitik dalam ukuran asli
    - Artefak tembikar dan perhiasan kuno
    - Dokumentasi proses penelitian arkeologi
    - Rekonstruksi kehidupan masyarakat kuno Lembah Bada
    - Film dokumenter tentang sejarah dan budaya Lembah Bada

    Pameran ini juga dilengkapi dengan teknologi AR (Augmented Reality) yang memungkinkan pengunjung untuk melihat rekonstruksi digital dari situs asli Lembah Bada.`,
    eventDate: "15 Juni 2025",
    eventTime: "09:00 - 17:00 WITA",
    location: "Ruang Pameran Utama, Lantai 2",
    capacity: "100 orang per sesi",
    price: "Gratis",
    organizer: "Museum Sulawesi Tengah",
    contact: "+62 451 421234",
    status: "upcoming",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    schedule: [
      { time: "09:00 - 10:00", activity: "Pembukaan dan Sambutan" },
      { time: "10:00 - 12:00", activity: "Tur Pameran Terpandu" },
      { time: "12:00 - 13:00", activity: "Istirahat" },
      { time: "13:00 - 15:00", activity: "Workshop Arkeologi" },
      { time: "15:00 - 17:00", activity: "Diskusi dan Tanya Jawab" },
    ],
  })

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <EventNavbar onNavigate={onNavigate} />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("event")}
            className="flex items-center gap-2 bg-transparent pl-0 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Events
          </button>

          {/* Event Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Date Card */}
              <div className="flex-shrink-0">
                <div className="bg-[#475F45] text-white p-4 rounded-lg text-center min-w-[100px]">
                  <div className="text-2xl font-bold">{event.date}</div>
                  <div className="text-sm">{event.month}</div>
                  <div className="text-xs opacity-80">{event.year}</div>
                </div>
              </div>

              {/* Event Info */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
                <p className="text-gray-600 mb-4">{event.description}</p>

                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{event.eventTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Image */}
          <div className="mb-8">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Tentang Event</h2>
                <div className="prose prose-gray max-w-none">
                  {event.fullDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Jadwal Acara</h2>
                <div className="space-y-3">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-[#475F45] font-semibold min-w-[120px]">{item.time}</div>
                      <div className="text-gray-700">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Detail Event</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Harga</div>
                    <div className="text-gray-800">{event.price}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Penyelenggara</div>
                    <div className="text-gray-800">{event.organizer}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Kontak</div>
                    <div className="text-gray-800">{event.contact}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Status</div>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === "upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : event.status === "ongoing"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
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

              {/* Register Button */}
              <button className="w-full bg-[#475F45] hover:bg-[#3a4e39] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Daftar Sekarang
              </button>

              {/* Share */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Bagikan Event</h3>
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 bg-blue-400 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition-colors">
                    Twitter
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#ffffff] text-black text-center py-4 mt-auto">
        <p className="text-xs lg:text-sm">© 2025 Sikelor. All rights reserved.</p>
      </footer>
    </div>
  )
}
