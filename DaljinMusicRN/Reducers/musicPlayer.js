import { createAction , handleActions } from 'redux-actions'
import { List , Map, fromJS } from 'immutable'
import { takeLatest , put} from 'redux-saga/effects'
import { post } from './Request/request'

export const PLAY = 'mp/PLAY'
export const play = createAction(PLAY)

export const PAUSE = 'mp/PAUSE'
export const pause = createAction(PAUSE)

export const FETCH_GET_PLAYLIST = 'mp/FETCH_GET_PLAYLIST'
export const fetchGetPlayList = createAction(FETCH_GET_PLAYLIST)

export const ACCEPT_GET_PLAYLIST = 'mp/ACCEPT_GET_PLAYLIST'
export const acceptGetPlayList = createAction(ACCEPT_GET_PLAYLIST)

export const ABORT_GET_PLAYLIST = 'mp/ABORT_GET_PLAYLIST'
export const abortGetPlayList = createAction(ABORT_GET_PLAYLIST)

export const FETCH_PLAYLIST_ITEM_ADD = 'mp/FETCH_PLAYLIST_ITEM_ADD'
export const fetchPlayListItemAdd = createAction(FETCH_PLAYLIST_ITEM_ADD)

export const ACCEPT_PLAYLIST_ITEM_ADD = 'mp/ACCEPT_PLAYLIST_ITEM_ADD'
export const acceptPlayListItemAdd = createAction(ACCEPT_PLAYLIST_ITEM_ADD)

export const ABORT_PLAYLIST_ITEM_ADD = 'mp/ABORT_PLAYLIST_ITEM_ADD'
export const abortPlayListItemAdd = createAction(ABORT_PLAYLIST_ITEM_ADD)

export const PLAYLIST_ITEM_REMOVE = 'mp/PLAYLIST_ITEM_REMOVE'
export const playListItemRemove = createAction(PLAYLIST_ITEM_REMOVE)

export const FETCH_PLAYLIST_ITEM_REMOVE = 'mp/FETCH_PLAYLIST_ITEM_REMOVE'
export const fetchPlayListItemRemove = createAction(FETCH_PLAYLIST_ITEM_REMOVE)

export const ACCEPT_PLAYLIST_ITEM_REMOVE = 'mp/ACCEPT_PLAYLIST_ITEM_REMOVE'
export const acceptPlayListItemRemove = createAction(ACCEPT_PLAYLIST_ITEM_REMOVE)

export const ABORT_PLAYLIST_ITEM_REMOVE = 'mp/ABORT_PLAYLIST_ITEM_REMOVE'
export const abortPlayListItemRemove = createAction(ABORT_PLAYLIST_ITEM_REMOVE)

export const START_LOADING = 'mp/START_LOADING'
export const startLoading = createAction(START_LOADING)

export const END_LOADING = 'mp/END_LOADINg'
export const endLoading = createAction(END_LOADING)


const musicPlayerInitialState = {

    playList : List([]),// Map({ song : ### , album : ### , singer : ### , duration : ### , checked : ###})
    randomPlayList : List([]),

    isLoading : true,
}

