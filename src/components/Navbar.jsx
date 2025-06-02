export default function Navbar() {
    return (
      <nav className="fixed w-full z-10 flex items-center justify-between px-[40px] py-5 my-4 bg-transparent h-[80px]">
        <img src="src/assets/logo.png" alt="SIKELOR Logo" className="h-[105px] object-contain" />
        <ul className="flex space-x-8 font-semibold text-white gap-6">
          <li><a href="#" className="hover:text-gray-400">Home</a></li>
          <li><a href="#" className="hover:text-gray-400">Event</a></li>
          <li><a href="#" className="hover:text-gray-400">Artikel</a></li>
        </ul>
      </nav>
    );
  }
  