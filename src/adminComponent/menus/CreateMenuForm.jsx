import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

const CreateMenuForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = 2;
      console.log(" menu : ", values);
    },
  });
  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadImage(true);
      const image = await uploadImageToCloudinary(file);

      formik.setFieldValue("images", [...formik.values.images, image]);
    } catch (error) {
      console.log("uploading failure");
    } finally {
      setUploadImage(false);
    }
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">
          Add New Menu
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-8"
          action=""
        >
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label className="relative" htmlFor="fileInput">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                  <AddPhotoAlternate className="text-white" />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
                      src={image}
                      alt=""
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Close sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                >
                  {[1, 2, 7].map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel>Ingredients</InputLabel>
                <Select
                  name="ingredients"
                  value={formik.values.ingredients}
                  multiple
                  onChange={formik.handleChange}
                  input={<OutlinedInput label="Ingredients" />}
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        padding: "0",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.8,
                      }}
                    >
                      {selected.map((value, index) => (
                        <Chip key={index} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {[1, 1, 1, 1, 1].map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={3}>
              <FormControl fullWidth>
                <InputLabel>Is Vegetarian</InputLabel>
                <Select
                  name="vegetarian"
                  value={formik.values.vegetarian}
                  onChange={formik.handleChange}
                  input={<OutlinedInput label="Is Vegetarian" />}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={3}>
              <FormControl fullWidth>
                <InputLabel>Is Seasonal</InputLabel>
                <Select
                  name="seasonal"
                  value={formik.values.seasonal}
                  onChange={formik.handleChange}
                  input={<OutlinedInput label="Is seasonal" />}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button  variant="contained" color="primary" type="submit">
            Create your Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
