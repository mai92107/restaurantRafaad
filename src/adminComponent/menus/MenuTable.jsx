import { Create, Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const orders = [1, 1, 1, 1, 1];

const MenuTable = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton  onClick={()=>navigate("/admin/restaurants/add-menu")} aria-label="settings">
              <Create/>
            </IconButton>
          }
          title={"All Menu Items"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Ingredients</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Availability</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {1}
                  </TableCell>
                  <TableCell align="center">{"image"}</TableCell>
                  <TableCell align="center">{"rafaCoding@gmail.com"}</TableCell>
                  <TableCell align="center">{"price"}</TableCell>
                  <TableCell align="center">{"pizza"}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Delete />
                    </IconButton>
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

export default MenuTable;
