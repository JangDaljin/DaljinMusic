import { createAction , handleActions } from 'redux-actions'
import { List , Map, fromJS } from 'immutable'
import { takeLatest , put} from 'redux-saga/effects'
import { post } from './Request/request'

export const CHANGE_CURRENT_MUSIC_INDEX = 'mp/CHANGE_CURRENT_MUSIC_INDEX'
export const changeCurrentMusicIndex = createAction(CHANGE_CURRENT_MUSIC_INDEX)

export const FETCH_PLAY_MUSIC = 'mp/FETCH_PLAY_MUSIC'
export const fetchPlayMusic = createAction(FETCH_PLAY_MUSIC)

export const ACCEPT_PLAY_MUSIC = 'mp/ACCEPT_PLAY_MUSIC'
export const acceptPlayMusic = createAction(ACCEPT_PLAY_MUSIC)

export const ABORT_PLAY_MUSIC = 'mp/ABORT_PLAY_MUSIC'
export const abortPlayMusic = createAction(ABORT_PLAY_MUSIC)

export const CHANGE_CHECKED = 'mp/CHANGE_CHECKED'
export const changeChecked = createAction(CHANGE_CHECKED)

export const CHANGE_PLAYOPTION = 'mp/CHANGE_PLAYOPTION'
export const changePlayOption = createAction(CHANGE_PLAYOPTION)

export const CLEAR_PLAYLIST= 'mp/CLEAR_PLAYLIST'
export const clearPlayList = createAction(CLEAR_PLAYLIST)

export const CHANGE_CURRENT_DURATION = 'mp/CHANGE_CURRENT_DURATION'
export const changeCurrentDuration = createAction(CHANGE_CURRENT_DURATION)

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



const musicPlayerInitialState = {
    playList : List([]),// Map({ song : ### , album : ### , singer : ### , duration : ### , checked : ###})
    currentMusicIndex : 0,
    currentDuration : 0,
    playOption : Map({
        loop : false,
        only : false,
        random : false,
    })
}

export const musicPlayerReducer = handleActions({
    [CHANGE_CURRENT_MUSIC_INDEX] : (state , action) => {
        const newState = { ...state }

        if(typeof action.payload === 'undefined')
            newState.currentMusicIndex = newState.playList.size-1
        else if(typeof action.payload === 'number')
            newState.currentMusicIndex = action.payload
        else 
            newState.currentMusicIndex = action.payload.index
        return newState
    },
    [ACCEPT_PLAY_MUSIC] : (state , action) => {
        const newState =  { ...state }
        newState.currentMusicIndex = newState.playList.size-1
        return newState
    },
    [ABORT_PLAY_MUSIC] : (state , action) => {
        const newState =  { ...state }
        return newState
    },  
    [CHANGE_CHECKED] : (state , action) => {
        const newState = { ...state }
        const index = action.payload
        if(typeof index === 'undefined') {
            newState.playList = newState.playList.map(value => value.update('checked' , (_value) => !_value ))
        }
        if(typeof index === 'number') {
            newState.playList = newState.playList.updateIn([index , 'checked'] , value => !value )
        }
        return newState
    },

    [CLEAR_PLAYLIST] : (state , action) => {
        const newState = { ...state }
        newState.playList = newState.playList.clear()
        return newState
    },

    [CHANGE_PLAYOPTION] : (state , action) => {
        const newState = { ...state }

        const { loop , random , only } = action.payload 

        if(typeof loop !== 'undefined' && typeof loop === 'boolean')
            newState.playOption = newState.playOption.set('loop' , loop)
        if(typeof random !== 'undefined' && typeof random === 'boolean')
            newState.playOption = newState.playOption.set('random' , random)
        if(typeof only !== 'undefined' && typeof only === 'boolean')
            newState.playOption = newState.playOption.set('only' , only)

        return newState
    },

    [CHANGE_CURRENT_DURATION] : (state , action) => {
        const newState = { ...state }
        const { duration } = action.payload
        newState.currentDuration = duration
        return newState
    },

    [ACCEPT_GET_PLAYLIST] : (state , action) => {
        const newState = { ...state }
        const { playList } = action.payload
        playList.map(value => { value.checked = false; return value})
        console.dir(playList)
        newState.playList = newState.playList.clear().concat(fromJS(playList))    
        return newState
    },

    [ABORT_GET_PLAYLIST] : (state , action) => {
        const newState = { ...state }
        return newState
    },

    [ACCEPT_PLAYLIST_ITEM_ADD] : (state , action) => {
        const newState = { ...state }
        const { playList } = action.payload
        playList.map((value => { value.checked = false; return value; }))
        newState.playList = newState.playList.concat(fromJS(playList))    
        return newState
    },

    [ABORT_PLAYLIST_ITEM_ADD] : (state , action) => {
        const newState = { ...state }
        return newState
    },

    [PLAYLIST_ITEM_REMOVE] : (state , action) => {
        const newState = { ...state }
        const { removeList }= action.payload
        for(const index of removeList) {
            if(index === newState.currentMusicIndex) {
                newState.currentMusicIndex = 0;
            }
            newState.playList = newState.playList.splice(index , 1)
        }
        //newState.playList = newState.playList.filter(value => !(value.get('checked')))
        return newState
    },

    [ACCEPT_PLAYLIST_ITEM_REMOVE] : (state , action) => {
        const newState = { ...state }       
        return newState
    },

    [ABORT_PLAYLIST_ITEM_REMOVE] : (state , action) => {
        const newState = { ...state }
        return newState
    },


}, musicPlayerInitialState)

function* fetchPlayMusicSaga(action) {
    yield post('/mymusic/playmusic' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAY_MUSIC , ABORT_PLAY_MUSIC)
}

function* fetchGetPlayListSaga(action) {
    yield post('/mymusic/getplaylist' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_PLAYLIST , ABORT_GET_PLAYLIST)
}

function* fetchPlayListItemAddSaga(action) {
    yield post('/mymusic/playlistitemadd' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_ADD , ABORT_PLAYLIST_ITEM_ADD)
}

function* fetchPlayListItemRemoveSaga(action) {
    yield put({type : PLAYLIST_ITEM_REMOVE , payload : action.payload})
    yield post('/mymusic/playlistitemremove' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_REMOVE , ABORT_PLAYLIST_ITEM_REMOVE)
}

export function* musicPlayerSaga () {
    yield takeLatest(FETCH_PLAY_MUSIC , fetchPlayMusicSaga)
    yield takeLatest(FETCH_GET_PLAYLIST , fetchGetPlayListSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_ADD , fetchPlayListItemAddSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_REMOVE , fetchPlayListItemRemoveSaga)
}

