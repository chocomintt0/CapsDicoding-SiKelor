"use client"

import { useState, useEffect, useRef } from "react"

export default function ArticlePreview({ onViewAllArticles }) {
  const [articles] = useState([
    {
      id: 1,
      image: "/placeholder.svg?height=200&width=350",
      title: "Tarian Tradisional Sulawesi Tengah",
      description: "Mengenal lebih dekat tarian-tarian tradisional dari Sulawesi Tengah yang penuh makna dan filosofi.",
      category: "Etnografi",
      publishedAt: "2025-05-10",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=200&width=350",
      title: "Sejarah Museum Sulawesi Tengah",
      description: "Perjalanan panjang pendirian museum dan koleksi bersejarah yang tersimpan di dalamnya.",
      category: "Sejarah",
      publishedAt: "2025-04-15",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=200&width=350",
      title: "Alat Musik Tradisional Kaili",
      description: "Mengenal berbagai alat musik tradisional suku Kaili yang masih dilestarikan hingga saat ini.",
      category: "Seni Tradisional",
      publishedAt: "2025-03-22",
    },
  ])

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`bg-white py-16 px-6 transition-all duration-700 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-800 text-3xl font-bold mb-4">Latest Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of articles about the rich cultural heritage of Central Sulawesi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => onViewAllArticles("article-detail", article.id)}
            >
              <div className="relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#475F45] text-white text-xs px-2 py-1 rounded-full">{article.category}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-gray-800 text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewAllArticles("article-detail", article.id)
                    }}
                    className="text-[#475F45] hover:text-[#3a4e39] text-sm font-medium"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onViewAllArticles("articles")}
            className="bg-[#475F45] hover:bg-[#3a4e39] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300"
          >
            View All Articles
          </button>
        </div>
      </div>
    </section>
  )
}
