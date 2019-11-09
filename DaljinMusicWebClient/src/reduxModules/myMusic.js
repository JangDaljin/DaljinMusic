import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { List } from 'immutable'
import Config from '../config'
import { post } from './Request/request'
export const FETCH_GET_MYMUSICLISTS = 'mymusic/FETCTGETMUSICLISTS'
export const fetchGetMyMusicLists = createAction(FETCH_GET_MYMUSICLISTS)

export const ACCEPT_GET_MYMUSICLISTS = 'mymusic/ACCEPTGETMUSICLISTS'
export const acceptGetMyMusicLists = createAction(ACCEPT_GET_MYMUSICLISTS)

export const ABORT_GET_MYMUSICLISTS = 'mymusic/ABORTGETMYMUSICLISTS'
export const abortGetMyMusicLists = createAction(ABORT_GET_MYMUSICLISTS)

export const SELECT_LIST = 'mymusic/SELECTLIST'
export const selectList = createAction(SELECT_LIST)

export const TOGGLE_CHECKED = 'mymusic/TOGGLECHECKED'
export const toggleChecked = createAction(TOGGLE_CHECKED)

export const MODAL_FETCH_UPLOAD_FILE = 'mymusic/MODALFETCHUPLOADFILE'
export const modalFetchUploadFile = createAction(MODAL_FETCH_UPLOAD_FILE)

export const MODAL_ACCEPT_UPLOAD_FILE = 'mymusic/MODALACCEPTUPLOADFILE'
export const modalAcceptUploadFile = createAction(MODAL_ACCEPT_UPLOAD_FILE)

export const MODAL_ABORT_UPLOAD_FILE = 'mymusic/MODALABORTUPLOADFILE'
export const modalAbortUploadFile = createAction(MODAL_ABORT_UPLOAD_FILE)

export const MODAL_FETCH_MAKE_MUSIC_LIST = 'mymusic/MODALFETCHMAKEMUSICLIST'
export const modalFetchMakeMusicList = createAction(MODAL_FETCH_MAKE_MUSIC_LIST)

export const MODAL_ACCEPT_MAKE_MUSIC_LIST = 'mymusic/MODALACCEPTMAKEMUSICLIST'
export const modalAcceptMakeMusicList = createAction(MODAL_ACCEPT_MAKE_MUSIC_LIST)

export const MODAL_ABORT_MAKE_MUSIC_LIST = 'mymusic/MODALABORTMAKEMUSICLIST'
export const modalAbortMakeMusicList = createAction(MODAL_ABORT_MAKE_MUSIC_LIST)

export const MODAL_FETCH_DELETE_MUSIC_LIST = 'mymusic/MODALFETCHDELETEMUSICLIST'
export const modalFetchDeleteMusicList = createAction(MODAL_FETCH_DELETE_MUSIC_LIST)

export const MODAL_ACCEPT_DELETE_MUSIC_LIST = 'mymusic/MODALACCEPTDELETEMUSICLIST'
export const modalAcceptDeleteMusicList = createAction(MODAL_ACCEPT_DELETE_MUSIC_LIST)

export const MODAL_ABORT_DELETE_MUSIC_LIST = 'mymusic/MODALABORTDELETEMUSICLIST'
export const modalAbortDeleteMusicList = createAction(MODAL_ABORT_DELETE_MUSIC_LIST)

export const FETCH_ADD_MUSIC_IN_LIST = 'mymusic/FETCHADDMUSICINLIST'
export const fetchAddMusicInList = createAction(FETCH_ADD_MUSIC_IN_LIST)

export const ACCEPT_ADD_MUSIC_IN_LIST = 'mymusic/ACCEPTADDMUSICINLIST'
export const acceptAddMusicInList = createAction(ACCEPT_ADD_MUSIC_IN_LIST)

export const ABORT_ADD_MUSIC_IN_LIST = 'mymusic/ABORTADDMUSICINLIST'
export const abortAddMusicInList = createAction(ABORT_ADD_MUSIC_IN_LIST)

export const FETCH_REMOVE_MUSIC_IN_LIST = 'mymusic/FETCHREMOVEMUSICINLIST'
export const fetchRemoveMusicInList = createAction(FETCH_REMOVE_MUSIC_IN_LIST)

export const ACCEPT_REMOVE_MUSIC_IN_LIST = 'mymusic/ACCEPTREMOVEMUSICINLIST'
export const acceptRemoveMusicInList = createAction(ACCEPT_REMOVE_MUSIC_IN_LIST)

export const ABORT_REMOVE_MUSIC_IN_LIST = 'mymusic/ABORTREMOVEMUSICINLIST'
export const abortRemoveMusicInList = createAction(ABORT_REMOVE_MUSIC_IN_LIST)

const myMusicInitialState = {
    myMusicLists : List([]),
    curSelectList : -1,  
    uploadProgress : 0,
    /* 
    //리스트 구조
    {
        listName : '',
        items : [
            {
                id : '',
                album : '',
                albumImgUri : '',
                song : '',
                singer : '',
                time : '',
                chcked : '' // 클라이언트 전용
            }
        ]
    }
    */
}

