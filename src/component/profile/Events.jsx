import React, { useEffect } from "react";
import EventCard from "./EventCard";
import { getAllEvents } from "../state/restaurant/Action";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const restaurant = useSelector((state) => state.restaurant);
  console.log(restaurant);

  useEffect(() => {
    dispatch(getAllEvents({ jwt }));
  }, []);

  return (
    <div className="mt-5 px-5 flex flex-wrap gap-5">
      {restaurant.events?.map((event, index) => (
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
        </Card>
      ))}
    </div>
  );
};

export default Events;
