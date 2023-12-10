import axios from 'axios';

import {
    DELETE_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_FAIL,
    DELETE_SUPPLIER_SUCCESS,
    UPDATE_SUPPLIER_REQUEST,
    UPDATE_SUPPLIER_SUCCESS,
    UPDATE_SUPPLIER_FAIL,
    SUPPLIER_DETAILS_REQUEST, SUPPLIER_DETAILS_SUCCESS, SUPPLIER_DETAILS_FAIL
} from '../constants/supplierConstant';



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
export const updateSupplier = (id, supplierData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUPPLIER_REQUEST });

        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        const { data } = await axios.put(`/api/v1/suppliers/${id}`, supplierData, config);

        dispatch({
            type: UPDATE_SUPPLIER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_SUPPLIER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Supplier Details
export const getSupplierDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SUPPLIER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/suppliers/${id}`);
        console.log(data);
        dispatch({
            type: SUPPLIER_DETAILS_SUCCESS,
            payload: data.supplier,
        });
    } catch (error) {
        dispatch({
            type: SUPPLIER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Product
export const deleteSupplier = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SUPPLIER_REQUEST });

        const { data } = await axios.put(`http://localhost:8081/api/v1/suppliers/delete/${id}`);

        dispatch({
            type: DELETE_SUPPLIER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_SUPPLIER_FAIL,
            payload: error.response.data.message,
        });
    }
};