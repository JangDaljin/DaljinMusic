import { createAction , handleActions } from 'redux-actions'
import { List , Map, fromJS } from 'immutable'
import { takeLatest , put} from 'redux-saga/effects'
import { post } from './Request/request'


export const SHOW = 'mp/SHOW'
export const show = createAction(SHOW)

export const HIDE = 'mp/HIDE'
export const hide = createAction(HIDE) 

export const PLAY = 'mp/PLAY'
export const play = createAction(PLAY)
export const PAUSE = 'mp/PAUSE'
export const pause = createAction(PAUSE)

export const CHANGE_CURRENT_MUSIC_INDEX = 'mp/CHANGE_CURRENT_MUSIC_INDEX'
export const changeCurrentMusicIndex = createAction(CHANGE_CURRENT_MUSIC_INDEX)

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

export const MONITOR_OPEN = 'mp/MONITOR_OPEN'
export const monitorOpen = createAction(MONITOR_OPEN)

export const MONITOR_CLOSE = 'mp/MONITOR_CLOSE'
export const monitorClose = createAction(MONITOR_CLOSE)

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

export const ON_REMOTE = 'mp/ON_REMOTE'
export const onRemote = createAction(ON_REMOTE)

export const OFF_REMOTE = 'mp/OFF_REMOTE'
export const offRemote = createAction(OFF_REMOTE)

const musicPlayerInitialState = {
    show : false,

    playList : List([]),// Map({ song : ### , album : ### , singer : ### , duration : ### , checked : ###})
    randomPlayList : List([]),

    addedIndex : -1,

    currentMusicIndex : -1,
    currentDuration : 0,
    playOption : Map({
        loop : false,
        one : false,
        random : false,
    }),
    isPlaying : false,
    remote : Map({
        play : false,
        pause : false,
        next : false,
        prev : false,
    }),
    monitor : false,
}

export const musicPlayerReducer = handleActions({
    [SHOW] : (state , action) => {
        const newState = { ...state }
        newState.show = true
        return newState
    },

    [HIDE] : (state , action) => {
        const newState = { ...state }
        newState.show = false
        newState.playList = newState.playList.map(value => value.set('checked' , false))
        return newState
    },

    [PLAY] : (state , action) => {
        const newState = { ...state }
        newState.isPlaying = true
        return newState
    },

    [PAUSE] : (state , action) => {
        const newState = { ...state }
        newState.isPlaying = false
        return newState
    },

    [CHANGE_CURRENT_MUSIC_INDEX] : (state , action) => {
        const newState = { ...state }
        if(typeof action.payload == 'undefined')
            newState.currentMusicIndex = newState.playList.size-1
        else if(typeof action.payload == 'number')
            newState.currentMusicIndex = action.payload
        else 
            newState.currentMusicIndex = action.payload.index
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

        const { loop , random , one } = action.payload 

        if(typeof loop === 'boolean')
            newState.playOption = newState.playOption.set('loop' , loop)
        if(typeof random === 'boolean') 
            newState.playOption = newState.playOption.set('random' , random)
        if(typeof one === 'boolean')
            newState.playOption = newState.playOption.set('one' , one)
        //console.dir(`option : ${newState.playOption.get('loop')}`)

        return newState
    },

    [CHANGE_CURRENT_DURATION] : (state , action) => {
        const newState = { ...state }
        const { duration } = action.payload
        if(typeof duration == 'number') {
            newState.currentDuration = duration
        }
        else if(typeof duration == 'undefined' && typeof action.payload == 'number'){
            newState.currentDuration = action.payload
        }
        return newState
    },

    [ACCEPT_GET_PLAYLIST] : (state , action) => {
        //일반 리스트 생성
        const newState = { ...state }
        const { playList  , addedIndex } = action.payload

        newState.addedIndex = addedIndex

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

        newState.addedIndex = newState.playList.size

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


    [ON_REMOTE] : (state , action) => {
        const newState = { ...state }
        const { play , pause , next , prev } = action.payload
        if(typeof play == "boolean")
            newState.remote = newState.remote.set('play' , play)
        if(typeof pause == "boolean")
            newState.remote = newState.remote.set('pause' , pause)
        if(typeof next == "boolean")
            newState.remote = newState.remote.set('next' , next)
        if(typeof prev == "boolean")
            newState.remote = newState.remote.set('prev' , prev)
        return newState
    },
    [OFF_REMOTE] : (state , action) => {
        const newState = { ...state }
        newState.remote = newState.remote.set('play' , false).set('pause' , false).set('next' , false).set('prev' , false)
        return newState
    },
    [MONITOR_OPEN] : (state , action) => {
        const newState = { ...state }
        newState.monitor = true
        return newState
    },

    [MONITOR_CLOSE] : (state , action) => {
        const newState = { ...state }
        newState.monitor = false
        return newState
    }


}, musicPlayerInitialState)

function* fetchGetPlayListSaga(action) {
    yield post('/mymusic/getplaylist' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_PLAYLIST , ABORT_GET_PLAYLIST)
}

function* fetchPlayListItemAddSaga(action) {
    yield put({type : MONITOR_OPEN})
    yield post('/mymusic/playlistitemadd' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_ADD , ABORT_GET_PLAYLIST)
    yield put({type : MONITOR_CLOSE})
}

function* fetchPlayListItemRemoveSaga(action) {
    yield put({type : MONITOR_OPEN})
    yield put({type : PLAYLIST_ITEM_REMOVE , payload : action.payload})
    yield post('/mymusic/playlistitemremove' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_PLAYLIST_ITEM_REMOVE , ABORT_PLAYLIST_ITEM_REMOVE)
    yield put({type : MONITOR_CLOSE})
}

export function* musicPlayerSaga () {
    yield takeLatest(FETCH_GET_PLAYLIST , fetchGetPlayListSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_ADD , fetchPlayListItemAddSaga)
    yield takeLatest(FETCH_PLAYLIST_ITEM_REMOVE , fetchPlayListItemRemoveSaga)
}

