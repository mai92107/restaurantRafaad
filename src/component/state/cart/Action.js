import { api } from '../../config/Api';
import { ADD_ITEMS_TO_CART_FAILURE, ADD_ITEMS_TO_CART_REQUEST, ADD_ITEMS_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS, UPDATE_CARTITEM_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCCESS } from './ActionType';



export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const response = await api.get(`/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
            console.log("find cart success", response.data);
        } catch (error) {
            dispatch({ type: FIND_CART_FAILURE, payload: error });
            console.log("error", error);
        }
    }
}

export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
        try {
            const response = await api.get(`/api/carts/${reqData.cartId}/items`, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            });
            dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
            console.log("get cart items", response.data);
        } catch (error) {
            dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
            console.log("error", error);
        }
    }
}

export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEMS_TO_CART_REQUEST });
        try {

            const { data } = await api.put("/api/cart/add", reqData.cartItem, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                }
            });
            dispatch({ type: ADD_ITEMS_TO_CART_SUCCESS, payload: data });
            console.log("add item to cart", data);
        } catch (error) {
            dispatch({ type: ADD_ITEMS_TO_CART_FAILURE, payload: error });
            console.log("error", error);
        }
    }
}

export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CARTITEM_REQUEST });
        try {
            const {data} = await api.post(`/api/cart-item/update`,reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
            });
            dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
            console.log("update cart items", data);
        } catch (error) {
            dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error });
            console.log("error", error);
        }
    }
}

export const removeCartItem = ({cartItemId,jwt}) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CARTITEM_REQUEST });
        try {
            const {data} = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
            console.log("remove cart items", cartItemId);
        } catch (error) {
            dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error });
            console.log("error", error);
        }
    }
}

export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({ type: CLEAR_CART_REQUEST });
        try {
            const {data} = await api.put(`/api/cart/clear`,{}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            });
            dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
            console.log("clear cart", data);
        } catch (error) {
            dispatch({ type: CLEAR_CART_FAILURE, payload: error });
            console.log("error", error);
        }
    }
}