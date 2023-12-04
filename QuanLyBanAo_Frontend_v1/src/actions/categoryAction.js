import axios from 'axios';

import {
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL
} from '../constants/categoryConstant';



// Create Product
// export const createProduct = (productData) => async (dispatch) => {
//     try {
//         dispatch({ type: NEW_PRODUCT_REQUEST });
//
//         const config = {
//             headers: { 'Content-Type': 'application/json' },
//         };
//
//         const { data } = await axios.post(`http://localhost:8081/api/v1/products/create`, productData, config);
//
//         dispatch({
//             type: NEW_PRODUCT_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: NEW_PRODUCT_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };
//
// Update Supplier
export const updateCategory = (id, categoryData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });

        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        const { data } = await axios.put(`/api/v1/categories/${id}`, categoryData, config);

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Supplier Details
export const getCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/categories/${id}`);
        console.log(data);
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data.category,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Category
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const { data } = await axios.put(`/api/v1/categories/delete/${id}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.message,
        });
    }
};
