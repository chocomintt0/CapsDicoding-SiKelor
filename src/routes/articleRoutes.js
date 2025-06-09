import express from "express"
import { readJsonFile } from "../utils/dataLoader.js"
import { successResponse, errorResponse, paginatedResponse } from "../utils/responseHelper.js"
import { validateQuery, validateParams, schemas } from "../middleware/validation.js"

const router = express.Router()

// Get all articles with pagination and filtering
router.get(
  "/",
  validateQuery(
    schemas.pagination.keys({
      kategori: schemas.pagination.extract("kategori").optional(),
      search: schemas.pagination.extract("search").optional(),
    }),
  ),
  async (req, res) => {
    try {
      const articles = await readJsonFile("article_SIKELOR.json")
      let filteredArticles = [...articles]

      // Filter by category
      if (req.query.kategori) {
        filteredArticles = filteredArticles.filter((article) =>
          article.kategori.toLowerCase().includes(req.query.kategori.toLowerCase()),
        )
      }

      // Search functionality
      if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase()
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchTerm) ||
            article.deskripsi.toLowerCase().includes(searchTerm) ||
            article.kategori.toLowerCase().includes(searchTerm),
        )
      }

      // Pagination
      const page = Number.parseInt(req.query.page) || 1
      const limit = Number.parseInt(req.query.limit) || 10
      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      // Sort articles
      const sortBy = req.query.sortBy || "date"
      const sortOrder = req.query.sort || "desc"

      filteredArticles.sort((a, b) => {
        if (sortBy === "date") {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA
        }
        return sortOrder === "asc" ? a[sortBy]?.localeCompare(b[sortBy]) : b[sortBy]?.localeCompare(a[sortBy])
      })

      const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(filteredArticles.length / limit),
        totalItems: filteredArticles.length,
        itemsPerPage: limit,
        hasNextPage: endIndex < filteredArticles.length,
        hasPrevPage: startIndex > 0,
      }

      paginatedResponse(res, paginatedArticles, pagination, "Articles retrieved successfully")
    } catch (error) {
      errorResponse(res, "Failed to retrieve articles", 500)
    }
  },
)

// Get article by ID
router.get("/:id", validateParams(schemas.id), async (req, res) => {
  try {
    const articles = await readJsonFile("article_SIKELOR.json")
    const article = articles.find((a) => a.id.toString() === req.params.id)

    if (!article) {
      return errorResponse(res, "Article not found", 404)
    }

    successResponse(res, article, "Article retrieved successfully")
  } catch (error) {
    errorResponse(res, "Failed to retrieve article", 500)
  }
})

// Get articles by category
router.get("/category/:kategori", async (req, res) => {
  try {
    const articles = await readJsonFile("article_SIKELOR.json")
    const categoryArticles = articles.filter(
      (article) => article.kategori.toLowerCase() === req.params.kategori.toLowerCase(),
    )

    if (categoryArticles.length === 0) {
      return errorResponse(res, "No articles found for this category", 404)
    }

    successResponse(res, categoryArticles, `Articles in category '${req.params.kategori}' retrieved successfully`)
  } catch (error) {
    errorResponse(res, "Failed to retrieve articles by category", 500)
  }
})

// Get all categories
router.get("/meta/categories", async (req, res) => {
  try {
    const articles = await readJsonFile("article_SIKELOR.json")
    const categories = [...new Set(articles.map((article) => article.kategori))]

    const categoriesWithCount = categories.map((category) => ({
      name: category,
      count: articles.filter((article) => article.kategori === category).length,
    }))

    successResponse(res, categoriesWithCount, "Categories retrieved successfully")
  } catch (error) {
    errorResponse(res, "Failed to retrieve categories", 500)
  }
})

export default router
