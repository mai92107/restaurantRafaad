import { api } from "../../config/Api";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENT_FAILURE,
  GET_ALL_EVENT_REQUEST,
  GET_ALL_EVENT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_FOOD_BY_CATEGORY_FAILURE,
  GET_FOOD_BY_CATEGORY_REQUEST,
  GET_FOOD_BY_CATEGORY_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_EVENT_FAILURE,
  GET_RESTAURANT_EVENT_REQUEST,
  GET_RESTAURANT_EVENT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType";

export const getAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
    try {
      const { data } = await api.get("/api/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
      console.log("all restaurants", data);
    } catch (error) {
      dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const response = await api.get(
        `/api/restaurants/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("已獲得資料");
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
      console.log("restaurant :", response.data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const getRestaurantByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/restaurants/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
      console.log("get restaurant by user id :", data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const createRestaurant = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
      console.log("create restaurant", data);
    } catch (error) {
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/restaurants/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
      console.log("update restaurant :", res.data);
    } catch (error) {
      dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const deleteRestaurant = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      const res = await api.delete(`/api/admin/restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: res.restaurantId });
      console.log("delete restaurant :", res.data);
    } catch (error) {
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/restaurants/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
      console.log("update restaurant :", res.data);
    } catch (error) {
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const createEventAction = ({ data, jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENT_REQUEST });
    try {
      const res = await api.post(
        `/api/admin/events/restaurant/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data });
      console.log("create event", res.data);
    } catch (error) {
      dispatch({ type: CREATE_EVENT_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const getAllEvents = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENT_REQUEST });
    try {
      const res = await api.get(`/api/users/events`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_ALL_EVENT_SUCCESS, payload: res.data });
      console.log("get all events", res.data);
    } catch (error) {
      dispatch({ type: GET_ALL_EVENT_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};

export const deleteEventAction = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENT_REQUEST });
    try {
      const res = await api.delete(`/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
      console.log("delete event :", eventId);
    } catch (error) {
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const getRestaurantEvents = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_EVENT_REQUEST });
    try {
      const res = await api.get(
        `/api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANT_EVENT_SUCCESS, payload: res.data });
      console.log("get restaurant events", res.data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_EVENT_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const res = await api.post(`/api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
      console.log("create category", res.data);
    } catch (error) {
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const getRestaurantsCategory = ({ jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/category/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data });
      console.log("get restaurant category", res.data);
    } catch (error) {
      dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};
export const deleteCategory = ({ categoryId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
      const res = await api.delete(`/api/admin/restaurants/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: res.data });
      console.log("delete category :", res.data);
    } catch (error) {
      dispatch({ type: DELETE_CATEGORY_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};

export const getFoodByCategory = ({ jwt, categoryId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_FOOD_BY_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/admin/food/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_FOOD_BY_CATEGORY_SUCCESS, payload: res.data });
      console.log("get foods by category", res.data);
    } catch (error) {
      dispatch({ type: GET_FOOD_BY_CATEGORY_FAILURE, payload: error });
      console.log("error : ", error);
    }
  };
};

