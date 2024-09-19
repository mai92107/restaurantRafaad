import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./component/theme/DarkTheme";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./component/state/authentication/Action";
import { findCart } from "../src/component/state/cart/Action";
import Routers from "./routers/Routers";
import { getRestaurantByUserId } from "./component/state/restaurant/Action";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
  }, [auth.jwt]);

  // useEffect(() => {
  //   dispatch(getRestaurantByUserId(auth.jwt || jwt));
  // }, [auth.user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <CustomerRouter/> */}
      <Routers />
    </ThemeProvider>
  );
}

export default App;
