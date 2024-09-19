import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAction,
  deleteEventAction,
  getRestaurantEvents,
} from "../../component/state/restaurant/Action";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";
import { AddPhotoAlternate, Close } from "@mui/icons-material";

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

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector((store) => store.restaurant);
  const initialValue = {
    image: "",
    location: "",
    name: "",
    description: "",
    startTime: null,
    endTime: null,
  };
  const [uploadImage, setUploadImage] = useState(false);
  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadImage(true);
      const image = await uploadImageToCloudinary(file);
      setFormValues({ ...formValues, image: image });
    } catch (error) {
      console.log("uploading failure");
    } finally {
      setUploadImage(false);
    }
  };
  const handleRemoveImage = () => {
    setFormValues({ ...formValues, image: "" });
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };
  const handleRemove = (eventId) => {
    dispatch(deleteEventAction({ eventId, jwt }));
  };
  const [formValues, setFormValues] = useState(initialValue);

  const formattedValue = {
    ...formValues,
    startTime: dayjs(formValues.startTime).format("YYYY-MM-DD hh:mm:ss a"),
    endTime: dayjs(formValues.endTime).format("YYYY-MM-DD hh:mm:ss a"),
  };
  useEffect(() => {
    dispatch(
      getRestaurantEvents({
        jwt,
        restaurantId: restaurant.usersRestaurant?.id,
      })
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues(initialValue);
    dispatch(
      createEventAction({
        data: formattedValue,
        jwt,
        restaurantId: restaurant.usersRestaurant.id,
      })
    );
    console.log("submit ", formValues);
  };

  return (
    <div>
      <div className="p-5">
        <div className="mt-5 px-5 flex flex-wrap gap-5">
          {restaurant.restaurantsEvents?.map((event, index) => (
            <Card sx={{ width: 345 }} key={index}>
              <CardMedia sx={{ height: 345 }} image={event.image} />
              <CardContent>
                <Typography variant="h5">{event.name}</Typography>
                <Typography variant="body2">{event.description}</Typography>
                <div className="py-2 space-y-2">
                  <p>{event.location}</p>
                  <p className="text-sm text-blue-500">{event.startTime}</p>
                  <p className="text-sm text-red-500">{event.endTime}</p>
                </div>
              </CardContent>
              {true && (
                <CardActions>
                  <IconButton onClick={() => handleRemove(event.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          ))}
        </div>
        <div className="m-10 justify-center">
          <Button onClick={handleOpen} variant="contained">
            Create New Event
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {formValues.image.length === 0 ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        id="fileInput"
                      />
                      <label className="relative" htmlFor="fileInput">
                        <span className="w-100 h-100 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                          <AddPhotoAlternate className="text-white" />
                        </span>
                        {uploadImage && (
                          <div className="absolute left-0 right-0 top-0 bottom-0 w-100 h-100 flex justify-center items-center">
                            <CircularProgress />
                          </div>
                        )}
                      </label>
                    </>
                  ) : (
                    <div className="relative">
                      <img
                        className="w-100 h-100 object-cover"
                        src={formValues.image}
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
                        onClick={handleRemoveImage}
                      >
                        <Close sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="location"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Event Description"
                    variant="outlined"
                    fullWidth
                    value={formValues.description}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Date and Time"
                      value={formValues.startTime}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startTime")
                      }
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className="w-full"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(prop) => <TextField {...prop} />}
                      label="End Date and Time"
                      value={formValues.endTime}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "endTime")
                      }
                      minDateTime={formValues.startTime}
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className="w-full"
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant="contained" color="primary" type="submit">
                  SUBMIT
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Events;
