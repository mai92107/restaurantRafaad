import * as actionType from "./ActionType";


const initialState = {
    loading: false,
    orders: [],
    error: null,
    notifications:[]
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_USERS_ORDERS_REQUEST:
            return { ...state, error: null, loading: true };
        case actionType.GET_USERS_ORDERS_SUCCESS:
            return { ...state, error: null, loading: false, orders: action.payload };
        case actionType.GET_USERS_NOTIFICATION_SUCCESS:
            return { ...state, notifications: action.payload, error: null, loading: false };
        case actionType.GET_USERS_ORDERS_FAILURE:
            return { ...state, error: action.payload, loading: false };
        
        default:
            return state;
    }
}