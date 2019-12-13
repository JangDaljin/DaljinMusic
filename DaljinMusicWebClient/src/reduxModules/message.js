import { createAction , handleActions } from 'redux-actions'
import { List } from 'immutable'
import { takeEvery , put , delay } from 'redux-saga/effects'

export const MINIMIZE = 'msg/MINIMIZE'
export const minimize = createAction(MINIMIZE)

export const NORMALIZE = 'msg/NORMALIZE'
export const normalize = createAction(NORMALIZE)

export const ADD_MESSAGE = 'msg/ADD_MESSAGE'
export const addMessage = createAction(ADD_MESSAGE)

//내부사용
export const APPLY_MESSAGE = 'msg/APPLY_MESSAGE'
export const applyMessage = createAction(APPLY_MESSAGE)

export const REMOVE_MESSAGE = 'msg/REMOVE_MESSAGE'
export const removeMessage = createAction(REMOVE_MESSAGE)



const messageInitialState = {
    queue : List(),
    visible : true,
}

export const messageReducer = handleActions({
    [MINIMIZE] : (state , action) => {
        const newState = { ...state }
        newState.visible = false
        console.log(`minimize`)
        return newState
    },

    [NORMALIZE] : (state , action) => {
        const newState = { ...state }
        newState.visible = true
        return newState
    },

    [APPLY_MESSAGE] : (state , action) => {
        const newState = { ...state }
        newState.queue = newState.queue.push(action.payload)
        return newState
    },

    [REMOVE_MESSAGE] : (state , action) => {
        const newState = { ...state }
        const index = action.payload
        if(typeof index == 'number') {
            newState.queue = newState.queue.splice(index , 1)
        }
        else {
            newState.queue = newState.queue.shift()
        }
        return newState
    },
} , messageInitialState)

function* addMessageSaga(action) {
    yield put({type : APPLY_MESSAGE , payload : action.payload})
    yield delay(5000)
    yield put({type : REMOVE_MESSAGE})
}

export function* messageSaga() {
    yield takeEvery(ADD_MESSAGE , addMessageSaga)
}