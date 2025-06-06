import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const markets = [
    { raw: 'bim', label: 'BİM' },
    { raw: 'a101', label: 'A101' },
    { raw: 'migros', label: 'Migros' },
    { raw: 'sok', label: 'SOK' },
    { raw: 'tarim_kredi', label: 'Tarım Kredi Kooperatifi' },
  ]

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


      </div>
    </header>
  )
}

export default Header