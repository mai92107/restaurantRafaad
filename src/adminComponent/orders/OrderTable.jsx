import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
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
import {
  getRestaurantOrder,
  updateOrderStatus,
} from "../../component/state/restaurantOrder/Action";

const OrderTable = ({ status }) => {
  const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Delivering", value: "DELIVERING" },
    { label: "Compeleted", value: "COMPLETED" },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const restaurantOrder = useSelector((store) => store.restaurantOrder);
  const restaurant = useSelector((store) => store.restaurant);
  const jwt = localStorage.getItem("jwt");
  const handleUpdateOrderStatus = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
    handleClose();
  };

  useEffect(() => {
    dispatch(
      getRestaurantOrder({ restaurantId: restaurant.usersRestaurant.id, jwt })
    );
  }, []);

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders
                ?.filter(
                  (order) => order.orderStatus == status || status == "ALL"
                )
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="right">
                      <AvatarGroup>
                        {order.items.map((foodItem) => (
                          <Avatar
                            key={foodItem.id}
                            src={foodItem.food?.images[0]}
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="right">
                      {order.customer?.fullName}
                    </TableCell>
                    <TableCell align="right">$ {order.totalPrice}</TableCell>
                    <TableCell align="right">
                      {order.items.map((foodItem) => (
                        <p>{foodItem.food?.name}</p>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {order.items.map((foodItem) =>
                        foodItem.ingredients?.map((ingredient, index) => (
                          <Chip
                            className="mx-1"
                            key={index}
                            label={ingredient}
                          />
                        ))
                      )}
                    </TableCell>
                    <TableCell align="right">{order.orderStatus}</TableCell>
                    <TableCell align="right">
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        UPDATE
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        {orderStatus.map((status) => (
                          <MenuItem
                            onClick={() => {
                              if (order.orderStatus == status.value) {
                                handleClose();
                              } else {
                                handleUpdateOrderStatus(order.id, status.value);
                              }
                            }}
                          >
                            {status.label}
                          </MenuItem>
                        ))}
                      </Menu>
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

export default OrderTable;
