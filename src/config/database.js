// Placeholder for future database configuration
// This can be extended when moving from JSON files to a proper database

export const dbConfig = {
  // MongoDB configuration
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/sikelor",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // PostgreSQL configuration
  postgresql: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "sikelor",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
  },
}
