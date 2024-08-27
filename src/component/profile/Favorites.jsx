import React from 'react'
import RestaurantCard from '../restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

const Favorites = () => {
  const auth = useSelector(state => state.auth);
  return (
      <div>
          <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
          <div className='flex flex-wrap gap-1 justify-center'>
        {auth.favorites.map((item) => <RestaurantCard item={ item} />)}
          </div>
    </div>
  )
}

export default Favorites