import { LOGOUT } from "../authentication/ActionType";
import * as actionType from "./ActionType";

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionType.FIND_CART_REQUEST:
        case actionType.GET_ALL_CART_ITEMS_REQUEST:
        case actionType.UPDATE_CARTITEM_REQUEST:
        case actionType.REMOVE_CARTITEM_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        
        case actionType.FIND_CART_SUCCESS:
        case actionType.CLEAR_CART_SUCCESS:
            return {
                ...state, loading: false, cart: action.payload, cartItems: action.payload.items
            };
        
        case actionType.ADD_ITEMS_TO_CART_SUCCESS:
            console.log('新增項目到購物車:', action.payload);
            const updatedCartItem = [action.payload, ...state.cartItems];
            const updatedTotalAdd = updatedCartItem.reduce((total, item) => {
                return total + item.food.price * item.quantity;
            }, 0);
    
            
            return {
                ...state, loading: false, cartItems: updatedCartItem, cart:{...state.cart, total:updatedTotalAdd}
            };
        
        case actionType.UPDATE_CARTITEM_SUCCESS:
            const updatedItems = state.cartItems.map(item => item.id === action.payload.id ? action.payload : item);
            const updatedTotalUpdate = updatedItems.reduce((total, item) => {
                return total + item.food.price * item.quantity;
            }, 0);
            
            return {
                ...state, loading: false, cartItems: updatedItems, cart: {...state.cart, total:updatedTotalUpdate}
            };
        
        case actionType.REMOVE_CARTITEM_SUCCESS:
            console.log('刪除項目:', action.payload);

            const filteredItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
            const updatedTotalRemove = filteredItems.reduce((total, item) => total + item.food.price * item.quantity, 0);
            return {
                ...state, loading: false, cartItems: filteredItems, cart: { ...state.cart, total: updatedTotalRemove }
            };
        
        case actionType.FIND_CART_FAILURE:
        case actionType.UPDATE_CARTITEM_FAILURE:
        case actionType.REMOVE_CARTITEM_FAILURE:
            return {
                ...state, loading: false, error: action.payload
            };

        case LOGOUT:
            localStorage.removeItem("jwt");
            return initialState;
        
        default:
            return state;
    }
};
export default cartReducer;