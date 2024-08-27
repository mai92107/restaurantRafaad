
import './App.css';
import { Navbar } from './component/navBar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './component/theme/DarkTheme';
import  Home  from './component/home/Home';
import RestaurantDetail from './component/restaurant/RestaurantDetail';
import Cart from './component/cart/Cart';
import Profile from './component/profile/Profile';
import CustomerRouter from './routers/CustomerRouter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/state/authentication/Action';
import { findCart } from '../src/component/state/cart/Action'




function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store => store);

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));

  }, [auth.jwt]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
     
      <CustomerRouter/>
    </ThemeProvider>
  );
}

export default App;
