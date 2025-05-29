import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [markets, setMarkets] = useState([])

  useEffect(() => {
    fetch('/assets/data/products.json')
      .then(res => res.json())
      .then(data => {
        const uniqueMarkets = [...new Set(data.map(item => item.market.toLowerCase()))]

        const formattedMarkets = uniqueMarkets.map((raw) => {
          switch (raw) {
            case 'bim':
              return { raw: 'bim', label: 'BİM' }
            case 'a101':
              return { raw: 'a101', label: 'A101' }
            case 'migros':
              return { raw: 'migros', label: 'Migros' }
            case 'sok':
              return { raw: 'sok', label: 'SOK' }
            case 'tarim_kredi':
            case 'tarım kredi':
              return { raw: 'tarim_kredi', label: 'Tarım Kredi Kooperatifi' }
            default:
              return { raw, label: raw }
          }
        })

        setMarkets(formattedMarkets)
      })
      .catch(err => console.error('Market verisi alınamadı', err))
  }, [])

  return (
    <header className="w-full h-16 bg-white shadow-md border-b border-gray-200 px-6 flex items-center justify-between mb-8">
      {/* Sol logo */}
      <Link to="/" className="text-2xl font-bold text-teal-600">
        DEAL-EYE
      </Link>

      {/* Sağ linkler */}
      <div className="flex items-center gap-6">
        {markets.map(({ raw, label }, i) => (
          <Link
            key={i}
            to={`/market/${raw}`}
            className="text-sm text-gray-600 hover:text-teal-600 transition"
          >
            {label}
          </Link>
        ))}

        {/* Listem sabit link */}
        <Link
          to="/listem"
          className="text-sm text-teal-600 font-medium hover:text-teal-800 transition"
        >
          Listem
        </Link>
      </div>
    </header>
  )
}

export default Header