import React, { useEffect, useState } from 'react'

const images = [
  '/assets/image/bg1.jpg',
  '/assets/image/bg2.jpg',
  '/assets/image/bg3.jpg',
  // istediğin kadar görsel
]

const HeroSearchSection = ({ value, onChange, onSubmit }) => {
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length)
    }, 5000) // 5 saniyede bir değiş

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative w-full h-64 sm:h-80 flex items-center justify-center text-center px-4 text-white"
      style={{
        backgroundImage: `url(${images[bgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.8s ease-in-out',
      }}
    >
      {/* Arka plan karartma */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* İçerik */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Ürün Ara, Market Fiyatlarını Karşılaştır, Kazançlı Çık!
        </h1>

        <form onSubmit={onSubmit} className="flex max-w-lg mx-auto">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Ne aramak istersiniz?"
            className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none text-black"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-r-md hover:bg-teal-700 transition"
          >
            Ara
          </button>
        </form>
      </div>
    </section>
  )
}

export default HeroSearchSection