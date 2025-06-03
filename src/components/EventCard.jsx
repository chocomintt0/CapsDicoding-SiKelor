import { Calendar, Clock } from "../components/icons"

export default function EventCard({ date, month, image, title, description, eventDate, eventTime }) {
  return (
    <div className="flex items-center gap-8 py-8">
      {/* Date Section */}
      <div className="flex flex-col items-center text-center min-w-[80px]">
        <div className="text-4xl font-bold text-gray-800">{date}</div>
        <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">{month}</div>
      </div>

      <div className="flex-shrink-0">
        <img src={image || "/placeholder.svg"} alt={title} className="w-48 h-32 object-cover rounded-lg" />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

        <div className="mb-4">
          <h4 className="text-gray-400 font-medium mb-2">Event Detail</h4>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{eventDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{eventTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
