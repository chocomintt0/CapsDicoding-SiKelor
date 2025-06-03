"use client"

import { useState, useRef, useEffect } from "react"
import { startViewTransition } from "../utils/transitions"
import ScanNavbar from "../components/ScanNavbar"
import { Cube, Camera, Upload, Image, X, Target, CameraFlash, VideoCamera } from "../components/icons"

export default function Scan({ onNavigate }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [scanMode, setScanMode] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isDirectScanActive, setIsDirectScanActive] = useState(false)
  const [stream, setStream] = useState(null)
  const [detectedObjects, setDetectedObjects] = useState([])
  const [cameraError, setCameraError] = useState(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isDirectVideoReady, setIsDirectVideoReady] = useState(false)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const directScanVideoRef = useRef(null)
  const canvasRef = useRef(null)
  const directScanStreamRef = useRef(null)

  const handleDirectScan = async () => {
    setCameraError(null)
    setIsDirectVideoReady(false)
    startViewTransition(() => {
      setScanMode("direct")
      setIsDirectScanActive(true)
    })

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
      })

      directScanStreamRef.current = mediaStream

      if (directScanVideoRef.current) {
        directScanVideoRef.current.srcObject = mediaStream

        directScanVideoRef.current.onloadedmetadata = () => {
          console.log("Direct scan video metadata loaded")
          setIsDirectVideoReady(true)
        }

        directScanVideoRef.current.oncanplay = () => {
          console.log("Direct scan video can play")
          directScanVideoRef.current.play().catch(console.error)
        }

        setTimeout(() => {
          if (directScanVideoRef.current) {
            directScanVideoRef.current.play().catch(console.error)
          }
        }, 100)
      }

      startMockDetection()
    } catch (error) {
      console.error("Error accessing camera for direct scan:", error)
      setCameraError("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.")
      startViewTransition(() => {
        setIsDirectScanActive(false)
        setScanMode(null)
      })
    }
  }

  const stopDirectScan = () => {
    startViewTransition(() => {
      if (directScanStreamRef.current) {
        directScanStreamRef.current.getTracks().forEach((track) => track.stop())
        directScanStreamRef.current = null
      }
      setIsDirectScanActive(false)
      setScanMode(null)
      setDetectedObjects([])
      setCameraError(null)
      setIsDirectVideoReady(false)
    })
  }

  const startMockDetection = () => {
    const mockDetections = [
      { id: 1, name: "Keris Tradisional", confidence: 0.89, x: 150, y: 100, width: 200, height: 150 },
      { id: 2, name: "Topeng Kaili", confidence: 0.76, x: 400, y: 200, width: 180, height: 160 },
    ]

    setTimeout(() => {
      setDetectedObjects(mockDetections)
    }, 2000)

    const detectionInterval = setInterval(() => {
      if (!isDirectScanActive) {
        clearInterval(detectionInterval)
        return
      }

      const updatedDetections = mockDetections.map((obj) => ({
        ...obj,
        x: obj.x + (Math.random() - 0.5) * 20,
        y: obj.y + (Math.random() - 0.5) * 20,
        confidence: Math.max(0.5, Math.min(0.95, obj.confidence + (Math.random() - 0.5) * 0.1)),
      }))

      setDetectedObjects(updatedDetections)
    }, 1000)
  }

  const handleTakePicture = async () => {
    setCameraError(null)
    setIsVideoReady(false)
    startViewTransition(() => {
      setScanMode("camera")
      setIsCameraOpen(true)
    })

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
      })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream

        videoRef.current.onloadedmetadata = () => {
          console.log("Camera video metadata loaded")
          setIsVideoReady(true)
        }

        videoRef.current.oncanplay = () => {
          console.log("Camera video can play")
          videoRef.current.play().catch(console.error)
        }

        // Force play for mobile
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch(console.error)
          }
        }, 100)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setCameraError("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.")
      startViewTransition(() => {
        setIsCameraOpen(false)
      })
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8)

      startViewTransition(() => {
        setSelectedImage(imageDataUrl)
        closeCamera()
      })
    }
  }

  const closeCamera = () => {
    startViewTransition(() => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
      }
      setIsCameraOpen(false)
      setCameraError(null)
      setIsVideoReady(false)
    })
  }

  const handleUploadImage = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        startViewTransition(() => {
          setSelectedImage(e.target?.result)
          setScanMode("upload")
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = () => {
    if (selectedImage) {
      startViewTransition(() => {
        setIsScanning(true)
      })

      setTimeout(() => {
        startViewTransition(() => {
          setIsScanning(false)
        })
        alert("Analisis gambar selesai! Hasil akan ditampilkan di sini.")
      }, 3000)
    }
  }

  useEffect(() => {
    const cameraArea = document.querySelector("[data-camera-area]")
    if (cameraArea) {
      cameraArea.style.viewTransitionName = isCameraOpen || isDirectScanActive ? "camera-modal" : ""
    }
  }, [isCameraOpen, isDirectScanActive])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (directScanStreamRef.current) {
        directScanStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const renderCameraContent = () => {
    if (isDirectScanActive) {
      return (
        <div className="w-full h-full relative">
          {/* Loading state for direct scan */}
          {!isDirectVideoReady && (
            <div className="absolute inset-0 bg-[#475F45] flex items-center justify-center z-10">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-sm md:text-lg font-semibold">Memuat kamera...</p>
              </div>
            </div>
          )}

          <video
            ref={directScanVideoRef}
            autoPlay
            playsInline
            muted
            webkit-playsinline="true"
            className={`w-full h-full object-cover ${!isDirectVideoReady ? "opacity-0" : "opacity-100"}`}
            style={{
              transform: "scaleX(-1)",
            }}
          />

          {/* Detection Overlay - only show when video is ready */}
          {isDirectVideoReady && (
            <div className="absolute inset-0 pointer-events-none">
              {detectedObjects.map((obj) => (
                <div
                  key={obj.id}
                  className="absolute border-2 border-green-400 bg-green-400 bg-opacity-20 rounded"
                  style={{
                    left: `${(obj.x / 1280) * 100}%`,
                    top: `${(obj.y / 720) * 100}%`,
                    width: `${(obj.width / 1280) * 100}%`,
                    height: `${(obj.height / 720) * 100}%`,
                  }}
                >
                  <div className="absolute -top-6 left-0 bg-green-400 text-white px-1 py-1 rounded text-xs font-semibold whitespace-nowrap">
                    {obj.name} ({(obj.confidence * 100).toFixed(0)}%)
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Status Indicator */}
          {isDirectVideoReady && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black bg-opacity-70 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg flex items-center gap-2">
              <Target className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <span className="text-xs md:text-sm font-medium">Pindai Aktif</span>
            </div>
          )}

          {/* Scanning Grid */}
          {isDirectVideoReady && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-green-400 border-dashed rounded-lg opacity-50"></div>
            </div>
          )}
        </div>
      )
    }

    if (isCameraOpen) {
      return (
        <div className="w-full h-full relative">
          {/* Loading state for camera */}
          {!isVideoReady && (
            <div className="absolute inset-0 bg-[#475F45] flex items-center justify-center z-10">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-sm md:text-lg font-semibold">Memuat kamera...</p>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            webkit-playsinline="true"
            className={`w-full h-full object-cover ${!isVideoReady ? "opacity-0" : "opacity-100"}`}
            style={{
              transform: "scaleX(-1)",
            }}
          />

          {isVideoReady && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black bg-opacity-70 text-white px-2 py-1 md:px-3 md:py-2 rounded-lg flex items-center gap-2">
              <VideoCamera className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-xs md:text-sm font-medium">Kamera Aktif</span>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )
    }

    if (selectedImage) {
      return (
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={selectedImage || "/placeholder.svg"}
            alt="Selected for scanning"
            className="max-w-full max-h-full object-contain rounded-2xl"
          />
        </div>
      )
    }

    if (isScanning) {
      return (
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-sm md:text-lg font-semibold">{scanMode === "direct" ? "Memindai..." : "Memproses..."}</p>
        </div>
      )
    }

    return (
      <div className="text-center text-white px-4">
        <div className="bg-[#556b53] rounded-3xl p-6 md:p-8 inline-block mb-4">
          <Image className="w-12 h-12 md:w-16 md:h-16 mx-auto" stroke="currentColor" strokeWidth={1.5} />
        </div>
        <p className="text-base md:text-lg font-semibold mb-2">Pilih metode scan</p>
        <p className="text-[#d9e5d8] text-sm">Gunakan salah satu opsi di atas untuk memulai proses scanning</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" data-page-content>
      <ScanNavbar onNavigate={onNavigate} />

      {/* Main Content - Unified Layout */}
      <main className="flex-1 pt-20 pb-8">
        <div className="flex flex-col xl:flex-row min-h-[calc(100vh-160px)]">
          {/* Control Panel - Top on mobile, Left on desktop */}
          <div className="w-full xl:w-80 bg-white p-4 md:p-6 xl:p-8 flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Pilih Metode Scan</h2>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 md:gap-4">
              {/* Direct Scan Button */}
              <button
                onClick={isDirectScanActive ? stopDirectScan : handleDirectScan}
                disabled={isScanning || isCameraOpen}
                className={`flex items-center justify-center xl:justify-start gap-3 md:gap-4 w-full p-3 md:p-4 rounded-2xl text-white font-semibold transition-all duration-200 ${
                  isDirectScanActive
                    ? "bg-red-600 hover:bg-red-700"
                    : scanMode === "direct"
                      ? "bg-[#3a4e39]"
                      : "bg-[#475F45] hover:bg-[#3a4e39]"
                } ${isScanning || isCameraOpen ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isDirectScanActive ? (
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <Cube className="w-5 h-5 md:w-6 md:h-6" />
                )}
                <span className="text-sm md:text-base">{isDirectScanActive ? "Stop Pindai" : "Pindai Langsung"}</span>
              </button>

              {/* Take Picture Button */}
              <button
                onClick={handleTakePicture}
                disabled={isScanning || isCameraOpen || isDirectScanActive}
                className={`flex items-center justify-center xl:justify-start gap-3 md:gap-4 w-full p-3 md:p-4 rounded-2xl text-white font-semibold transition-all duration-200 ${
                  scanMode === "camera" || isCameraOpen ? "bg-[#3a4e39]" : "bg-[#475F45] hover:bg-[#3a4e39]"
                } ${isScanning || isCameraOpen || isDirectScanActive ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Camera className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">{isCameraOpen ? "Kamera Aktif" : "Ambil Gambar"}</span>
              </button>

              {/* Upload Image Button */}
              <button
                onClick={handleUploadImage}
                disabled={isScanning || isCameraOpen || isDirectScanActive}
                className={`flex items-center justify-center xl:justify-start gap-3 md:gap-4 w-full p-3 md:p-4 rounded-2xl text-white font-semibold transition-all duration-200 ${
                  scanMode === "upload" ? "bg-[#3a4e39]" : "bg-[#475F45] hover:bg-[#3a4e39]"
                } ${isScanning || isCameraOpen || isDirectScanActive ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Upload className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base">Unggah Gambar</span>
              </button>
            </div>

            {/* Hidden file input */}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

            {/* Camera Controls */}
            {isCameraOpen && (
              <div className="flex gap-3">
                <button
                  onClick={capturePhoto}
                  disabled={!isVideoReady}
                  className={`flex-1 p-3 md:p-4 rounded-2xl font-semibold transition-all duration-200 ${
                    isVideoReady
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CameraFlash className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">{isVideoReady ? "Ambil Foto" : "Memuat..."}</span>
                  </div>
                </button>
                <button
                  onClick={closeCamera}
                  className="p-3 md:p-4 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-200"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            )}

            {/* Detection Info */}
            {isDirectScanActive && (
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                  <Target className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  <h3 className="text-sm md:text-base">Deteksi Real-time</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mb-3">
                  Arahkan kamera ke artefak untuk mendeteksi objek
                </p>

                {detectedObjects.length > 0 ? (
                  <div className="space-y-2">
                    {detectedObjects.map((obj) => (
                      <div key={obj.id} className="bg-white p-2 rounded border">
                        <div className="font-medium text-xs md:text-sm text-gray-800">{obj.name}</div>
                        <div className="text-xs text-gray-500">Confidence: {(obj.confidence * 100).toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs md:text-sm text-gray-500">Mencari objek...</div>
                )}
              </div>
            )}

            {/* Analyze Button */}
            {selectedImage && !isCameraOpen && !isDirectScanActive && (
              <button
                onClick={handleAnalyze}
                disabled={isScanning}
                className={`w-full p-3 md:p-4 rounded-2xl font-semibold transition-all duration-200 ${
                  isScanning
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <span className="text-sm md:text-base">{isScanning ? "Menganalisis..." : "Analisis Gambar"}</span>
              </button>
            )}

            {/* Error Message */}
            {cameraError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
                <p className="text-red-600 text-xs md:text-sm">{cameraError}</p>
              </div>
            )}
          </div>

          {/* Content Area - Bottom on mobile, Right on desktop */}
          <div className="flex-1 p-4 md:p-6 xl:p-8">
            <div
              className="bg-[#475F45] rounded-3xl h-full flex items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{ minHeight: "400px" }}
              data-camera-area
            >
              {renderCameraContent()}

              {/* Loading overlay for image analysis */}
              {isScanning && selectedImage && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-sm md:text-lg font-semibold">Menganalisis gambar...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#394a37] text-white text-center py-4 mt-auto">
        <p className="text-xs lg:text-sm">© 2025 Sikelor. All rights reserved.</p>
      </footer>
    </div>
  )
}
