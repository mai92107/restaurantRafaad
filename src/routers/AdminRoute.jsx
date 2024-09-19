import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../adminComponent/createRestaurantForm/CreateRestaurantForm";
import Admin from "../adminComponent/admin/Admin";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../component/state/restaurant/Action";

const AdminRouter = () => {
  const { restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRestaurantByUserId(jwt));
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;
