import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from "../types"

const initialState = {
    profile: null,
    error: null,
    loading: true,
    profiles: [],
    repos: []
}

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {

        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false,
                error: payload,
                repos: []
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: true,
                repos: []
            }

        default:
            return state
    }
}

export default profileReducer