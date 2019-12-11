import { createAction , handleActions } from 'redux-actions'
import { List } from 'immutable'
import { takeEvery , put , delay } from 'redux-saga/effects'

export const ADD_MESSAGE = 'msg/ADD_MESSAGE'
export const addMessage = createAction(ADD_MESSAGE)

export const APPLY_MESSAGE = 'msg/APPLY_MESSAGE'
export const applyMessage = createAction(APPLY_MESSAGE)

export const REMOVE_MESSAGE = 'msg/REMOVE_MESSAGE'
export const removeMessage = createAction(REMOVE_MESSAGE)

const messageInitialState = {
    queue : List()
}

export const messageReducer = handleActions({
    [APPLY_MESSAGE] : (state , action) => {
        const newState = { ...state }
        newState.queue = newState.queue.push(action.payload)
        return newState
    },

    [REMOVE_MESSAGE] : (state , action) => {
        const newState = { ...state }
        newState.queue = newState.queue.shift()
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