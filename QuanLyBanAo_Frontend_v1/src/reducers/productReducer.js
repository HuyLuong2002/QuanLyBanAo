import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS,
    GET_CATE_REQUEST,
    GET_CATE_SUCCESS,
    GET_CATE_FAIL,
    SUPPLIER_REQUEST,
    SUPPLIER_SUCCESS,
    SUPPLIER_FAIL,
} from '../constants/productConstants';
import {
    DELETE_SUPPLIER_FAIL,
    DELETE_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_RESET,
    DELETE_SUPPLIER_SUCCESS, SUPPLIER_DETAILS_FAIL, SUPPLIER_DETAILS_REQUEST, SUPPLIER_DETAILS_SUCCESS,
    UPDATE_SUPPLIER_FAIL,
    UPDATE_SUPPLIER_REQUEST,
    UPDATE_SUPPLIER_RESET,
    UPDATE_SUPPLIER_SUCCESS
} from "../constants/supplierConstant";

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload?.filteredProductsCount,
            };

        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            };
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const productDetailsReducer = (state = { product: {}, related: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                related: action.payload.related,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const supplierDetailsReducer = (state = { supplier: {} }, action) => {
    switch (action.type) {
        case SUPPLIER_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case SUPPLIER_DETAILS_SUCCESS:
            return {
                loading: false,
                supplier: action.payload,
            };
        case SUPPLIER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload,
            };
        case ALL_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const suppliersReducer = (state = { suplliers: []}, action) => {
    switch (action.type) {
        case SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                suplliers: action.payload,
            };
        case SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const supplierReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_SUPPLIER_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            };
        case DELETE_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case DELETE_SUPPLIER_RESET:
            return {
                ...state,
                success: false,
            };
        case UPDATE_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_SUPPLIER_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_SUPPLIER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        default:
            return state;
    }
};

export const categoriesReducer = (state = {categories: []}, action) => {
    switch (action.type) {
        case GET_CATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CATE_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        case GET_CATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};