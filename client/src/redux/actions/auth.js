import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOAD_SUCCESS, USER_LOAD_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from '../types'
import axios from 'axios'
import { setAlert } from './alert'
import setToken from '../utils/setToken'

export const loadUser = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
        }

        try {
            const response = await axios.get('/auth');
            console.log(response)
            dispatch({
                type: USER_LOAD_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: USER_LOAD_ERROR
            })
        }

    }
}

export const register = (data) => {
    return async dispatch => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)

            const response = await axios.post('/users/register', body, config)
            console.log(response)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
            dispatch(setAlert("Registration successfull", "success"))
            dispatch(loadUser())
        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: REGISTER_FAIL
            })
        }
    }
}

export const login = (data) => {
    return async dispatch => {

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)

            const response = await axios.post('/auth/login', body, config)
            console.log(response)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
            dispatch(setAlert("Login successfull", "success"))
            dispatch(loadUser())

        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: LOGIN_FAIL
            })
        }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT
        })
        dispatch({
            type: CLEAR_PROFILE
        })
        dispatch(setAlert("Logout successfull", "success"))
    }
}