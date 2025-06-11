// Base URL untuk FastAPI ML API
const ML_API_BASE_URL = "http://localhost:8000"

// Service untuk berkomunikasi dengan FastAPI ML API
export class MLApiService {
  // Test koneksi ke ML API
  static async testConnection() {
    try {
      const response = await fetch(`${ML_API_BASE_URL}/health`)
      if (response.ok) {
        const data = await response.json()
        console.log("✅ ML API Connection successful:", data)
        return true
      }
      return false
    } catch (error) {
      console.error("❌ ML API connection failed:", error)
      return false
    }
  }

  // Klasifikasi gambar (untuk upload dan foto)
  static async classifyImage(imageFile) {
    try {
      console.log("🔄 Starting image classification...")

      const formData = new FormData()
      formData.append("file", imageFile)

      const response = await fetch(`${ML_API_BASE_URL}/classify`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log("✅ Classification result:", result)
      return result
    } catch (error) {
      console.error("❌ Classification error:", error)
      throw new Error(`Gagal melakukan klasifikasi: ${error.message}`)
    }
  }

  // Deteksi objek (untuk live camera)
  static async detectObjects(imageFile) {
    try {
      console.log("🔄 Starting object detection...", {
        fileName: imageFile.name,
        fileSize: imageFile.size,
        fileType: imageFile.type,
      })

      const formData = new FormData()
      formData.append("file", imageFile)

      const response = await fetch(`${ML_API_BASE_URL}/detect`, {
        method: "POST",
        body: formData,
        // Tambahkan timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Detection API error:", response.status, errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log("✅ Detection result:", {
        success: result.success,
        objectCount: result.objects?.length || 0,
        metadata: result.metadata,
      })

      // Pastikan format response konsisten
      return {
        success: result.success || true,
        objects: result.objects || [],
        count: result.count || result.objects?.length || 0,
        metadata: result.metadata || {},
      }
    } catch (error) {
      console.error("❌ Detection error:", error)

      // Handle different types of errors
      if (error.name === "AbortError") {
        throw new Error("Request timeout - server terlalu lama merespons")
      } else if (error.message.includes("Failed to fetch")) {
        throw new Error("Tidak dapat terhubung ke ML API server. Pastikan server berjalan di http://localhost:8000")
      } else {
        throw new Error(`Gagal melakukan deteksi objek: ${error.message}`)
      }
    }
  }

  // Helper: Convert data URL to File object
  static dataURLtoFile(dataurl, filename) {
    try {
      const arr = dataurl.split(",")
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, { type: mime })
    } catch (error) {
      console.error("❌ Error converting data URL to file:", error)
      throw new Error("Gagal mengkonversi gambar")
    }
  }

  // Helper: Convert canvas to File object
  static async canvasToFile(canvas, filename = "capture.jpg") {
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], filename, { type: "image/jpeg" })
              resolve(file)
            } else {
              reject(new Error("Gagal mengkonversi canvas ke file"))
            }
          },
          "image/jpeg",
          0.8,
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  // Helper: Convert image element to File object
  static async imageElementToFile(imgElement, filename = "image.jpg") {
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      canvas.width = imgElement.naturalWidth
      canvas.height = imgElement.naturalHeight

      ctx.drawImage(imgElement, 0, 0)

      return await this.canvasToFile(canvas, filename)
    } catch (error) {
      console.error("❌ Error converting image element to file:", error)
      throw new Error("Gagal mengkonversi gambar")
    }
  }
}

// Export default untuk backward compatibility
export default MLApiService
