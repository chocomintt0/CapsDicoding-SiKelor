"use client"

import { useState } from "react"
import CollectionDetailModal from "./CollectionDetailModal"

export default function Collection({ onNavigate }) {
  const [collections] = useState([
    {
      id: 1,
      title: "Keris Tradisional",
      subtitle: "Senjata pusaka bersejarah",
      image: "/placeholder.svg?height=200&width=250",
      description:
        "Koleksi keris tradisional dari berbagai daerah di Sulawesi Tengah dengan ukiran dan motif yang unik.",
    },
    {
      id: 2,
      title: "Topeng Kaili",
      subtitle: "Topeng ritual suku Kaili",
      image: "/placeholder.svg?height=200&width=250",
      description: "Topeng tradisional yang digunakan dalam upacara adat dan ritual keagamaan suku Kaili.",
    },
    {
      id: 3,
      title: "Kain Tenun Donggala",
      subtitle: "Tekstil tradisional bercorak",
      image: "/placeholder.svg?height=200&width=250",
      description: "Kain tenun dengan motif khas Donggala yang dibuat menggunakan teknik tradisional turun temurun.",
    },
    {
      id: 4,
      title: "Alat Musik Gong",
      subtitle: "Instrumen musik tradisional",
      image: "/placeholder.svg?height=200&width=250",
      description: "Gong perunggu yang digunakan dalam berbagai upacara adat dan pertunjukan musik tradisional.",
    },
    {
      id: 5,
      title: "Perhiasan Emas Antik",
      subtitle: "Ornamen tradisional emas",
      image: "/placeholder.svg?height=200&width=250",
      description:
        "Koleksi perhiasan emas antik dengan desain dan teknik pembuatan yang mencerminkan kemahiran pengrajin masa lalu.",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)

  const handleLearnMore = (item) => {
    setSelectedCollectionId(item.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCollectionId(null)
  }

  const handleViewAllCollections = () => {
    if (onNavigate) {
      onNavigate("collections")
    }
  }

  return (
    <>
      <section className="w-full py-16 md:py-24 bg-[#475F45]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block">
              <div className="h-0.5 bg-white/30 w-20 md:w-32 mx-auto mb-4"></div>
              <h3 className="text-white/80 text-sm md:text-base font-medium mb-2 tracking-wider uppercase">
                Our Collection
              </h3>
              <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                A Visual Journey Through
                <br />
                Central Sulawesi's Culture
              </h2>
              <div className="h-0.5 bg-white/30 w-20 md:w-32 mx-auto mt-4"></div>
            </div>
          </div>

          {/* Collection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* First row - 2 items */}
            <div className="lg:col-span-1">
              <CollectionCard item={collections[0]} onLearnMore={handleLearnMore} />
            </div>
            <div className="lg:col-span-1 lg:col-start-3">
              <CollectionCard item={collections[1]} onLearnMore={handleLearnMore} />
            </div>

            {/* Second row - 3 items */}
            {collections.slice(2, 5).map((item) => (
              <div key={item.id} className="lg:col-span-1">
                <CollectionCard item={item} onLearnMore={handleLearnMore} />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button
              onClick={handleViewAllCollections}
              className="bg-white/20 hover:bg-white/30 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
            >
              View All Collections
            </button>
          </div>
        </div>
      </section>

      {/* Collection Detail Modal */}
      <CollectionDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        collectionId={selectedCollectionId}
        onNavigate={onNavigate}
      />
    </>
  )
}

function CollectionCard({ item, onLearnMore }) {
  return (
    <div className="group cursor-pointer" onClick={() => onLearnMore(item)}>
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40">
        {/* Image */}
        <div className="aspect-[4/3] mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-800">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="text-white">
          <h4 className="font-bold text-lg md:text-xl mb-1">{item.title}</h4>
          <p className="text-white/70 text-sm md:text-base mb-4">{item.subtitle}</p>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onLearnMore(item)
            }}
            className="text-white/80 hover:text-white text-sm md:text-base font-medium underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
