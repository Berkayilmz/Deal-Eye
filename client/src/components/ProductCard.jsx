import React from 'react'
import { parseProduct } from '../utils/parseProduct'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const { id, market, urun, img, date, price } = parseProduct(product)

  return (
    <Link to={`/product/${id}`} className="block">
      <div className="border border-gray-300 rounded-lg p-4 w-full shadow-sm hover:shadow-md transition-shadow bg-white hover:cursor-pointer">
        {/* Ürün görseli */}
        <img
          src={img}
          alt={urun}
          className="w-full h-28 object-contain mb-4"
        />

        {/* Ürün adı - tek satır, kesme aktif */}
        <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate overflow-hidden whitespace-nowrap">
          {urun}
        </h3>

        <hr className="my-2 border-gray-200" />

        {/* Market bilgisi */}
        <div className="text-xs text-gray-600 mb-1">
          <span className="text-green-600 font-semibold">{market}</span>
        </div>

        <hr className="my-2 border-gray-200" />

        {/* Fiyat */}
        <div className="text-lg font-bold text-gray-900">
          {price ? `${price.toFixed(2)}₺` : 'Fiyat yok'}
        </div>

        {/* Tarih */}
        <div className="text-xs text-gray-500">
          {date || 'Tarih yok'}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard