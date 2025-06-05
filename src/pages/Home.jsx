function Home() {
    return (
      <div className="px-6 py-12 bg-cover bg-center min-h-screen text-white" style={{ backgroundImage: "url('/path-ke-gambar-bg.jpg')" }}>
        <h1 className="text-4xl font-bold max-w-2xl mb-6">Scan, Recognize, Learn the Cultural Wealth of Central Sulawesi</h1>
  
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for artifacts or culture..."
            className="w-full max-w-2xl p-4 rounded border border-gray-300 text-black"
          />
        </div>
  
        {/* Tag kategori */}
        <div className="flex flex-wrap gap-2 max-w-3xl mb-12">
          {["Ethnography", "Archaeology", "Philology", "Numismatics", "Geology", "Biology"].map((item, i) => (
            <span key={i} className="bg-white text-black px-3 py-1 rounded-full text-sm">{item}</span>
          ))}
        </div>
  
        {/* Koleksi cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Tempatkan CollectionCard di sini */}
        </div>
      </div>
    )
  }
  
  export default Home
  