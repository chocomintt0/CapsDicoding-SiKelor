"use client"

import { useState } from "react"
import { Search } from "./icons"

export default function ArticleSearch({ onSearch, onSort, onCategoryChange, categories }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleSort = (e) => {
    onSort(e.target.value)
  }

  const handleCategoryToggle = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(updatedCategories)
    onCategoryChange(updatedCategories)
  }

  return (
    <div className="mb-12">
      {/* Search Bar and Sort Row */}
      <div className="flex gap-4 mb-6">
        {/* Sort Dropdown */}
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm text-gray-600 whitespace-nowrap">
            Urutkan :
          </label>
          <select
            id="sort"
            className="text-sm border border-gray-300 rounded-md p-3 focus:ring-[#475F45] focus:border-[#475F45] min-w-[140px]"
            onChange={handleSort}
            defaultValue="newest"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-[#475F45] focus:border-[#475F45]"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Kategori:</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategories.includes(category)
                  ? "bg-[#475F45] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
