import express from "express"
import { readJsonFile } from "../utils/dataLoader.js"
import { successResponse, errorResponse, paginatedResponse } from "../utils/responseHelper.js"
import { validateQuery, validateParams, schemas } from "../middleware/validation.js"

const router = express.Router()

// Get all collections with pagination and filtering
router.get(
  "/",
  validateQuery(
    schemas.pagination.keys({
      kategori: schemas.pagination.extract("kategori").optional(),
      kondisi: schemas.pagination.extract("kondisi").optional(),
      material: schemas.pagination.extract("material").optional(),
    }),
  ),
  async (req, res) => {
    try {
      const collections = await readJsonFile("koleksi_SIKELOR.json")
      let filteredCollections = [...collections]

      // Filter by category
      if (req.query.kategori) {
        filteredCollections = filteredCollections.filter((collection) =>
          collection.kategori.toLowerCase().includes(req.query.kategori.toLowerCase()),
        )
      }

      // Filter by condition
      if (req.query.kondisi) {
        filteredCollections = filteredCollections.filter((collection) =>
          collection.spesifikasi.kondisi.toLowerCase().includes(req.query.kondisi.toLowerCase()),
        )
      }

      // Filter by material
      if (req.query.material) {
        filteredCollections = filteredCollections.filter((collection) =>
          collection.spesifikasi.material.toLowerCase().includes(req.query.material.toLowerCase()),
        )
      }

      // Search functionality
      if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase()
        filteredCollections = filteredCollections.filter(
          (collection) =>
            collection.nama.toLowerCase().includes(searchTerm) ||
            collection.deskripsi.toLowerCase().includes(searchTerm) ||
            collection.kategori.toLowerCase().includes(searchTerm) ||
            collection.spesifikasi.asal.toLowerCase().includes(searchTerm),
        )
      }

      // Pagination
      const page = Number.parseInt(req.query.page) || 1
      const limit = Number.parseInt(req.query.limit) || 10
      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      // Sort collections
      const sortBy = req.query.sortBy || "nama"
      const sortOrder = req.query.sort || "asc"

      filteredCollections.sort((a, b) => {
        if (sortBy === "tahun_akuisisi") {
          return sortOrder === "asc"
            ? a.spesifikasi.tahun_akuisisi - b.spesifikasi.tahun_akuisisi
            : b.spesifikasi.tahun_akuisisi - a.spesifikasi.tahun_akuisisi
        }
        return sortOrder === "asc" ? a[sortBy]?.localeCompare(b[sortBy]) : b[sortBy]?.localeCompare(a[sortBy])
      })

      const paginatedCollections = filteredCollections.slice(startIndex, endIndex)

      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(filteredCollections.length / limit),
        totalItems: filteredCollections.length,
        itemsPerPage: limit,
        hasNextPage: endIndex < filteredCollections.length,
        hasPrevPage: startIndex > 0,
      }

      paginatedResponse(res, paginatedCollections, pagination, "Collections retrieved successfully")
    } catch (error) {
      errorResponse(res, "Failed to retrieve collections", 500)
    }
  },
)

// Get collection by ID
router.get("/:id", validateParams(schemas.id), async (req, res) => {
  try {
    const collections = await readJsonFile("koleksi_SIKELOR.json")
    const collection = collections.find((c) => c.id === req.params.id)

    if (!collection) {
      return errorResponse(res, "Collection not found", 404)
    }

    successResponse(res, collection, "Collection retrieved successfully")
  } catch (error) {
    errorResponse(res, "Failed to retrieve collection", 500)
  }
})

// Get collections by category
router.get("/category/:kategori", async (req, res) => {
  try {
    const collections = await readJsonFile("koleksi_SIKELOR.json")
    const categoryCollections = collections.filter(
      (collection) => collection.kategori.toLowerCase() === req.params.kategori.toLowerCase(),
    )

    if (categoryCollections.length === 0) {
      return errorResponse(res, "No collections found for this category", 404)
    }

    successResponse(res, categoryCollections, `Collections in category '${req.params.kategori}' retrieved successfully`)
  } catch (error) {
    errorResponse(res, "Failed to retrieve collections by category", 500)
  }
})

// Get all categories with statistics
router.get("/meta/categories", async (req, res) => {
  try {
    const collections = await readJsonFile("koleksi_SIKELOR.json")
    const categories = [...new Set(collections.map((collection) => collection.kategori))]

    const categoriesWithStats = categories.map((category) => {
      const categoryCollections = collections.filter((collection) => collection.kategori === category)
      return {
        name: category,
        count: categoryCollections.length,
        conditions: {
          "Sangat Baik": categoryCollections.filter((c) => c.spesifikasi.kondisi === "Sangat Baik").length,
          Baik: categoryCollections.filter((c) => c.spesifikasi.kondisi === "Baik").length,
          "Cukup Baik": categoryCollections.filter((c) => c.spesifikasi.kondisi === "Cukup Baik").length,
          Rusak: categoryCollections.filter((c) => c.spesifikasi.kondisi === "Fragmentasi/Rusak").length,
        },
      }
    })

    successResponse(res, categoriesWithStats, "Categories with statistics retrieved successfully")
  } catch (error) {
    errorResponse(res, "Failed to retrieve categories", 500)
  }
})

// Get collection statistics
router.get("/meta/statistics", async (req, res) => {
  try {
    const collections = await readJsonFile("koleksi_SIKELOR.json")

    const statistics = {
      total: collections.length,
      byCategory: {},
      byCondition: {},
      byMaterial: {},
      acquisitionYears: {
        earliest: Math.min(...collections.map((c) => c.spesifikasi.tahun_akuisisi)),
        latest: Math.max(...collections.map((c) => c.spesifikasi.tahun_akuisisi)),
      },
    }

    // Count by category
    collections.forEach((collection) => {
      statistics.byCategory[collection.kategori] = (statistics.byCategory[collection.kategori] || 0) + 1
    })

    // Count by condition
    collections.forEach((collection) => {
      const condition = collection.spesifikasi.kondisi
      statistics.byCondition[condition] = (statistics.byCondition[condition] || 0) + 1
    })

    // Count by material
    collections.forEach((collection) => {
      const material = collection.spesifikasi.material
      statistics.byMaterial[material] = (statistics.byMaterial[material] || 0) + 1
    })

    successResponse(res, statistics, "Collection statistics retrieved successfully")
  } catch (error) {
    errorResponse(res, "Failed to retrieve statistics", 500)
  }
})

export default router
