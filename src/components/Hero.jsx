"use client"

import { startViewTransition } from "../utils/transitions"

export default function Hero({ onNavigate }) {
  const handleNavigation = (page) => {
    startViewTransition(() => {
      onNavigate(page)
    })
  }

  return (
    <section
      className="w-full h-screen flex items-center px-4 md:px-8"
      style={{
        backgroundImage: "url('/src/assets/bg-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-5xl mx-auto text-white flex flex-col items-start">
        <h2 className="font-700 text-[24px] md:text-[35px] leading-tight mb-4 md:mb-6 mt-[100px] md:mt-[150px]">
          Scan, Recognize, Learn the Cultural <br className="hidden md:block" />
          <span className="md:hidden">Wealth of Central Sulawesi</span>
          <span className="hidden md:inline">Wealth of Central Sulawesi</span>
        </h2>
        <p className="max-w-xl mb-[50px] md:mb-[70px] mt-[15px] md:mt-[20px] text-sm md:text-base text-white/90 leading-relaxed">
          Through an innovative digital approach, we invite you to explore the rich cultural heritage of Central
          Sulawesi—from traditional dances and regional music to meaningful historical legacies. By scanning codes or
          navigating this platform, you not only recognize the uniqueness of local culture but also contribute to its
          preservation for future generations.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 w-full sm:w-auto">
          <button
            className="font-700 tracking-wider px-8 md:px-16 py-[12px] md:py-[15px] rounded-[30px] border bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            onClick={() => handleNavigation("scan")}
          >
            Scan
          </button>
          <button className="font-700 tracking-wider px-8 md:px-16 py-[12px] md:py-[15px] rounded-[30px] bg-white text-green-800 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
            About
          </button>
        </div>
      </div>
    </section>
  )
}
