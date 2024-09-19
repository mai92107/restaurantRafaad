import { Create } from "@mui/icons-material";
import {
  Box,
  Button,
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
} from "@mui/material";
import React, { useEffect } from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientsOfRestaurant,
  updateStockOfIngredient,
} from "../../component/state/ingredient/Action";

const orders = [1, 1, 1, 1, 1];
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
const IngredientTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const restaurant = useSelector((store) => store.restaurant);
  const ingredient = useSelector((store) => store.ingredient);
  const handleUpdateStock = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };
  useEffect(() => {
    dispatch(
      getIngredientsOfRestaurant({ id: restaurant.usersRestaurant.id, jwt })
    );
  }, []);
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <Create />
            </IconButton>
          }
          title={"Ingredients"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredient.ingredients?.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell component="th" scope="row">
                    {ingredient.id}
                  </TableCell>
                  <TableCell align="right">{ingredient.name}</TableCell>
                  <TableCell align="right">
                    {ingredient.category.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color={ingredient.instock ? "success" : "error"}
                      onClick={() => handleUpdateStock(ingredient.id)}
                    >
                      {ingredient.instock ? "Still Available" : "Out Of Stock"}
                    </Button>
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
          <CreateIngredientForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientTable;
