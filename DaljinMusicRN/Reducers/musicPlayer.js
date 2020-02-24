import { createAction , handleActions } from 'redux-actions'
import { List , Map, fromJS } from 'immutable'
import { takeLatest , put , select} from 'redux-saga/effects'
import { post } from './Request/request'
import { ToastAndroid } from 'react-native'

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

export const REMOTE_PLAY = 'mp/REMOTE_PLAY'
export const remotePlay = createAction(REMOTE_PLAY)

export const REMOTE_PLAY_INNER = 'mp/REMOTE_PLAY_INNER'
export const remotePlayInner = createAction(REMOTE_PLAY_INNER)

export const REMOTE_ADD_ITEMS_IN_PLAYLIST = 'mp/REMOTE_ADD_ITEMS_IN_PLAYLIST'
export const remoteAddItemsInPlaylist = createAction(REMOTE_ADD_ITEMS_IN_PLAYLIST)

export const REMOTE_RECEIVED = 'mp/REMOTE_RECEIVED'
export const remoteReceived = createAction(REMOTE_RECEIVED)

export const REMOTE_OP_CODE = {
    PLAY : 0,
}

export const START_ADD_ITEMS_IN_PLAYLIST_LOADING = 'mp/START_ADD_ITEMS_IN_PLAYLIST_LOADING'
export const startAddItemsInPlaylistLoading = createAction(START_ADD_ITEMS_IN_PLAYLIST_LOADING)

export const END_ADD_ITEMS_IN_PLAYLIST_LOADING = 'mp/END_ADD_ITEMS_IN_PLAYLIST_LOADING'
export const endAddItemsInPlaylistLoading = createAction(END_ADD_ITEMS_IN_PLAYLIST_LOADING)

const musicPlayerInitialState = {

    playList : List([]),// Map({ song : ### , album : ### , singer : ### , duration : ### , checked : ###})

    isLoading : true,

    remote : Map({
        receive : false,
        operationCode : null,
        operand : null,
    }),

    isAddItemsPlayListLoading : false,
}

export const musicPlayerReducer = handleActions({

    [ACCEPT_GET_PLAYLIST] : (state , action) => {
        const newState = { ...state }
        const { playList } = action.payload
        playList.map(value => { value.checked = false; return value})
        newState.playList = newState.playList.clear().concat(fromJS(playList))
        return newState
    },

    [ABORT_GET_PLAYLIST] : (state , action) => {
        const newState = { ...state }
        return newState
    },

    [ACCEPT_PLAYLIST_ITEM_ADD] : (state , action) => {
        const newState = { ...state }
        const { addedPlayList } = action.payload
        newState.playList = newState.playList.concat(fromJS(addedPlayList))
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
        //ToastAndroid.show('START LOADING' , 2200)
        newState.isLoading = true
        return newState
    },
    [END_LOADING] : (state , action) => {
        const newState = { ...state }
        //ToastAndroid.show('END LOADING' , 2200)
        newState.isLoading = false
        return newState
    },

    [START_ADD_ITEMS_IN_PLAYLIST_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isAddItemsPlayListLoading = true
        return newState
    },
    [END_ADD_ITEMS_IN_PLAYLIST_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isAddItemsPlayListLoading = false
        return newState
    },

    //명령 전달
    [REMOTE_PLAY_INNER] : (state , action) => {
        const newState = { ...state }
        //ToastAndroid.show(`${action.payload.startIndex}` , 3000)
        newState.remote = newState.remote
        .set('receive' , true)
        .set('operationCode' , REMOTE_OP_CODE.PLAY)
        .set('operand' , action.payload.startIndex)
        return newState
    },

    //명령 처리 완료
    [REMOTE_RECEIVED] : (state , action) => {
        const newState = { ...state }
        newState.remote = newState.remote
        .set('receive' , false)
        .set('operationCode' , null)
        .set('operand' , null)
        return newState
    }

}, musicPlayerInitialState)

function* RemotePlaySaga(action) {
    const MusicPlayerState = yield select(state => state.musicPlayer)
    const startIndex = MusicPlayerState.playList.size

    yield* fetchPlayListItemAddSaga({payload : action.payload})

    yield put({ type : START_LOADING })
    yield put({ type : REMOTE_PLAY_INNER , payload : { startIndex : startIndex }})
    yield put({ type : END_LOADING })

}


function* fetchGetPlayListSaga(action) {
    yield put({ type : START_LOADING })
    yield post('/mymusic/getplaylist' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_PLAYLIST , ABORT_GET_PLAYLIST)
    yield put({ type : END_LOADING })
}

function* fetchPlayListItemAddSaga(action) {
    yield put({ type : START_ADD_ITEMS_IN_PLAYLIST_LOADING })
    yield post('/mymusic/playlistitemadd' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_ADD , ABORT_GET_PLAYLIST)
    yield put({ type : END_ADD_ITEMS_IN_PLAYLIST_LOADING })
}

function* fetchPlayListItemRemoveSaga(action) {
    yield put({ type : START_LOADING })
    yield put({type : PLAYLIST_ITEM_REMOVE , payload : action.payload})
    yield post('/mymusic/playlistitemremove' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_REMOVE , ABORT_PLAYLIST_ITEM_REMOVE)
    yield put({ type : END_LOADING })
}

export function* musicPlayerSaga () {
    yield takeLatest(REMOTE_PLAY , RemotePlaySaga)

    yield takeLatest(FETCH_GET_PLAYLIST , fetchGetPlayListSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_ADD , fetchPlayListItemAddSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_REMOVE , fetchPlayListItemRemoveSaga)
}

