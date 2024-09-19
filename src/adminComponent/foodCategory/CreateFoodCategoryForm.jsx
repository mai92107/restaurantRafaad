import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../component/state/restaurant/Action";

const CreateFoodCategoryForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.categoryName,
      restaurantId: {
        id: 1,
      },
    };
    dispatch(
      createCategoryAction({ reqData: data, jwt: localStorage.getItem("jwt") })
    );
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
          Create Food Category
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Food Category"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
          ></TextField>
          <Button variant="contained" type="submit">
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategoryForm;
