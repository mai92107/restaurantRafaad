import React from "react";
import { Divider, TextField } from "@mui/material";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import {Grid} from "@mui/material";
import { Field } from "formik";
import { Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../state/order/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  district: "",
  pincode: "",
  city: "",
};
const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street address is required"),
  district: Yup.string().required("district is required"),
  pincode: Yup.number().required("pincode is required"),
  city: Yup.string().required("city is required"),
});


const Cart = () => {
  const dispatch = useDispatch();
  const createOrderUsingSelectedAddress = () => {};
  const handleOpenAddressModel = () => setOpen(true);
  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pinCode,
          country:"Taiwan"
        }
      }
    }
    dispatch(createOrder(data));
        console.log("form value", values);
  };

  const [open, setOpen] = React.useState(false);
  const { cart , auth} = useSelector(store=>store);
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem item={ item} />
          ))}

          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>${cart.cart?.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>$101</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Restaurant Charges</p>
                <p>$100</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total pay</p>
                <p>${cart.cart?.total + 101+100}</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[68%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1, 1, 1].map((item) => (
                <AddressCard
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButtom={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-50">
                  <h1 className="font-semibold text-lg text-white">
                    Add new address
                  </h1>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleOpenAddressModel}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
                      validationSchema={validationSchema}>
                      <Form>
                      <Grid container spacing={2}>
                          <Grid item xs={12}>
                              <Field as={TextField} name="streetAddress" label="Street Address"
                                  fullWidth variant="outlined" error={!ErrorMessage("streetAddress")}
                                  helperTest={ 
                                      <ErrorMessage>
                                          { (msg)=><span className="text-red-600">{msg}</span>}
                                      </ErrorMessage>
                                  }/>
                                  

                              
                          </Grid>
                          <Grid item xs={6}>
                              <Field as={TextField} name="district" label="District"
                                  fullWidth variant="outlined" error={!ErrorMessage("district")}
                                  helperTest={ 
                                      <ErrorMessage>
                                          { (msg)=><span className="text-red-600">{msg}</span>}
                                      </ErrorMessage>
                                  }>
                                  
                              </Field>
                          </Grid>
                          <Grid item xs={6}>
                              <Field as={TextField} name="pincode" label="Pincode"
                                  fullWidth variant="outlined" error={!ErrorMessage("pincode")}
                                  helperTest={ 
                                      <ErrorMessage>
                                          { (msg)=><span className="text-red-600">{msg}</span>}
                                      </ErrorMessage>
                                  }>
                                  
                              </Field>
                          </Grid>
                          <Grid item xs={12}>
                              <Field as={TextField} name="city" label="City"
                                  fullWidth variant="outlined" error={!ErrorMessage("city")}
                                  helperTest={ 
                                      <ErrorMessage>
                                          { (msg)=><span className="text-red-600">{msg}</span>}
                                      </ErrorMessage>
                                  }>
                                  
                              </Field>
                          </Grid>
                          <Grid item xs={12}>
                              <Button fullWidth variant="contained" type="submit" color="primary"> Deliver Here</Button>
                          </Grid>
                          </Grid>
                          </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
