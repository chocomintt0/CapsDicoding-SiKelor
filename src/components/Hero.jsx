export default function Hero() {
    return (
    <section
      className="w-full h-screen flex items-center px-8"
      style={{
        backgroundImage: "url('/src/assets/bg-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-5xl mx-auto text-white flex flex-col items-start">
        <h2 className="font-700 text-[35px] leading-tight mb-6 mt-[150px]">
          Scan, Recognize, Learn the Cultural <br />
          Wealth of Central Sulawesi
        </h2>
        <p className="max-w-xl mb-[70px] mt-[20px] text-base text-white/90">
          Through an innovative digital approach, we invite you to explore the rich cultural heritage of Central Sulawesi—from traditional dances and regional music to meaningful historical legacies. By scanning codes or navigating this platform, you not only recognize the uniqueness of local culture but also contribute to its preservation for future generations.
        </p>
        <div className="flex space-x-8">
          <button className="font-700 tracking-wider px-16 py-[15px] rounded-[30px] border bg-transparent border-white text-white hover:bg-white hover:text-black transition">
            Scan
          </button>
          <button className="font-700 tracking-wider px-16 py-[15px] rounded-[30px] bg-white text-green-800 hover:bg-gray-200 transition">
            About
          </button>
        </div>
      </div>
    </section>
    );
  }
  