export const musicPlayerReducer = handleActions({

    [ACCEPT_GET_PLAYLIST] : (state , action) => {
        //일반 리스트 생성
        const newState = { ...state }
        const { playList  , addedIndex } = action.payload


        playList.map(value => { value.checked = false; return value})
        newState.playList = newState.playList.clear().concat(fromJS(playList))
        newState.randomPlayList = newState.randomPlayList.clear()


        //랜덤리스트 생성
        let indexArray = Array(newState.playList.size)
        for(let i = 0 ; i < indexArray.length; i++) {
            indexArray[i] = i
        }
        
        for(let i = 0 ; i < newState.playList.size; i++) {
            const random = parseInt(Math.random() * indexArray.length)
            const randomIndex = indexArray[random]
            indexArray.splice(random , 1)

            newState.randomPlayList = newState.randomPlayList.push(newState.playList.get(randomIndex).set('index' , randomIndex))
            newState.playList = newState.playList.setIn([randomIndex , 'randomIndex'] , newState.randomPlayList.size-1)
        }

        //console.dir(newState.playList.toJS())
        //console.dir(newState.randomPlayList.toJS())

        return newState
    },

    [ABORT_GET_PLAYLIST] : (state , action) => {
        const newState = { ...state }
        return newState
    },

    [ACCEPT_PLAYLIST_ITEM_ADD] : (state , action) => {
        //일반 리스트 생성
        const newState = { ...state }
        const { addedPlayList } = action.payload
        
        addedPlayList.map(value => { value.checked = false; return value})
        newState.playList = newState.playList.concat(fromJS(addedPlayList))
        newState.randomPlayList = newState.randomPlayList.clear()


        //랜덤리스트 생성
        let indexArray = Array(newState.playList.size)
        for(let i = 0 ; i < indexArray.length; i++) {
            indexArray[i] = i
        }
        
        for(let i = 0 ; i < newState.playList.size; i++) {
            const random = parseInt(Math.random() * indexArray.length)
            const randomIndex = indexArray[random]
            indexArray.splice(random , 1)

            newState.randomPlayList = newState.randomPlayList.push(newState.playList.get(randomIndex).set('index' , randomIndex))
            newState.playList = newState.playList.setIn([randomIndex , 'randomIndex'] , newState.randomPlayList.size-1)
        }

        //console.dir(newState.playList.toJS())
        //console.dir(newState.randomPlayList.toJS())

        return newState
    },

    [ABORT_PLAYLIST_ITEM_ADD] : (state , action) => {
        const newState = { ...state }

        return newState
    },

    [PLAYLIST_ITEM_REMOVE] : (state , action) => {
        const newState = { ...state }
        const { removeList }= action.payload
        for(let cnt = removeList.length -1 ; cnt > -1; cnt--) {
            if(removeList[cnt] === newState.currentMusicIndex) {
                if(newState.currentMusicIndex === 0) {
                    if(newState.playList.size === 0) {
                        newState.currentMusicIndex = 0
                    }
                    newState.currentMusicIndex = 1
                }
                newState.currentMusicIndex = newState.currentMusicIndex -1 ;
            }
            newState.playList = newState.playList.splice(removeList[cnt] , 1)
        }
        return newState
    },

    [ACCEPT_PLAYLIST_ITEM_REMOVE] : (state , action) => {
        const newState = { ...state }       
        //할일 없음
        return newState
    },

    [ABORT_PLAYLIST_ITEM_REMOVE] : (state , action) => {
        const newState = { ...state }
        //할일 없음
        return newState
    },


    [START_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isLoading = true
        return newState
    },
    [END_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isLoading = false
        return newState
    }

}, musicPlayerInitialState)

function* fetchGetPlayListSaga(action) {
    yield put({ type : START_LOADING })
    yield post('/mymusic/getplaylist' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_PLAYLIST , ABORT_GET_PLAYLIST)
    yield put({ type : END_LOADING })
}

function* fetchPlayListItemAddSaga(action) {
    yield put({ type : START_LOADING })
    yield post('/mymusic/playlistitemadd' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_ADD , ABORT_GET_PLAYLIST)
    yield put({ type : END_LOADING })
}

function* fetchPlayListItemRemoveSaga(action) {
    yield put({ type : START_LOADING })
    yield put({type : PLAYLIST_ITEM_REMOVE , payload : action.payload})
    yield post('/mymusic/playlistitemremove' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_REMOVE , ABORT_PLAYLIST_ITEM_REMOVE)
    yield put({ type : END_LOADING })
}

export function* musicPlayerSaga () {
    yield takeLatest(FETCH_GET_PLAYLIST , fetchGetPlayListSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_ADD , fetchPlayListItemAddSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_REMOVE , fetchPlayListItemRemoveSaga)
}

