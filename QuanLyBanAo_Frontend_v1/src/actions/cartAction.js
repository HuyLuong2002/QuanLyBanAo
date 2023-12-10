import { ADD_TO_CART, CHECKOUT_FAIL, CHECKOUT_ONL_FAIL, CHECKOUT_ONL_REQUEST, CHECKOUT_ONL_SUCCESS, CHECKOUT_REQUEST, CHECKOUT_SUCCESS, GET_CURRENT_USER_CART, GET_CURRENT_USER_CART_FAIL, GET_CURRENT_USER_CART_REQUEST, PAYMENT_ONL_FAIL, PAYMENT_ONL_REQUEST, PAYMENT_ONL_SUCCESS, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO, UPDATE_ITEM_CART } from '../constants/cartConstants';
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
    

    try {
        dispatch({
            type: GET_CURRENT_USER_CART_REQUEST
        });
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
    } catch (error) {
        dispatch({ type: GET_CURRENT_USER_CART_FAIL, payload: error.response?.data?.message });
    }

   
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
export const checkout = (paymentMethod = "CASH", notes = "") => async (dispatch) => {

    try {
        dispatch({ type: CHECKOUT_REQUEST });


        const config = { headers: { 'Content-Type': 'application/json' } };
        const {data} = await axios.post(`/api/v1/cart/check-out`, { paymentMethod, notes }, config);
        resetCart()

        dispatch({ type: CHECKOUT_SUCCESS, payload: data?.success });
        
    } catch (error) {
        dispatch({
            type: CHECKOUT_FAIL,
            payload: error.response?.data?.message,
        });
    }

    localStorage.setItem('cartItems', JSON.stringify([]));
}

// CHECKOUT
export const checkoutOnl = (paymentMethod = "BANKING", notes = "") => async (dispatch) => {
    try {
        dispatch({ type: CHECKOUT_ONL_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };
        const {data} = await axios.post(`http://localhost:8081/api/v1/cart/pay`, { paymentMethod, notes }, config);

        dispatch({ type: CHECKOUT_ONL_SUCCESS, payload: data?.success });
        
    } catch (error) {
        dispatch({
            type: CHECKOUT_ONL_FAIL,
            payload: error.response?.data?.message,
        });
    }

    localStorage.setItem('cartItems', JSON.stringify([]));
}

export const paymentSuccess = (paymentId, token, PayerID) => async (dispatch) => {
    try {
        dispatch({ type: PAYMENT_ONL_REQUEST });

        const {data} = await axios.post(`http://localhost:8081/api/v1/cart/pay/success?paymentId=${paymentId}&token=${token}&PayerID=${PayerID}`);

        dispatch({ type: PAYMENT_ONL_SUCCESS, payload: data?.success });
        
    } catch (error) {
        dispatch({
            type: PAYMENT_ONL_FAIL,
            payload: error.response?.data?.message,
        });
    }
}

// Reset cart 
export const resetCart = () => async () => {
    await axios.get(`/api/v1/cart/reset`);
    localStorage.setItem('cartItems', JSON.stringify([]));
}