import {
  ADD_TO_CART,
  GET_CURRENT_USER_CART,
  GET_CURRENT_USER_CART_FAIL,
  GET_CURRENT_USER_CART_REQUEST,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  UPDATE_ITEM_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case GET_CURRENT_USER_CART_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ADD_TO_CART:
      return {
        ...state,

        totalItem: action.payload.totalItem,
        totalPrices: action.payload.totalPrices,
        cartItems: action.payload.products
      };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        totalItem: action.payload.totalItem,
        totalPrices: action.payload.totalPrices,
        cartItems: action.payload.products,
      };

    case GET_CURRENT_USER_CART:
      return {
        ...state,
        loading: false,
        totalItem: action.payload.totalItem,
        totalPrices: action.payload.totalPrices,
        cartItems: action.payload.products ? action.payload.products : [],
      };
    case GET_CURRENT_USER_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_ITEM_CART:
      return {
        ...state,
        totalItem: action.payload.totalItem,
        totalPrices: action.payload.totalPrices,
        cartItems: action.payload.products,
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
