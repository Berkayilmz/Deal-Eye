import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Üst Header */}
      <Header />

      {/* Sayfa İçeriği */}
      <div className="flex-1 w-full px-6 sm:px-10 lg:px-16">
        <div className="max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout