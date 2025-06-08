"use client"

import { useEffect, useRef, useState } from "react"

const About = ({ onNavigate }) => {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  const handleMoreUs = () => {
    if (onNavigate) {
      onNavigate("about")
    }
  }

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className={`bg-white py-16 px-5 sm:px-12 md:px-24 transition-all duration-700 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto my-12 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-[#4A6249] text-lg tracking-wide mb-4">About</p>
          <h2 className="text-[#4A6249] text-2xl sm:text-3xl font-extrabold mb-7">
            Discover the story <br /> behind our museum
          </h2>
          <p className="text-[#444] text-sm leading-relaxed mb-6">
            Museum Sulawesi Tengah digagas oleh budayawan Sulawesi Tengah yaitu Masyhuddin Masyuda BA, dalam tulisannya
            yang berjudul Perspektif Pembangunan Museum Negeri Provinsi Sulawesi Tengah yang mempresentasikan pada
            penataran di Museum Nasional tahun 1975.
          </p>
          <button
            onClick={handleMoreUs}
            className="mt-2 bg-[#4A6249] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#3d543c] transition"
          >
            More Us
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="/src/assets/bg-hero.png"
            alt="Gedung Museum"
            className="w-full h-[120px] md:h-[160px] object-cover rounded-lg shadow-md col-span-2"
          />
          <img
            src="/src/assets/bg-hero.png"
            alt="Artefak"
            className="w-full h-[100px] md:h-[120px] object-cover rounded-lg shadow-md"
          />
          <img
            src="/src/assets/bg-hero.png"
            alt="Kostum Tradisional"
            className="w-full h-[100px] md:h-[120px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  )
}

export default About
