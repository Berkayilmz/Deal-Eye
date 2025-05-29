import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import ProductDetailPage from '../pages/ProductDetailPage'
import MarketPage from '../pages/MarketPage'


const AppNavigator = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='product/:id' element={<ProductDetailPage/>}/>
                <Route path='market/:marketName' element={<MarketPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppNavigator