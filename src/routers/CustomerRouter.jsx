import React from 'react'
import { Navbar } from '../component/navBar/Navbar'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Home } from '../component/home/Home'
import RestaurantDetail from '../component/restaurant/RestaurantDetail'
import Cart from '../component/cart/Cart'
import Profile from '../component/profile/Profile'
import Auth from '../component/auth/Auth'


const CustomerRouter = () => {
  return (
      <div>
          <Navbar />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/account/:register' element={<Home />} />
              <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/my-profile/*' element={<Profile />} />
      </Routes>
      <Auth/>
    </div>
  )
}

export default CustomerRouter