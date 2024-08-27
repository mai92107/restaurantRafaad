import { Card } from '@mui/material'
import React from 'react'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../state/authentication/Action';
import { isPresentInFavorites } from '../config/Logic';

const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

const auth = useSelector(state => state.auth);


    const handleAddToFavorite = () => {
        dispatch(addToFavorite({ restaurantId: item.id, jwt }));
    }
    const handleNavigateToRestaurant=() => {
        if (item.open) {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
        }
    }
    
  return (
      <Card className='m-5 w-[18rem]'>
          <div className={`${true ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
              
              <img className='w-full h-[10rem] rounded-t-md object-cover'
                  src={item.images[0]} alt="" />
          
              <Chip size="small" className="absolute top-2 left-2" color={(item.open) ? "success" : "error"} label={ (item.open) ? "open" : "close"} />
                  
              <div className='p-4 textPart lg:flex w-full justify-between'>
                  <div className='space-y-1'>
                      <p onClick={handleNavigateToRestaurant} className='cursor-pointer font-semibold text-lg'>{item.name }</p>
                      <p className='text-gray-500 text-sm'>{ item.description}</p>
                  </div>
                  <div>
                      <IconButton onClick={handleAddToFavorite}>
                          {isPresentInFavorites(auth.favorites,item) ? <FavoriteIcon/>:<FavoriteBorderIcon/>}
                      </IconButton>
            </div>
                  
          </div>
              
          </div>
</Card>          
  )
}

export default RestaurantCard