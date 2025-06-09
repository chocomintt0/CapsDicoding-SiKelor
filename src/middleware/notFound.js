export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} tidak ditemukan`,
    availableEndpoints: ["/api/v1/articles", "/api/v1/events", "/api/v1/collections", "/api/v1/search"],
  })
}
