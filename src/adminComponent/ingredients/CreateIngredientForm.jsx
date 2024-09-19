import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../component/state/ingredient/Action";

const CreateIngredientForm = () => {
  const restaurant = useSelector((store) => store.restaurant);
  const ingredient = useSelector((store) => store.ingredient);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      restaurantId: restaurant.usersRestaurant.id,
    };
    dispatch(createIngredient({ data, jwt }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Category
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Ingredient Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          ></TextField>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              id="category"
              name="categoryId"
              value={formData.categoryId}
              label="Category"
              onChange={handleInputChange}
            >
              {ingredient.category?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Create Ingredients
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
