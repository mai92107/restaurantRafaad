import { Create, Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteFoodAction,
  getMenuItemByRestaurantId,
  updateMenuItemsAvailability,
} from "../../component/state/menu/Action";

const orders = [1, 1, 1, 1, 1];

const MenuTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = useSelector((store) => store.menu);
  const restaurant = useSelector((store) => store.restaurant);
  const jwt = localStorage.getItem("jwt");
  const handleUpdateStock = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt }));
  };
  const handleRemove = (foodId) => {
    dispatch(deleteFoodAction({foodId,jwt}))
  }

  useEffect(() => {
    dispatch(
      getMenuItemByRestaurantId({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurants/add-menu")}
              aria-label="settings"
            >
              <Create />
            </IconButton>
          }
          title={"All Menu Items"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Ingredients</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Availability</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItem?.map((item,index) => (
                <TableRow key={item.id}>
                  <TableCell align="center" component="th" scope="row">
                    <Avatar src={item.images[0]}></Avatar>
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    {Object.values(item.ingredients)?.map((i) => 
                      <Chip className="mx-1" key={i.key} label={i.name} />
                    )}
                  </TableCell>
                  <TableCell align="center">$ {item.price}</TableCell>
                  <TableCell align="center">
                    <Button
                      color={item.available ? "success" : "error"}
                      onClick={() => handleUpdateStock(item.id)}
                    >
                      {item.available ? "Still Available" : "Out Of Stock"}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={()=>handleRemove(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default MenuTable;
