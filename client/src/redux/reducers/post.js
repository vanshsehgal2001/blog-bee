import { CLEAR_POST, REMOVE_COMMENT, ADD_COMMENT, CREATE_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES, UPDATE_POST, EDIT_COMMENT } from "../types"

const initialState = {
    post: null,
    posts: [],
    loading: true,
    errors: []
}

const postReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_POST:
            return {
                ...state,
                post: payload[0],
                loading: false
            }

        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
                // post: null
            }

        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
                loading: false
            }

        case UPDATE_POST:
            const index = state.posts.findIndex(post => post._id == payload._id)
            let newPosts = [...state.posts]
            newPosts[index] = payload
            return {
                ...state,
                posts: newPosts,
                loading: false
            }

        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id == payload.post_id ? { ...post, likes: payload.likes } : post),
                loading: false
            }

        case ADD_COMMENT:
        case EDIT_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload.comments },
                // posts: state.posts.map(post => post._id == payload.post_id ? { ...post, comments: payload.comments } : post),
                loading: false
            }

        case REMOVE_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload.comments },
                loading: false
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id != payload._id),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                // post: null,
                // posts: [],
                errors: payload
            }
        case CLEAR_POST:
            return {
                ...state,
                post: null,
                loading: true
            }


        default:
            return state
    }
}

export default postReducer