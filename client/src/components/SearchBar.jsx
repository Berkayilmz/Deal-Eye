import React from 'react'

const SearchBar = ({ value, onChange, placeholder = "Ürün ara..." }) => {
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          🔍
        </div>
      </div>
    </div>
  )
}

export default SearchBar