export const myMusicReducer = handleActions({
    [ACCEPT_GET_MYMUSICLISTS] : (state , action) => {
        const newState = { ...state }
        newState.myMusicLists = newState.myMusicLists.clear()
        const { myMusicLists} = action.payload

        newState.myMusicLists = newState.myMusicLists.concat(myMusicLists.map(value => { value.selected = false; return value }))
        return newState
    },
    [ABORT_GET_MYMUSICLISTS] : (state , action) => {
        const newState = { ...myMusicInitialState } 
        return newState
    },
    [SELECT_LIST] : (state , action) => {
        const newState = { ...state }
        const { selectedList } = action.payload
        newState.curSelectList = selectedList
        //newState.myMusicLists.forEach((value , index , array) => { array[index].selected = false })
        newState.myMusicLists = newState.myMusicLists.map((value) => value.selected = false ).setIn([selectedList , 'selected'] , true)
        
        return newState
    },
    [TOGGLE_CHECKED] : (state , action) => {
        const newState = { ...state }
        const item = action.payload

        const foundItem = newState.myMusicList[newState.curSelectList].items.find((value) => ( value.id === item.id ))
        if(foundItem !== undefined) {
            foundItem.checked = !foundItem.checked
        }
        return newState
    },
    [MODAL_ACCEPT_UPLOAD_FILE] : (state , action) => {
        const newState = { ...state }
        console.log("ACCEPT UPLOAD")
        return newState
    },
    [MODAL_ABORT_UPLOAD_FILE] : (state , action) => {
        const newState = { ...myMusicInitialState }
        console.log("ABORT UPLOAD")
        return newState
    },
    [MODAL_ACCEPT_MAKE_MUSIC_LIST] : (state , action) => {
        const newState = { ...state }
        const { myMusicLists , message } = action.payload
        newState.myMusicLists = myMusicLists
        window.alert(message)
        return newState
    },
    [MODAL_ABORT_MAKE_MUSIC_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState }
        return newState
    },
    [MODAL_ACCEPT_DELETE_MUSIC_LIST] : (state , action) => {
        const newState = { ...state }
        const { myMusicLists , message } = action.payload
        newState.myMusicLists = myMusicLists
        window.alert(message);
        return newState
    },
    [MODAL_ABORT_DELETE_MUSIC_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState}
        return newState
    },
    [ACCEPT_ADD_MUSIC_IN_LIST] : (state , action) => {
        const newState = { ...state }

        return newState
    },
    [ABORT_ADD_MUSIC_IN_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState }
        return newState
    },
    [ACCEPT_REMOVE_MUSIC_IN_LIST] : (state , action) => {
        const newState = { ...state }

        return newState
    },
    [ABORT_REMOVE_MUSIC_IN_LIST] : (state , action) => {
        const newState = {...myMusicInitialState }
        return newState
    }
} , myMusicInitialState)


function* fetchGetMyMusicListsSaga(action) {
    yield post(`${Config.SERVER}/mymusic/getmusiclists` , { 'Content-Type' : 'application/json' , 'Cache' : 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_MYMUSICLISTS , ABORT_GET_MYMUSICLISTS)
}

function* fetchUploadSaga (action) {
    const { userId , fileList , listId } = action.payload
    const formData = new FormData()
    formData.append('userId' , userId)
    formData.append('listId' , listId)
    for(const file of fileList) {
        formData.append('fileList' , file , file.name)
    }
    yield post(`${Config.SERVER}/mymusic/upload` , {} , formData , MODAL_ACCEPT_UPLOAD_FILE , MODAL_ABORT_UPLOAD_FILE)
}

function* fetchMakeMusicListSaga(action) {
    yield post(`${Config.SERVER}/mymusic/makemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , MODAL_ACCEPT_MAKE_MUSIC_LIST , MODAL_ABORT_MAKE_MUSIC_LIST)
}

function* fetchDeleteMusicListSaga(action) {
    yield post(`${Config.SERVER}/mymusic/deletemusiclist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , MODAL_ACCEPT_DELETE_MUSIC_LIST , MODAL_ABORT_DELETE_MUSIC_LIST)
}

function* fetchAddMusicInListSaga(action) {
    yield post(`${Config.SERVER}/mymusic/addmusicinlist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_ADD_MUSIC_IN_LIST , ABORT_ADD_MUSIC_IN_LIST)
}

function* fetchRemoveMusicInListSaga(action) {
    yield post(`${Config.SERVER}/mymusic/removemusicinlist` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_REMOVE_MUSIC_IN_LIST , ABORT_REMOVE_MUSIC_IN_LIST)
}

export function* myMusicSaga() {
    yield takeLatest(FETCH_GET_MYMUSICLISTS , fetchGetMyMusicListsSaga)
    yield takeLatest(MODAL_FETCH_UPLOAD_FILE , fetchUploadSaga)
    yield takeLatest(MODAL_FETCH_MAKE_MUSIC_LIST , fetchMakeMusicListSaga)
    yield takeLatest(MODAL_FETCH_DELETE_MUSIC_LIST , fetchDeleteMusicListSaga)
    yield takeLatest(FETCH_ADD_MUSIC_IN_LIST , fetchAddMusicInListSaga)
    yield takeLatest(FETCH_REMOVE_MUSIC_IN_LIST , fetchRemoveMusicInListSaga)
}