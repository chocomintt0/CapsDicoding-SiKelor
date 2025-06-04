"use client"

import { useState, useEffect } from "react"
import ArticleNavbar from "../components/ArticleNavbar"
import ArticleCard from "../components/ArticleCard"
import ArticleSearch from "../components/ArticleSearch"

export default function Articles({ onNavigate }) {
  const allArticles = [
    {
      id: 1,
      image: "/placeholder.svg?height=128&width=192",
      title: "Tarian Tradisional Sulawesi Tengah",
      description: "Mengenal lebih dekat tarian-tarian tradisional dari Sulawesi Tengah yang penuh makna dan filosofi.",
      category: "Etnografi",
      publishedAt: "2025-05-10",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=128&width=192",
      title: "Sejarah Museum Sulawesi Tengah",
      description: "Perjalanan panjang pendirian museum dan koleksi bersejarah yang tersimpan di dalamnya.",
      category: "Sejarah",
      publishedAt: "2025-04-15",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=128&width=192",
      title: "Alat Musik Tradisional Kaili",
      description: "Mengenal berbagai alat musik tradisional suku Kaili yang masih dilestarikan hingga saat ini.",
      category: "Seni Tradisional",
      publishedAt: "2025-03-22",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=128&width=192",
      title: "Kuliner Khas Sulawesi Tengah",
      description: "Menjelajahi kekayaan kuliner tradisional Sulawesi Tengah yang menggugah selera.",
      category: "Kuliner",
      publishedAt: "2025-02-05",
    },
    {
      id: 5,
      image: "/placeholder.svg?height=128&width=192",
      title: "Temuan Arkeologi di Lembah Bada",
      description:
        "Eksplorasi temuan patung megalitik dan artefak kuno di Lembah Bada yang menyimpan misteri peradaban.",
      category: "Arkeologi",
      publishedAt: "2025-01-18",
    },
    {
      id: 6,
      image: "/placeholder.svg?height=128&width=192",
      title: "Kain Tenun Donggala",
      description: "Keindahan dan filosofi di balik motif kain tenun tradisional Donggala yang menjadi warisan budaya.",
      category: "Tekstil",
      publishedAt: "2024-12-30",
    },
    {
      id: 7,
      image: "/placeholder.svg?height=128&width=192",
      title: "Keragaman Hayati Taman Nasional Lore Lindu",
      description: "Eksplorasi keanekaragaman flora dan fauna endemik yang terdapat di Taman Nasional Lore Lindu.",
      category: "Flora & Fauna",
      publishedAt: "2024-11-12",
    },
    {
      id: 8,
      image: "/placeholder.svg?height=128&width=192",
      title: "Mata Uang Kuno Sulawesi Tengah",
      description: "Koleksi mata uang kuno yang pernah beredar di wilayah Sulawesi Tengah dari berbagai era.",
      category: "Numismatik",
      publishedAt: "2024-10-25",
    },
  ]

  const categories = [
    "Etnografi",
    "Arkeologi",
    "Sejarah",
    "Seni Tradisional",
    "Tekstil",
    "Numismatik",
    "Flora & Fauna",
    "Geologi",
    "Kuliner",
    "Filologi",
  ]

  const [articles, setArticles] = useState(allArticles)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [activeCategories, setActiveCategories] = useState([])

  useEffect(() => {
    let filteredArticles = [...allArticles]
    if (searchTerm) {
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (activeCategories.length > 0) {
      filteredArticles = filteredArticles.filter((article) => activeCategories.includes(article.category))
    }

    switch (sortOption) {
      case "newest":
        filteredArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        break
      case "oldest":
        filteredArticles.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
        break
      case "a-z":
        filteredArticles.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "z-a":
        filteredArticles.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    setArticles(filteredArticles)
  }, [searchTerm, sortOption, activeCategories])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleSort = (option) => {
    setSortOption(option)
  }

  const handleCategoryChange = (categories) => {
    setActiveCategories(categories)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ArticleNavbar onNavigate={onNavigate} />

      {/* Main Content - Flex grow to push footer down */}
      <main className="flex-1">
        {/* Add padding-top to account for fixed navbar */}
        <div className="pt-20 md:pt-24">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {/* Header Section */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Articles</h1>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                Jelajahi artikel menarik tentang kekayaan budaya dan sejarah Sulawesi Tengah. Temukan cerita di balik
                artefak, tradisi, dan warisan budaya yang dipamerkan di museum kami.
              </p>
            </div>

            {/* Search and Filter Section */}
            <ArticleSearch
              onSearch={handleSearch}
              onSort={handleSort}
              onCategoryChange={handleCategoryChange}
              categories={categories}
            />

            {/* Articles List */}
            {articles.length > 0 ? (
              <div className="space-y-0">
                {articles.map((article, index) => (
                  <div key={article.id}>
                    <ArticleCard image={article.image} title={article.title} description={article.description} />
                    {index < articles.length - 1 && <hr className="border-gray-300" />}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-base md:text-lg">
                  Tidak ada artikel yang sesuai dengan kriteria pencarian Anda.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSortOption("newest")
                    setActiveCategories([])
                  }}
                  className="mt-4 text-green-600 hover:text-green-800 font-medium text-sm md:text-base"
                >
                  Reset filter
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#394a37] text-white text-center py-4 mt-auto">
        <p className="text-xs lg:text-sm">© 2025 Sikelor. All rights reserved.</p>
      </footer>
    </div>
  )
}
