import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { categorizeIngredients } from "../util/categorizeIngredients";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, findCart, updateCartItem } from "../state/cart/Action";
 
const MenuCard = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const cartItems = useSelector(state => state.cart.cartItems);


  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const handleCheckBoxChange = (value) => {
    console.log("i check this : "+value);
    if (selectedIngredients.includes(value)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !==(value)));
    } else {
      setSelectedIngredients([...selectedIngredients, value]);
    }
  };


  const handleAddToCart = (e) => { 
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const reqData = {
      token: jwt,
      cartItem: {
        foodId: item.id, 
        quantity: 1,
        ingredients: selectedIngredients,
      }
    };
    console.log(cartItems)
    const ExistingCartItem = cartItems.filter(cartItem => cartItem.food.id === reqData.cartItem.foodId);
    console.log(ExistingCartItem);
    if (ExistingCartItem.length!==0) {
      const data = { cartItemId: ExistingCartItem[0].id, quantity: ExistingCartItem[0].quantity+1 };
      dispatch(updateCartItem({ data, jwt }));
        console.log("update cart request :", data);
    } else {
        dispatch(addItemToCart(reqData));
        console.log("get add cart request :", reqData.cartItem);
    }
}

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt=""
            />

            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>{item.price} NT</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizeIngredients(item.ingredients)).map(
              (category) => (
                <div>
                  <p>{category}</p>
                  <FormGroup>
                    {categorizeIngredients(item.ingredients)[category].map(
                      (ingredient) => (
                        <FormControlLabel
                          key={ingredient.id}
                          control={
                            <Checkbox
                              onChange={() => handleCheckBoxChange(ingredient.name)}
                            />
                          }
                          label={ingredient.name}
                        />
                      )
                    )}
                  </FormGroup>
                </div>
              )
            )}
          </div>
          <div className="pt-5">
            <Button variant="contained" disabled={false} type="submit">
              {true ? "Add to cart" : "Out of stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
