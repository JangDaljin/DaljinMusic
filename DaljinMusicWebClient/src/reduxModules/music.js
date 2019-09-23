import { createAction , handleActions } from './node_modules/redux-actions'

export const PLAY = 'music/PLAY'
export const PAUSE = 'music/PAUSE'
export const PREV = 'music/PREV'
export const NEXT = 'music/NEXT'


export const play = createAction(PLAY)
export const pause = createAction(PAUSE)
export const prev = createAction(PREV)
export const next = createAction(NEXT)


const initialState = {
    isPlaying: false,
    previous : {
        singer : '',
        song : '',
        album : '',
        time : ''
    },
    current : {
        singer : '',
        song : '',
        album : '',
        time : ''
    },
    next : {
        singer : '',
        song : '',
        album : '',
        time : ''
    }
}

export default handleActions({
    [PLAY] : (state , action) => {
        const newState = { ...state }
        newState.isPlaying = true;
        return newState
    },
    [PAUSE] : (state , action) => {
        const newState = { ...state }
        newState.isPlaying = false;
        return newState
    },
    [PREV] : (state, action) => {
        const newState = { ...state }
        
        return newState
    },
    [NEXT] : (state , action) => {
        const newState = { ...state }
        
        return newState
    }
} , initialState)
