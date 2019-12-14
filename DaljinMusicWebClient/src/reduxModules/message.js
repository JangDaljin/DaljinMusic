import { createAction , handleActions } from 'redux-actions'
import { List , fromJS } from 'immutable'
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

export const REMOVE_MESSAGE_BY_KEY = 'msg/REMOVE_MESSAGE_BY_KEY'
export const removeMessageByKey = createAction(REMOVE_MESSAGE_BY_KEY)

export const REMOVE_MESSAGE_BY_INDEX = 'msg/REMOVE_MESSAGE_BY_INDEX'
export const removeMessageByIndex = createAction(REMOVE_MESSAGE_BY_INDEX)

export const REMOVE_MESSAGE_ALL = 'msg/REMOVE_MESSAGE_ALL'
export const removeMessageAll = createAction(REMOVE_MESSAGE_ALL)



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
        newState.queue = newState.queue.push(fromJS(action.payload))
        return newState
    },

    [REMOVE_MESSAGE_BY_KEY] : (state , action) => {
        const newState = { ...state }
        const key = action.payload
        const index = newState.queue.findIndex(value => value.get('key') === key)
        if(index !== -1) {
            newState.queue = newState.queue.splice(index , 1)
        }
        return newState
    },

    [REMOVE_MESSAGE_BY_INDEX] : (state , action) => {
        const newState = { ...state }
        const index = action.payload
        newState.queue = newState.queue.splice(index , 1)
        return newState
    },

    [REMOVE_MESSAGE_ALL] : (state , aciton) => {
        const newState = { ...state }
        newState.queue = newState.queue.clear()
        return newState
    }
} , messageInitialState)

function* addMessageSaga(action) {
    const content = action.payload
    const key = Date.now() + parseInt(Math.random() * 1000) // 랜덤값 생성

    yield put({type : APPLY_MESSAGE , payload : { 'key' : key , 'content' : content }})
    yield delay(5000)
    yield put({ type : REMOVE_MESSAGE_BY_KEY , payload : key })
}

export function* messageSaga() {
    yield takeEvery(ADD_MESSAGE , addMessageSaga)
}