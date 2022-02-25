import axios from 'axios';
import { ADD_COMMENT, EDIT_COMMENT, CREATE_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES, UPDATE_POST } from '../types';
import { setAlert } from './alert'

export const getPosts = () => {
    return async dispatch => {
        try {
            const response = await axios.get('/posts/all')
            dispatch({
                type: GET_POSTS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}

export const getPost = (post_id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/posts/${post_id}`)
            dispatch({
                type: GET_POST,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}

export const getMyPosts = () => {
    return async dispatch => {
        try {
            const response = await axios.get('/posts/my')
            dispatch({
                type: GET_POSTS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}


export const getUserPosts = (user_id) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/posts/${user_id}`)
            dispatch({
                type: GET_POSTS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}


export const createPost = data => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            const response = await axios.post('/posts/create', body, config)
            dispatch({
                type: CREATE_POST,
                payload: response.data
            })
            dispatch(setAlert('Post created', 'success'))
            return "Success"
        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}


export const editPost = (data, post_id) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            const response = await axios.put(`/posts/update/${post_id}`, body, config)
            dispatch({
                type: UPDATE_POST,
                payload: response.data
            })
            dispatch(setAlert('Post updated', 'success'))
            return "Success"
        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}


export const deletePost = post_id => {
    return async dispatch => {
        try {
            const response = await axios.delete(`/posts/delete/${post_id}`)
            // console.log(response)
            dispatch({
                type: DELETE_POST,
                payload: response.data
            })
            dispatch(setAlert('Post deleted', 'success'))
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}

export const likePost = (post_id) => {
    return async dispatch => {
        try {
            const response = await axios.put(`/posts/like/${post_id}`)
            console.log(response)
            dispatch({
                type: UPDATE_LIKES,
                payload: { post_id, likes: response.data }
            })
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}


export const dislikePost = post_id => {
    return async dispatch => {
        try {
            const response = await axios.put(`/posts/dislike/${post_id}`)
            console.log(response)
            dispatch({
                type: UPDATE_LIKES,
                payload: { post_id, likes: response.data }
            })
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}

export const addComment = (post_id, data) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            const response = await axios.post(`/posts/comment/${post_id}`, body, config)
            console.log(response.data)
            dispatch({
                type: ADD_COMMENT,
                payload: { post_id, comments: response.data }
            })

        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}


export const removeComment = (post_id, comment_id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`/posts/comment/${post_id}/${comment_id}`)
            dispatch({
                type: REMOVE_COMMENT,
                payload: { post_id, comments: response.data }
            })
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}


export const editComment = (post_id, comment_id, data) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data)
            const response = await axios.put(`/posts/comment/${post_id}/${comment_id}`, body, config)
            console.log(response.data)
            dispatch({
                type: EDIT_COMMENT,
                payload: { post_id, comments: response.data }
            })

        } catch (error) {
            const errors = error.response.data.errors
            console.log(errors)
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'error')))
            }
            dispatch({
                type: POST_ERROR,
                payload: {
                    message: error.response.statusText,
                    status: error.response.status
                }
            })
            return "Error"
        }
    }
}