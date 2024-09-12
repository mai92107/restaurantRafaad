import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import React, { useState } from "react";

const CreateIngredientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredientCategoryId: "",
  });
  const handleSubmit = () => {
    const data = {
      name: formData.ingredientName,
      restaurantId: {
        id: 1,
      },
    };
    console.log(data);
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
            id="ingredientName"
            name="ingredientName"
            label="Ingredient Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.ingredientName}
          ></TextField>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              id="category"
              name="ingredientCategoryId"
              value={formData.ingredientCategoryId}
              label="Category"
              onChange={handleInputChange}
            >
              {[1, 2, 7].map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
