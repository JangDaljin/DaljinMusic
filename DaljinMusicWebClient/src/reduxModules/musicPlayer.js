import { createAction , handleActions } from 'redux-actions'
import { List , Map, fromJS } from 'immutable'
import { takeLatest } from 'redux-saga/effects'
import { post } from './Request/request'

export const CHANGE_CHECKED = 'mp/CHANGE_CHECKED'
export const changeChecked = createAction(CHANGE_CHECKED)

export const ADD_LIST_ITEM = 'mp/ADD_LIST_ITEM'
export const addListItem = createAction(ADD_LIST_ITEM)

export const REMOVE_LIST_ITEM_BY_INDEX = 'mp/REMOVE_LIST_ITEM_BY_INDEX'
export const removeListItemByIndex = createAction(REMOVE_LIST_ITEM_BY_INDEX)

export const REMOVE_CHECKED_ITEM = 'mp/REMOVE_CHECKED_ITEM'
export const removeCheckedItem = createAction(REMOVE_CHECKED_ITEM)

export const CHANGE_PLAYING_OPTION = 'mp/CHANGE_PLAYING_OPTION'
export const changePlayingOption = createAction(CHANGE_PLAYING_OPTION)

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
    playingOption : Map({
        loop : false,
        only : false,
        random : false,
    })
}

export const musicPlayerReducer = handleActions({
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

    [ADD_LIST_ITEM] : (state , action) => {
        const newState = { ...state }
        
        const item = action.payload

        if(List.isList(item)) {
            newState.playList = newState.playList.concat(item)
        }
        else {
            newState.playList = newState.playList.push(item)
        }
        
        return newState
    },

    [REMOVE_CHECKED_ITEM] : (state , action) => {
        const newState = { ...state }
        newState.playList = newState.playList.filter((value) => !value.get('checked'))
        return newState
    },

    [CHANGE_PLAYING_OPTION] : (state , action) => {
        const newState = { ...state }

        const { loop , random , only } = action.payload 

        if(typeof loop !== 'undefined' && typeof loop === 'boolean')
            newState.playingOption = newState.playingOption.set('loop' , loop)
        if(typeof random !== 'undefined' && typeof random === 'boolean')
            newState.playingOption = newState.playingOption.set('random' , random)
        if(typeof only !== 'undefined' && typeof only === 'boolean')
            newState.playingOption = newState.playingOption.set('only' , only)

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
        newState.playList = newState.playList.clear().concat(fromJS(playList))    
        return newState
    },

    [ABORT_GET_PLAYLIST] : (state , action) => {
        const newState = { ...state }
        return newState
    },

    [ACCEPT_PLAYLIST_ITEM_ADD] : (state , action) => {
        const newState = {...state}
        const { playList } = action.payload
        console.dir(playList)
        newState.playList = newState.playList.clear().concat(fromJS(playList))    
        return newState
    },

    [ABORT_PLAYLIST_ITEM_ADD] : (state , action) => {
        const newState = { ...state }
        return newState
    },

    [ACCEPT_PLAYLIST_ITEM_REMOVE] : (state , action) => {
        const newState = { ...state }
        const { playList } = action.payload
        newState.playList = newState.playList.clear().concat(fromJS(playList))    
        return newState
    },

    [ABORT_PLAYLIST_ITEM_REMOVE] : (state , action) => {
        const newState = { ...state }
        return newState
    },


}, musicPlayerInitialState)

function* fetchGetPlayListSaga(action) {
    yield post('/mymusic/getplaylist' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_PLAYLIST , ABORT_GET_PLAYLIST)
}

function* fetchPlayListItemAddSaga(action) {
    yield post('/mymusic/playlistitemadd' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_ADD , ABORT_PLAYLIST_ITEM_ADD)
}

function* fetchPlayListItemRemoveSaga(action) {
    yield post('/mymusic/playlistitemremove' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_REMOVE , ABORT_PLAYLIST_ITEM_REMOVE)
}

export function* musicPlayerSaga () {
    yield takeLatest(FETCH_GET_PLAYLIST , fetchGetPlayListSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_ADD , fetchPlayListItemAddSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_REMOVE , fetchPlayListItemRemoveSaga)
}

