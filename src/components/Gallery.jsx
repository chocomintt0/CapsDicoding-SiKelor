import { useEffect, useRef, useState } from 'react';
import GalleryCard from './GalleryCard';

const dummyData = [
  {
    image: 'src/assets/bg-hero.png',
    title: 'Lorem Ipsum',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  },
  {
    image: 'src/assets/bg-hero.png',
    title: 'Lorem Ipsum',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  },
  {
    image: 'src/assets/bg-hero.png',
    title: 'Lorem Ipsum',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  },
  {
    image: 'src/assets/bg-hero.png',
    title: 'Lorem Ipsum',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  }
];

const Gallery = () => {
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const observerTitle = new IntersectionObserver(
      ([entry]) => setTitleVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const observerButton = new IntersectionObserver(
      ([entry]) => setButtonVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (titleRef.current) observerTitle.observe(titleRef.current);
    if (buttonRef.current) observerButton.observe(buttonRef.current);

    return () => {
      observerTitle.disconnect();
      observerButton.disconnect();
    };
  }, []);

  return (
    <section className="bg-gradient-to-t from-[#5f8861] via-[#476649] to-[#263628] text-center py-16 px-4">
      <div
        ref={titleRef}
        className={`transition-all duration-700 ease-in-out transform ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-white text-sm uppercase tracking-wide mb-2">Our Gallery</p>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-10">
          A Visual Journey Through <br />
          Central Sulawesi’s Culture
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {dummyData.map((item, index) => (
          <GalleryCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <div
        ref={buttonRef}
        className={`transition-all duration-700 ease-in-out transform ${
          buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <button className="mt-10 bg-white text-[#476649] font-semibold px-12 py-3 rounded-full hover:bg-gray-100 transition">
          Collection
        </button>
      </div>
    </section>
  );
};

export default Gallery;
