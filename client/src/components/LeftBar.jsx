import React, { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { fetchProducts } from '../utils/product/fetchProducts'

const CATEGORIES = ['Meyve', 'Sebze', 'Dondurulmuş']

const LeftBar = ({
  selectedMarkets = [],
  setSelectedMarkets = () => {},
  selectedCategories = [],
  setSelectedCategories = () => {},
  showMarketFilter = true,
  showCategoryFilter = true,
}) => {
  const [markets, setMarkets] = useState([])

  useEffect(() => {
    const loadMarkets = async () => {
      const data = await fetchProducts()
      const uniqueMarkets = [...new Set(data.map(item => item.market))]
      setMarkets(uniqueMarkets)
    }

    loadMarkets()
  }, [])

  const toggleSelection = (value, selectedList, setSelectedList) => {
    if (selectedList.includes(value)) {
      setSelectedList(selectedList.filter(item => item !== value))
    } else {
      setSelectedList([...selectedList, value])
    }
  }

  return (
    <aside className="w-64 min-h-screen bg-gray-100 border-r p-4 space-y-6">
      {/* Market Filtresi */}
      {showMarketFilter && (
        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button className="w-full flex justify-between items-center text-left font-medium text-gray-700 hover:text-teal-600">
                <span>Market</span>
                {open ? (
                  <ChevronUpIcon className="w-5 h-5 text-teal-600" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </Disclosure.Button>

              <Disclosure.Panel className="pt-2 space-y-1">
                {markets.map((market, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between py-1 px-2 text-sm text-gray-700 hover:bg-gray-200 rounded cursor-pointer transition"
                  >
                    <span className="capitalize">{market}</span>
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-teal-600 focus:ring-teal-500"
                      checked={selectedMarkets.includes(market)}
                      onChange={() =>
                        toggleSelection(market, selectedMarkets, setSelectedMarkets)
                      }
                    />
                  </label>
                ))}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      )}

      {/* Kategori Filtresi */}
      {showCategoryFilter && (
        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button className="w-full flex justify-between items-center text-left font-medium text-gray-700 hover:text-teal-600">
                <span>Kategori</span>
                {open ? (
                  <ChevronUpIcon className="w-5 h-5 text-teal-600" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </Disclosure.Button>

              <Disclosure.Panel className="pt-2 space-y-1">
                {CATEGORIES.map((cat, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between py-1 px-2 text-sm text-gray-700 hover:bg-gray-200 rounded cursor-pointer transition"
                  >
                    <span className="capitalize">{cat}</span>
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-teal-600 focus:ring-teal-500"
                      checked={selectedCategories.includes(cat)}
                      onChange={() =>
                        toggleSelection(cat, selectedCategories, setSelectedCategories)
                      }
                    />
                  </label>
                ))}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      )}
    </aside>
  )
}

export default LeftBar