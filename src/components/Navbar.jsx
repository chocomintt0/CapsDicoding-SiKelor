import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 flex items-center justify-between px-[40px] py-6 mb-4 mt-0 h-[80px] transition-all duration-300 ${
        scrolled ? 'bg-black/20 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <img
        src="src/assets/logo.png"
        alt="SIKELOR Logo"
        className="h-[105px] object-contain"
      />
      <ul className="flex space-x-8 font-semibold text-white gap-6">
        <li className="bg-transparent transition duration-300 ease-in-out transform hover:-translate-y-1">
          <a href="#" className=" after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Home</a>
        </li>
        <li className="bg-transparent transition duration-300 ease-in-out transform hover:-translate-y-1">
          <a href="#" className=" after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Event</a>
        </li>
        <li className="bg-transparent transition duration-300 ease-in-out transform hover:-translate-y-1">
          <a href="#" className=" after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Artikel</a>
        </li>
      </ul>
    </nav>
  );
}
