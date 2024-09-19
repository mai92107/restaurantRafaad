import React, { useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../dashBoard/DashBoard";
import Orders from "../orders/Orders";
import Menus from "../menus/Menus";
import Events from "../events/Events";
import FoodCategory from "../foodCategory/FoodCategory";
import Ingredients from "../ingredients/Ingredients";
import RestaurantDetails from "./RestaurantDetails";
import CreateMenuForm from "../menus/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "../../component/state/restaurant/Action";
import { getRestaurantOrder } from "../../component/state/restaurantOrder/Action";

const Admin = () => {
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector((store) => store.restaurant);

  const dispatch = useDispatch();
  const handleClose = () => {};
  useEffect(() => {
    dispatch(
      getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );

    dispatch(
      getRestaurantOrder({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
  }, []);
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSideBar handleClose={handleClose} />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menus />} />
            <Route path="/category" element={<FoodCategory />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/events" element={<Events />} />
            <Route path="/details" element={<RestaurantDetails />} />
            <Route path="/add-menu" element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
