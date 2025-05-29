import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../utils/product/fetchProducts'
import ProductCard from '../components/ProductCard'
import LeftBar from '../components/LeftBar'
import HeroSearchSection from '../components/HeroSearchSection'
import { detectCategory } from '../utils/detectCategory'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [selectedMarkets, setSelectedMarkets] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        console.error('Ürün verisi alınamadı:', err)
      }
    }

    loadData()
  }, [])

  const handleSearchChange = (e) => setQuery(e.target.value)
  const handleSearchSubmit = (e) => e.preventDefault()

  const filteredProducts = products.filter((product) => {
    const category = detectCategory(product.urun)

    const matchesMarket =
      selectedMarkets.length === 0 || selectedMarkets.includes(product.market)

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(category)

    const matchesQuery =
      query.trim() === '' ||
      product.urun.toLowerCase().includes(query.trim().toLowerCase())

    return matchesMarket && matchesCategory && matchesQuery
  })

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-xl">
      {/* Üst arama alanı */}
      <HeroSearchSection
        value={query}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      {/* Sol filtre paneli + ürün grid'i */}
      <div className="flex">
        <LeftBar
          selectedMarkets={selectedMarkets}
          setSelectedMarkets={setSelectedMarkets}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <main className="flex-1 p-6">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">Filtrene uygun ürün bulunamadı.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default HomePage