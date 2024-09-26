import { Create, Delete, DeleteOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateFoodCategory from "./CreateFoodCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getFoodByCategory,
  getRestaurantsCategory,
} from "../../component/state/restaurant/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const FoodCategoryTable = () => {
  const jwt = localStorage.getItem("jwt");

  const dispatch = useDispatch();
  const restaurant = useSelector((store) => store.restaurant);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(restaurant);
  const handleRemove = (categoryId) => {
    dispatch(getFoodByCategory({ jwt, categoryId }));

    if (restaurant.foods.length === 0) {
      dispatch(deleteCategory({ categoryId, jwt }));
    }
    // else {
    //   confirm("分類內仍有食物，確定要刪除？") &&
    //     dispatch(deleteCategory({ categoryId, jwt }));
    // }
  };

  useEffect(() => {
    dispatch(
      getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
  }, []);
  return (
    <Box>
      <Card className="m-10">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <Create />
            </IconButton>
          }
          title={"Food Category"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer className="m-10 w-5" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">List</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories?.map((category, index) => (
                <TableRow key={index}>
                  <TableCell align="left" component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{category.name}</TableCell>
                  <TableCell align="center">
                    <DeleteOutlined onClick={() => handleRemove(category.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategory />
        </Box>
      </Modal>
    </Box>
  );
};

export default FoodCategoryTable;
