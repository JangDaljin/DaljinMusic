import { createAction , handleActions } from 'redux-actions'




export const WINDOW_RESIZE = 'window/RESIZE'
export const windowResize = createAction(WINDOW_RESIZE)


const windowInitialState = {
    width : 0,
    height : 0,
}

export const windowReducer = handleActions({
    [WINDOW_RESIZE] : (state , action) => {
        const newState = { ...state }
        const { width , height } = action.payload
        newState.width = width
        newState.height = height

        console.log(`width : ${width} height : ${height}`)
        return newState
    }
} , windowInitialState)