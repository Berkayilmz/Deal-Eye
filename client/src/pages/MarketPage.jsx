import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../utils/fetchProducts'
import { parseProduct } from '../utils/parseProduct'
import ProductCard from '../components/ProductCard'
import LeftBar from '../components/LeftBar'
import HeroSearchSection from '../components/HeroSearchSection'
import { detectCategory } from '../utils/detectCategory'

const MarketPage = () => {
  const { marketName } = useParams()
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataTemp = await fetchProducts()
        const data = dataTemp.map(parseProduct)
        const filtered = data.filter(
          item => item.market.toLowerCase() === marketName.toLowerCase()
        )
        setProducts(filtered)
      } catch (err) {
        console.error('Ürünler yüklenemedi:', err)
      }
    }

    loadData()
  }, [marketName])

  const handleSearchChange = (e) => setQuery(e.target.value)
  const handleSearchSubmit = (e) => e.preventDefault()

  const filteredProducts = products.filter(product => {
    const category = detectCategory(product.urun)

    const matchesQuery =
      query.trim() === '' ||
      product.urun.toLowerCase().includes(query.trim().toLowerCase())

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(category)

    return matchesQuery && matchesCategory
  })

  return (
    <div>
      {/* Üst arama bölümü */}
      <HeroSearchSection
        value={query}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />

      {/* Sol filtre paneli + ürün listesi */}
      <div className="flex">
        <LeftBar
          showMarketFilter={false}
          selectedMarkets={[]} // devre dışı
          setSelectedMarkets={() => { }}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6 capitalize">
            {marketName} Ürünleri
          </h1>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">Ürün bulunamadı.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => {
                console.log(product)
                return <ProductCard key={product.id} product={product} />
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketPage