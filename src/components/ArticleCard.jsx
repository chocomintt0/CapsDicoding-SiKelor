"use client"

export default function ArticleCard({ image, title, description, articleId, onNavigate }) {
  const handleReadMore = () => {
    if (onNavigate && articleId) {
      onNavigate("article-detail", articleId)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 py-6 md:py-8">
      {/* Image Section */}
      <div className="flex-shrink-0 w-full md:w-auto">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full md:w-48 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleReadMore}
        />
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <h3
          className="text-lg md:text-xl font-semibold text-gray-800 mb-2 cursor-pointer hover:text-green-600 transition-colors"
          onClick={handleReadMore}
        >
          {title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">{description}</p>
        <button
          onClick={handleReadMore}
          className="bg-transparent text-black/60 hover:text-green-600 p-0 mt-5 transition-colors font-medium text-sm md:text-base"
        >
          Read More
        </button>
      </div>
    </div>
  )
}
