import axios from 'axios'
import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from '../types'
import { setAlert } from '../actions/alert'

export const getLoggedinUserProfile = () => {
    return async dispatch => {
        try {
            const response = await axios.get('/profile/my')
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}

export const createUpdateProfile = (data, edit) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            const response = await axios.post('/profile/createUpdate', body, config)
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
            dispatch(
                setAlert(edit ? 'Profile updated' : 'Profile created', 'success')
            )
            return "Success"
        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}

export const addEducation = (data) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            const response = await axios.post('/profile/education', body, config)
            dispatch({
                type: UPDATE_PROFILE,
                payload: response.data
            })
            dispatch(
                setAlert('Education added', 'success')
            )
            return "Success"
        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}


export const addExperience = (data) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            const response = await axios.post('/profile/experience', body, config)
            dispatch({
                type: UPDATE_PROFILE,
                payload: response.data
            })
            dispatch(
                setAlert('Experience added', 'success')
            )
            return "Success"
        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}

export const editEducation = (data, id) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            const response = await axios.put(`/profile/education/${id}`, body, config)
            dispatch({
                type: UPDATE_PROFILE,
                payload: response.data
            })
            dispatch(
                setAlert('Education updated', 'success')
            )
            return "Success"
        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}


export const editExperience = (data, id) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            const response = await axios.put(`/profile/experience/${id}`, body, config)
            dispatch({
                type: UPDATE_PROFILE,
                payload: response.data
            })
            dispatch(
                setAlert('Experience updated', 'success')
            )
            return "Success"
        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}

export const deleteEducation = id => {
    return async dispatch => {
        try {
            const response = await axios.delete(`/profile/education/${id}`)
            console.log(response.data)
            dispatch({
                type: UPDATE_PROFILE,
                payload: response.data
            })
            dispatch(
                setAlert('Education deleted', 'success')
            )
            return "Success"
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}


export const deleteExperience = id => {
    return async dispatch => {
        try {
            const response = await axios.delete(`/profile/experience/${id}`)
            console.log(response.data)
            dispatch({
                type: UPDATE_PROFILE,
                payload: response.data
            })
            dispatch(
                setAlert('Experience deleted', 'success')
            )
            return "Success"
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}

export const getProfiles = () => {
    return async dispatch => {
        dispatch({
            type: CLEAR_PROFILE
        })
        try {
            const response = await axios.get('/profile/profiles')
            dispatch({
                type: GET_PROFILES,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}

export const getProfile = id => {
    return async dispatch => {
        try {
            const response = await axios.get(`/profile/${id}`)
            console.log(response.data)
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}

export const getRepos = username => {
    return async dispatch => {
        try {
            const response = await axios.get(`/profile/github/${username}`)
            dispatch({
                type: GET_REPOS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}