import { Grid } from "@mui/material";
import React from "react";
import MenuTable from "../menus/MenuTable";
import OrderTable from "../orders/OrderTable";

const DashBoard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <MenuTable/>
        </Grid>
        <Grid item xs={12} lg={6}>
        <OrderTable/>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default DashBoard;
