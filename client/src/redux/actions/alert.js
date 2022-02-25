import { SET_ALERT, REMOVE_ALERT } from '../types'
import { v4 } from 'uuid'


export const setAlert = (message, type) => {
    return dispatch => {
        const id = v4()
        const action = {
            type: SET_ALERT,
            payload: {
                id,
                message,
                type
            }
        }
        dispatch(action)

        setTimeout(() => {
            return dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, 3000)
    }
}
