import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOAD_SUCCESS, USER_LOAD_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    loading: true
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    // console.log(payload)
    switch (type) {

        case USER_LOAD_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false
            }

        case REGISTER_FAIL:
        case USER_LOAD_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }

        default:
            return state
    }
}

export default authReducer