import { useEffect, useState } from "react";

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative z-10 w-full h-[700px] flex items-center px-8 overflow-hidden"
      style={{
        backgroundImage: "url('/src/assets/bg-hero.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "110%",
        backgroundPosition: `center`
      }}
    >
      {/* Overlay kabut */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Konten */}
      <div className="w-full max-w-5xl mx-auto text-white flex flex-col items-start z-10">
        <h2
          className="font-bold text-[35px] leading-tight mb-6"
          style={{
            transform: `translateY(${offsetY * 0.2}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          Scan, Recognize, Learn the Cultural <br />
          Wealth of Central Sulawesi
        </h2>
        <p
          className="max-w-xl mb-[70px] mt-[20px] text-base text-white/90"
          style={{
            transform: `translateY(${offsetY * 0.1}px)`,
            transition: "transform 0.2s ease-out",
            opacity: 1 - offsetY / 600,
          }}
        >
          Through an innovative digital approach, we invite you to explore the
          rich cultural heritage of Central Sulawesi—from traditional dances and
          regional music to meaningful historical legacies...
        </p>
        <div
          className="flex space-x-8"
          style={{
            transform: `translateY(${offsetY * 0.05}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <button className="font-bold tracking-wider px-16 py-[15px] rounded-[30px] border bg-transparent border-white text-white hover:bg-white hover:text-black transition">
            Scan
          </button>
          <button className="font-bold tracking-wider px-16 py-[15px] rounded-[30px] bg-white text-green-800 hover:bg-transparent hover:text-white transition">
            About
          </button>
        </div>
      </div>
    </section>
  );
}
