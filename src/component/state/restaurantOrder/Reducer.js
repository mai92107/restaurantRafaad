import * as actionType from "./ActionType"

const initialState = {
    loading: false,
    error: null,
    orders: []
};

export const restaurantsOrderReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionType.GET_RESTAURANTS_ORDER_REQUEST:
        case actionType.UPDATE_ORDER_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case actionType.GET_RESTAURANTS_ORDER_SUCCESS:
            return { ...state, loading: false, orders: action.payload };
        case actionType.UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state, loading: false, orders: state.orders.map(
                    (order) => order.id === action.payload.id ? action.payload : order
                )
            };
        case actionType.GET_RESTAURANTS_ORDER_FAILURE:
        case actionType.UPDATE_ORDER_STATUS_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }

};