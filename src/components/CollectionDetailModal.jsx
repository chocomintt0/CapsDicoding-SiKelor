"use client"

import { useState } from "react"
import { X } from "./icons"

export default function CollectionDetailModal({ isOpen, onClose, collectionId, onNavigate }) {
  // Mock collection data - in real app, this would be fetched based on collectionId
  const getCollectionData = (id) => {
    const collections = {
      1: {
        id: 1,
        title: "Keris Tradisional",
        category: "Senjata Tradisional",
        period: "Abad 15-17 M",
        origin: "Kerajaan Kaili",
        material: "Besi, Kayu, Emas",
        dimensions: "P: 45 cm | L: 3 cm",
        condition: "Baik",
        acquisitionDate: "1985",
        image: "/src/assets/bg-hero.png",
        description:
          "Keris tradisional yang berasal dari Kerajaan Kaili, Sulawesi Tengah. Keris ini memiliki nilai sejarah yang tinggi dan merupakan salah satu koleksi unggulan museum dengan ukiran dan motif yang unik.",
        significance:
          "Keris ini merupakan simbol kekuasaan dan spiritual dalam budaya Kaili. Digunakan dalam upacara adat dan sebagai pusaka keluarga yang diwariskan turun-temurun.",
      },
      2: {
        id: 2,
        title: "Topeng Kaili",
        category: "Seni Tradisional",
        period: "Abad 16-18 M",
        origin: "Suku Kaili",
        material: "Kayu, Cat Alami",
        dimensions: "T: 25 cm | L: 20 cm",
        condition: "Baik",
        acquisitionDate: "1987",
        image: "/src/assets/bg-hero.png",
        description:
          "Topeng tradisional yang digunakan dalam upacara adat dan ritual keagamaan suku Kaili. Topeng ini memiliki makna spiritual yang mendalam.",
        significance:
          "Digunakan dalam tarian ritual untuk berkomunikasi dengan roh leluhur dan dalam upacara penyembuhan tradisional.",
      },
      3: {
        id: 3,
        title: "Kain Tenun Donggala",
        category: "Tekstil",
        period: "Abad 17-19 M",
        origin: "Donggala",
        material: "Benang Kapas, Pewarna Alam",
        dimensions: "P: 200 cm | L: 100 cm",
        condition: "Baik",
        acquisitionDate: "1990",
        image: "/src/assets/bg-hero.png",
        description:
          "Kain tenun dengan motif khas Donggala yang dibuat menggunakan teknik tradisional turun temurun dengan pewarna alami.",
        significance:
          "Motif pada kain ini melambangkan kehidupan masyarakat pesisir dan hubungan harmonis dengan alam.",
      },
      4: {
        id: 4,
        title: "Alat Musik Gong",
        category: "Instrumen Musik",
        period: "Abad 14-16 M",
        origin: "Sulawesi Tengah",
        material: "Perunggu",
        dimensions: "r: 30 cm | T: 5 cm",
        condition: "Baik",
        acquisitionDate: "1988",
        image: "/src/assets/bg-hero.png",
        description:
          "Gong perunggu yang digunakan dalam berbagai upacara adat dan pertunjukan musik tradisional dengan suara yang khas.",
        significance:
          "Gong ini digunakan untuk memanggil roh dalam upacara adat dan sebagai penanda waktu dalam ritual keagamaan.",
      },
      5: {
        id: 5,
        title: "Perhiasan Emas Antik",
        category: "Perhiasan",
        period: "Abad 13-15 M",
        origin: "Sulawesi Tengah",
        material: "Emas, Batu Mulia",
        dimensions: "Bervariasi",
        condition: "Baik",
        acquisitionDate: "1992",
        image: "/src/assets/bg-hero.png",
        description:
          "Koleksi perhiasan emas antik dengan desain dan teknik pembuatan yang mencerminkan kemahiran pengrajin masa lalu.",
        significance:
          "Perhiasan ini menunjukkan status sosial dan digunakan dalam upacara pernikahan serta ritual penting lainnya.",
      },
      6: {
        id: 6,
        title: "Fosil Purba",
        category: "Geologi",
        period: "Era Mesozoikum",
        origin: "Sulawesi Tengah",
        material: "Batu Fosil",
        dimensions: "Bervariasi",
        condition: "Baik",
        acquisitionDate: "1995",
        image: "/src/assets/bg-hero.png",
        description:
          "Temuan fosil dari era prasejarah yang memberikan wawasan tentang kehidupan masa lampau di Sulawesi Tengah.",
        significance:
          "Fosil ini memberikan bukti ilmiah tentang evolusi kehidupan dan perubahan geologis di wilayah Sulawesi Tengah.",
      },
    }
    return collections[id] || collections[1]
  }

  const [collection] = useState(getCollectionData(collectionId))

  const handleScanWithAR = () => {
    if (onNavigate) {
      onClose() // Close the modal first
      onNavigate("scan") // Navigate to scan page
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Detail Koleksi</h2>
          <button onClick={onClose} className="bg-transparent text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6">
            <img
              src={collection.image || "/placeholder.svg"}
              alt={collection.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Title and Category */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#475F45] text-white text-xs px-2 py-1 rounded-full">{collection.category}</span>
              <span className="text-sm text-gray-500">{collection.period}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{collection.title}</h3>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed">{collection.description}</p>
          </div>

          {/* Specifications */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Spesifikasi</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-between">
                <span className="text-gray-800">Asal:</span>
                <span className="text-gray-600 font-medium">{collection.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Material:</span>
                <span className="text-gray-600 font-medium">{collection.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Dimensi:</span>
                <span className="text-gray-600 font-medium">{collection.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Kondisi:</span>
                <span className="text-gray-600 font-medium">{collection.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-800">Tahun Akuisisi:</span>
                <span className="text-gray-600 font-medium">{collection.acquisitionDate}</span>
              </div>
            </div>
          </div>

          {/* Significance */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Makna dan Signifikansi</h4>
            <p className="text-gray-600 leading-relaxed">{collection.significance}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleScanWithAR}
              className="flex-1 bg- hover:bg-[#3a4e39] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Scan dengan AR
            </button>
            <button className="flex-1 border border-[#475F45] text-white hover:bg-[#475F45] hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Download Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}