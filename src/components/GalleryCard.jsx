const GalleryCard = ({ image, title, description }) => {
    return (
      <div className="relative py-1 px-1">
        <div className="relative w-[280px] h-[330px] overflow-hidden rounded-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
          {/* Gambar latar */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover p-6 bg-[#50684E] transition-transform duration-500 ease-in-out hover:scale-105"
          />
  
          {/* Overlay konten hanya setengah kiri */}
          <div className="absolute bottom-0 left-0 w-[70%] h-[155px] bg-[#476649] text-white p-3 text-left rounded">
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="text-xs mb-2 text-white/90 my-2">{description}</p>
            <ul className="list-none p-0">
              <li className="my-5 py-2 px-0 bg-transparent">
                <a href="#" className="text-white/65 text-xs font-bold no-underline block relative w-[70%] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Learn More
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default GalleryCard;
  