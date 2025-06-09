import express from "express"
import { readJsonFile } from "../utils/dataLoader.js"
import { successResponse, errorResponse } from "../utils/responseHelper.js"
import { validateQuery, schemas } from "../middleware/validation.js"

const router = express.Router()

// Global search across all data types
router.get("/", validateQuery(schemas.search), async (req, res) => {
  try {
    const { q: searchTerm, category, type } = req.query
    const results = {
      articles: [],
      events: [],
      collections: [],
      total: 0,
    }

    // Search in articles
    if (type === "all" || type === "articles") {
      const articles = await readJsonFile("article_SIKELOR.json")
      results.articles = articles.filter((article) => {
        const matchesSearch =
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.kategori.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = !category || article.kategori.toLowerCase().includes(category.toLowerCase())

        return matchesSearch && matchesCategory
      })
    }

    // Search in events
    if (type === "all" || type === "events") {
      const eventData = await readJsonFile("event_SIKELOR.json")
      results.events = eventData.events.filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.short_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.details.organizer.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesSearch
      })
    }

    // Search in collections
    if (type === "all" || type === "collections") {
      const collections = await readJsonFile("koleksi_SIKELOR.json")
      results.collections = collections.filter((collection) => {
        const matchesSearch =
          collection.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.spesifikasi.asal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.spesifikasi.material.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = !category || collection.kategori.toLowerCase().includes(category.toLowerCase())

        return matchesSearch && matchesCategory
      })
    }

    // Calculate total results
    results.total = results.articles.length + results.events.length + results.collections.length

    // Add search metadata
    const searchMetadata = {
      query: searchTerm,
      category: category || "all",
      type: type,
      resultsCount: {
        articles: results.articles.length,
        events: results.events.length,
        collections: results.collections.length,
        total: results.total,
      },
    }

    if (results.total === 0) {
      return errorResponse(res, "No results found for your search query", 404)
    }

    successResponse(res, { ...results, metadata: searchMetadata }, "Search completed successfully")
  } catch (error) {
    errorResponse(res, "Search failed", 500)
  }
})

// Search suggestions/autocomplete
router.get("/suggestions", async (req, res) => {
  try {
    const { q: searchTerm } = req.query

    if (!searchTerm || searchTerm.length < 2) {
      return errorResponse(res, "Search term must be at least 2 characters", 400)
    }

    const suggestions = new Set()

    // Get suggestions from articles
    const articles = await readJsonFile("article_SIKELOR.json")
    articles.forEach((article) => {
      if (article.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(article.title)
      }
      if (article.kategori.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(article.kategori)
      }
    })

    // Get suggestions from events
    const eventData = await readJsonFile("event_SIKELOR.json")
    eventData.events.forEach((event) => {
      if (event.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(event.title)
      }
      if (event.location.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(event.location)
      }
    })

    // Get suggestions from collections
    const collections = await readJsonFile("koleksi_SIKELOR.json")
    collections.forEach((collection) => {
      if (collection.nama.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(collection.nama)
      }
      if (collection.kategori.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(collection.kategori)
      }
    })

    const suggestionArray = Array.from(suggestions).slice(0, 10) // Limit to 10 suggestions

    successResponse(res, suggestionArray, "Search suggestions retrieved successfully")
  } catch (error) {
    errorResponse(res, "Failed to get search suggestions", 500)
  }
})

export default router
