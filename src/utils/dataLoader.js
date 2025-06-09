import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const readJsonFile = async (fileName) => {
  try {
    const filePath = path.join(__dirname, "../../data", fileName)
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading file ${fileName}:`, error)
    throw new Error(`Failed to load ${fileName}`)
  }
}

export const writeJsonFile = async (fileName, data) => {
  try {
    const filePath = path.join(__dirname, "../../data", fileName)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error(`Error writing file ${fileName}:`, error)
    throw new Error(`Failed to write ${fileName}`)
  }
}
