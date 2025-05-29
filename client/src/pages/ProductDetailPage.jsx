import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../utils/fetchProducts'

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [timeRange, setTimeRange] = useState('all')

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProducts()
      const found = data.find(item => String(item.id) === String(id))
      setProduct(found || null)
    }

    loadProduct()
  }, [id])

  if (!product) {
    return <div className="p-6">Ürün bulunamadı veya yükleniyor...</div>
  }

  const priceHistory = Object.entries(product)
    .filter(([key]) => /^\d{2}-\d{2}-\d{4}$/.test(key))
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))

  const [latestDate, latestPrice] = priceHistory[priceHistory.length - 1] || []

  const now = new Date()
  const filteredHistory = priceHistory.filter(([date]) => {
    const d = new Date(date.split('-').reverse().join('-'))
    const diffDays = (now - d) / (1000 * 60 * 60 * 24)
    if (timeRange === 'week') return diffDays <= 7
    if (timeRange === 'month') return diffDays <= 30
    return true
  })

  const chartData = {
    labels: filteredHistory.map(([date]) => date),
    datasets: [
      {
        label: 'Fiyat (₺)',
        data: filteredHistory.map(([_, price]) =>
          parseFloat(String(price).replace(',', '.').replace('₺', ''))
        ),
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: (val) => `${val}₺`,
        },
      },
    },
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Ürün Görseli */}
        <div className="bg-gray-50 p-6 rounded-lg border flex items-center justify-center">
          <img
            src={product.img}
            alt={product.urun}
            className="max-h-[320px] object-contain"
          />
        </div>

        {/* 2. Ürün Bilgi Kutusu */}
        <div className="bg-gray-50 p-6 rounded-lg border flex flex-col justify-start">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{product.urun}</h1>
            <span className="text-sm text-gray-500 italic mt-1">{product.market}</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="text-3xl font-extrabold text-teal-600">{latestPrice}</div>
            <div className="text-sm text-gray-400">{latestDate}</div>
          </div>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                  <span>Fiyat Geçmişi</span>
                  {open ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="mt-2 px-4 max-h-48 overflow-y-auto border border-gray-200 rounded-md shadow-inner bg-white">
                  <ul className="text-sm text-gray-700 divide-y divide-gray-100">
                    {priceHistory.slice().reverse().map(([date, price]) => (
                      <li key={date} className="flex justify-between py-2 px-2">
                        <span>{date}</span>
                        <span>{price}</span>
                      </li>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* 3. Fiyat Grafiği (görselin altı) */}
        <div className="bg-gray-50 p-6 rounded-lg border col-span-1">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-lg font-semibold">Fiyat Değişim Grafiği</h2>
            {['week', 'month', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm border rounded ${timeRange === range
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700'
                  }`}
              >
                {range === 'week' ? 'Haftalık' : range === 'month' ? 'Aylık' : 'Tümü'}
              </button>
            ))}
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* 4. Boş veya ileride tahmin kutusu */}
        <div className="bg-gray-50 p-6 rounded-lg border col-span-1 flex items-center justify-center text-gray-400 italic">
          Tahmin kutusu (yakında)
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage