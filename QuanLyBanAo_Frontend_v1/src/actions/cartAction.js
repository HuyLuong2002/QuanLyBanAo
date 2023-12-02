import { ADD_TO_CART, GET_CURRENT_USER_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO, UPDATE_ITEM_CART } from '../constants/cartConstants';
import axios from 'axios';

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    // const { data } = await axios.get(`/api/v1/product/${id}`);
    const { data } = await axios.post(`http://localhost:8081/api/v1/cart/add?id=${id}&quantity=${quantity}`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: id,
            products: data.cart.cartItem,
            totalItem: data.cart.totalItems,
            totalPrices: data.cart.totalPrices
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART cdsacsad
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    // const { data } = await axios.get(`/api/v1/product/?id=${id}}`);
    const { data } = await axios.post(`http://localhost:8081/api/v1/cart/update-cart?action=delete&id=${id}`);

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: {
            products: data.cart.cartItem,
            totalItem: data.cart.totalItems,
            totalPrices: data.cart.totalPrices
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
};

// GET CURRRENT USER CART
export const getCurrentUserCart = () => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:8081/api/v1/cart/getUserCart`);

    dispatch({
        type: GET_CURRENT_USER_CART,
        payload: {
            products: data?.cart?.cartItem,
            totalItem: data?.cart?.totalItems,
            totalPrices: data?.cart?.totalPrices
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// UPDATE ITEM CART
export const updateItemCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.post(`http://localhost:8081/api/v1/cart/update-cart?action=update&quantity=${quantity}&id=${id}`);
    dispatch({
        type: UPDATE_ITEM_CART,
        payload: {
            products: data.cart.cartItem,
            totalItem: data.cart.totalItems,
            totalPrices: data.cart.totalPrices
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


// CHECKOUT
export const checkout = (paymentMethod = "CASH", notes = "") => async () => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    await axios.post(`/api/v1/cart/check-out`, { paymentMethod, notes }, config);
    resetCart()
    
    localStorage.setItem('cartItems', JSON.stringify([]));
}


// Reset cart 
export const resetCart = () => async () => {
    await axios.get(`/api/v1/cart/reset`);
    localStorage.setItem('cartItems', JSON.stringify([]));
}

