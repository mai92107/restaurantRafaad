import { Button, TextField, Typography } from "@mui/material";
import {  Form, Formik } from "formik";
import React from "react";
import { Field } from "formik";
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch } from "react-redux";
import { registerUser } from "../state/authentication/Action";

const initialValues = {
  fullName:"",
  email: "",
  password: "",
  role:"ROLE_CUSTOMER"
};

export default function RegisterForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("form values", values);
    dispatch(registerUser({ userData: values, navigate }));
   };
  
  return (
    <div>
      <Typography variant="h5" className="text-center">
        Register
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
        <Field
            as={TextField}
            name="fullName"
            label="full Name"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <Field
            as={TextField}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />
          
          <InputLabel sx={{ mt: 2 }} id="role-select-label">Role</InputLabel>
<Field
  as={Select}
  fullWidth
  margin="normal"
  labelId="role-select-label"
  id="role-select-label"
  name="role"
  label="Role"
  defaultValue="ROLE_CUSTOMER"
>
  <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
  <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
</Field>

          <Button sx={{mt:2, padding:"1rem"}} fullWidth type="submit" variant="contained">register</Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{mt:3}}>
        Have an account already?
        <Button size="small" onClick={()=>navigate("/account/login")}>Go Login</Button>
      </Typography>
    </div>
  )
}

