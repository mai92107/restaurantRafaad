import React from 'react'
import AddressCard from '../cart/AddressCard'

const Address = () => {
  return (
    <div>
      {[1,1,1].map(()=><AddressCard/>)}
    </div>
  )
}

export default Address