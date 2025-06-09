import express from "express"
import { readJsonFile } from "../utils/dataLoader.js"
import { successResponse, errorResponse, paginatedResponse } from "../utils/responseHelper.js"
import { validateQuery, validateParams, schemas } from "../middleware/validation.js"

const router = express.Router()

// Get all events with pagination and filtering
router.get(
  "/",
  validateQuery(
    schemas.pagination.keys({
      status: schemas.pagination.extract("status").optional(),
      location: schemas.pagination.extract("location").optional(),
      upcoming: schemas.pagination.extract("upcoming").optional(),
    }),
  ),
  async (req, res) => {
    try {
      const eventData = await readJsonFile("event_SIKELOR.json")
      let events = [...eventData.events]

      // Filter by status
      if (req.query.status) {
        events = events.filter((event) => event.details.status.toLowerCase().includes(req.query.status.toLowerCase()))
      }

      // Filter by location
      if (req.query.location) {
        events = events.filter((event) => event.location.toLowerCase().includes(req.query.location.toLowerCase()))
      }

      // Filter upcoming events
      if (req.query.upcoming === "true") {
        const today = new Date()
        events = events.filter((event) => {
          const eventDate = new Date(event.date)
          return eventDate >= today
        })
      }

      // Pagination
      const page = Number.parseInt(req.query.page) || 1
      const limit = Number.parseInt(req.query.limit) || 10
      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      // Sort events by date
      const sortOrder = req.query.sort || "asc"
      events.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA
      })

      const paginatedEvents = events.slice(startIndex, endIndex)

      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(events.length / limit),
        totalItems: events.length,
        itemsPerPage: limit,
        hasNextPage: endIndex < events.length,
        hasPrevPage: startIndex > 0,
      }

      paginatedResponse(res, paginatedEvents, pagination, "Events retrieved successfully")
    } catch (error) {
      errorResponse(res, "Failed to retrieve events", 500)
    }
  },
)

// Get event by ID
router.get("/:id", validateParams(schemas.id), async (req, res) => {
  try {
    const eventData = await readJsonFile("event_SIKELOR.json")
    const event = eventData.events.find((e) => e.id === req.params.id)

    if (!event) {
      return errorResponse(res, "Event not found", 404)
    }

    successResponse(res, event, "Event retrieved successfully")
  } catch (error) {
    errorResponse(res, "Failed to retrieve event", 500)
  }
})

// Get upcoming events
router.get("/filter/upcoming", async (req, res) => {
  try {
    const eventData = await readJsonFile("event_SIKELOR.json")
    const today = new Date()

    const upcomingEvents = eventData.events
      .filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate >= today
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    successResponse(res, upcomingEvents, "Upcoming events retrieved successfully")
  } catch (error) {
    errorResponse(res, "Failed to retrieve upcoming events", 500)
  }
})

// Get events by status
router.get("/status/:status", async (req, res) => {
  try {
    const eventData = await readJsonFile("event_SIKELOR.json")
    const statusEvents = eventData.events.filter(
      (event) => event.details.status.toLowerCase() === req.params.status.toLowerCase(),
    )

    if (statusEvents.length === 0) {
      return errorResponse(res, "No events found for this status", 404)
    }

    successResponse(res, statusEvents, `Events with status '${req.params.status}' retrieved successfully`)
  } catch (error) {
    errorResponse(res, "Failed to retrieve events by status", 500)
  }
})

export default router
