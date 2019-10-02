import { createAction , handleActions } from 'redux-actions'

export const FETCH_GET_MORE = 'top100/GET_MORE'
export const ACCEPT_GET_MORE = 'top100/ACCEPT_GET_MORE'
export const ABORT_GET_MORE = 'top100/ABORT_GET_MORE'

export const fetchGetMore = createAction(ACCEPT_GET_MORE)


const initialState = {
    list : []
}


/*
    payload : [
        {
            singer : ''
            song : ''
            album : ''
            time : ''
            category : ''
        },
        ...
    ]
*/
export default handleActions({
    [ACCEPT_GET_MORE] : (state , action) => {
        const newState = { ...state }
        
        
        return newState
    },

    [ABORT_GET_MORE] : (state , action) => {
        const newState = { ...state }
        
        return newState
    },


} , initialState)
