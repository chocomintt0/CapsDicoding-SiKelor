import Joi from "joi"

export const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query)
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid query parameters",
        details: error.details.map((detail) => detail.message),
      })
    }
    next()
  }
}

export const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params)
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid parameters",
        details: error.details.map((detail) => detail.message),
      })
    }
    next()
  }
}

// Common validation schemas
export const schemas = {
  id: Joi.object({
    id: Joi.string().required(),
  }),

  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid("asc", "desc").default("desc"),
    sortBy: Joi.string().default("date"),
  }),

  search: Joi.object({
    q: Joi.string().min(1).required(),
    category: Joi.string(),
    type: Joi.string().valid("articles", "events", "collections", "all").default("all"),
  }),
}
