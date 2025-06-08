import { useEffect, useRef, useState } from 'react';

const events = [
  { date: 'Oct 12, 2025', title: 'Judul Event', image: 'src/assets/bg-hero.png' },
  { date: 'Oct 12, 2025', title: 'Judul Event', image: 'src/assets/bg-hero.png' },
  { date: 'Oct 12, 2025', title: 'Judul Event', image: 'src/assets/bg-hero.png' },
];

const EventSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          events.forEach((_, i) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, i * 200);
          });
        } else {
          setVisible(false);
          setVisibleItems([]);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="bg-gradient-to-t from-[#263628] via-[#476649] to-[#5f8861] text-white py-14 px-6 text-center overflow-hidden">
        {/* Efek Judul Section */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <p className="uppercase text-[20px] tracking-wide mb-1">Explore Our Event</p>
          <h2 className="text-[45px] font-bold mb-4">Explore our stories and events</h2>
          <p className="text-sm text-white/90 max-w-[900px] mx-auto mb-20 tracking-widest">
            From insightful articles to exciting exhibitions, this space keeps you updated with what’s happening at the museum.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-16">
          {/* Events */}
          <div className="flex flex-col items-start w-full md:w-[370px]">
            <div className="flex justify-between items-center w-full mb-10">
              <h3 className="font-bold text-lg">Events</h3>
              <a href="#" className="text-sm text-white/80 hover:underline">VIEW ALL</a>
            </div>
            {events.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 mb-6 transform transition-all duration-500 ease-out ${
                  visibleItems.includes(index)
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-90 translate-y-5'
                }`}
              >
                <img src={item.image} alt={item.title} className="w-[160px] h-[160px] object-cover rounded-md" />
                <div className="text-left">
                  <p className="text-base text-white/80">{item.date}</p>
                  <p className="text-base font-bold mt-1">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-sm text-white px-6 pt-16 pb-10 mt-[-1px]">
        <div
          className={`max-w-6xl mx-auto transition-all duration-700 ease-out transform ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
            <div>
              <h3 className="font-bold text-lg mb-4">SIKELOR</h3>
              <p className="text-white/80">
                Sistem Informasi Kebudayaan dan Edukasi Rakyat. Menyediakan eksplorasi budaya Sulawesi Tengah secara digital dan interaktif.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-3">Navigation</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Event</a></li>
                <li><a href="#" className="hover:text-white">Artikel</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-3">Contact</h4>
              <ul className="space-y-2 text-white/80">
                <li>Email: <a href="mailto:info@sikelor.id" className="hover:text-white">info@sikelor.id</a></li>
                <li>Telp: +62 812-3456-7890</li>
                <li>Alamat: Palu, Sulawesi Tengah</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base mb-3">Follow Us</h4>
              <div className="flex space-x-4 mt-2 text-lg">
                <a href="#" className="hover:text-white transition">🌐</a>
                <a href="#" className="hover:text-white transition">🐦</a>
                <a href="#" className="hover:text-white transition">📷</a>
                <a href="#" className="hover:text-white transition">▶️</a>
              </div>
            </div>
          </div>

          <hr className="my-10 border-white/20" />

          <p className="text-center text-white/60 text-xs">
            © {new Date().getFullYear()} SIKELOR. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default EventSection;
