import {
  AdminPanelSettings,
  Category,
  Dashboard,
  Event,
  Fastfood,
  ShoppingBag,
  ShopTwo,
} from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import React from "react";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../component/state/authentication/Action";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
  { title: "Menu", icon: <ShopTwo />, path: "/menu" },
  { title: "Food Category", icon: <Category />, path: "/category" },
  { title: "Ingredients", icon: <Fastfood />, path: "/ingredients" },
  { title: "Event", icon: <Event />, path: "/events" },
  { title: "Details", icon: <AdminPanelSettings />, path: "/details" },
  { title: "Logout", icon: <Logout />, path: "/" },
];

const AdminSideBar = ({ handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (item) => {
    navigate(`/admin/restaurants${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
      handleClose();
      console.log("logout");
    }
  };

  return (
    <div>
      
        <Drawer
          variant={"permanent"}
          onClose={handleClose}
          open={false}
          anchor="left"
          sx={{ zIndex: 1 }}
        >
          <div className="lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
            {menu.map((item, i) => (
              <>
                <div
                  onClick={() => handleNavigate(item)}
                  className="px-5 flex items-center gap-5 cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {i !== menu.length - 1 && <Divider />}
              </>
            ))}
          </div>
        </Drawer>
      
    </div>
  );
};

export default AdminSideBar;
