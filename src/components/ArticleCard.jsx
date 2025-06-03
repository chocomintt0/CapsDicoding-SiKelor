export default function ArticleCard({ image, title, description }) {
  return (
    <div className="flex items-center gap-8 py-8">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img src={image || "/placeholder.svg"} alt={title} className="w-48 h-32 object-cover rounded-lg" />
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        <button className="text-gray-400 hover:text-green-600 transition-colors font-medium">Read More</button>
      </div>
    </div>
  )
}
