import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_ADD_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_ADD_REVIEW_REQUEST,
    PRODUCT_ADD_REVIEW_SUCCESS,
    PRODUCT_ADD_REVIEW_FAIL,
    PRODUCT_ADD_REVIEW_RESET,
    PRODUCT_TOP_RATED_REQUEST,
    PRODUCT_TOP_RATED_SUCCESS,
    PRODUCT_TOP_RATED_FAIL,
    PRODUCT_BY_TIME_REQUEST,
    PRODUCT_BY_TIME_SUCCESS,
    PRODUCT_BY_TIME_FAIL
} from "../Constants/productConstants"

export const productReducer = (state = {products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL: 
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = {product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL: 
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL: 
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productAddReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_ADD_REQUEST:
            return { loading: true }
        case PRODUCT_ADD_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_ADD_FAIL: 
            return { loading: false, error: action.payload }
        case PRODUCT_ADD_RESET:
            return { }
        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: { } }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL: 
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productAddReviewReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_ADD_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_ADD_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_ADD_REVIEW_FAIL: 
            return { loading: false, error: action.payload }
        case PRODUCT_ADD_REVIEW_RESET:
            return { }
        default:
            return state
    }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_RATED_REQUEST:
            return { products: [] }
        case PRODUCT_TOP_RATED_SUCCESS:
            return { products: action.payload }
        case PRODUCT_TOP_RATED_FAIL: 
            return { error: action.payload }
        default:
            return state
    }
}

export const productByTimeReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_BY_TIME_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_BY_TIME_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_BY_TIME_FAIL: 
            return { loading: false, error: action.payload }
        default:
            return state
    }
}