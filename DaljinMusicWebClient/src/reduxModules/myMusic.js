import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import Config from '../config'
import { post } from './Request/request'
export const FETCH_GET_MYMUSIC = 'mymusic/GETFETCH'
export const fetchMyMusic = createAction(FETCH_GET_MYMUSIC)

export const ACCEPT_GET_MYMUSIC = 'mymusic/GETACCEPT'
export const acceptMyMusic = createAction(ACCEPT_GET_MYMUSIC)

export const ABORT_GET_MYMUSIC = 'mymusic/GETABORT'
export const abortMyMusic = createAction(ABORT_GET_MYMUSIC)

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

const myMusicInitialState = {
    myMusicLists : [],
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
    [ACCEPT_GET_MYMUSIC] : (state , action) => {
        const newState = { ...state }
        newState.myMusicLists.splice(0 , newState.myMusicLists.length)
        const { myMusicLists} = action.payload
        for(const myMusicList of myMusicLists) {
            newState.myMusicLists.push(
                { 
                    listName : myMusicList.listName,
                    _id : myMusicList._id,
                    list : myMusicList.list.map((value , index) => ({ ...value , checked : false})),
                    selected : false,
                }
            )
        }
        return newState
    },
    [ABORT_GET_MYMUSIC] : (state , action) => {
        const newState = { ...myMusicInitialState } 
        return newState
    },
    [SELECT_LIST] : (state , action) => {
        const newState = { ...state }
        newState.curSelectList = action.payload.selectedList
        newState.myMusicLists.forEach((value , index , array) => { array[index].selected = false })
        newState.myMusicLists[newState.curSelectList].selected = true
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
        const { message } = action.payload
        if(message !== '' || message !== 'undefined') {
            window.alert(message)
        }
        return newState
    },
    [MODAL_ABORT_MAKE_MUSIC_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState }
        return newState
    },
    [MODAL_ACCEPT_DELETE_MUSIC_LIST] : (state , action) => {
        const newState = { ...state }
        return newState
    },
    [MODAL_ABORT_DELETE_MUSIC_LIST] : (state , action) => {
        const newState = { ...myMusicInitialState}
        return newState
    },
} , myMusicInitialState)


function* fetchGetSaga(action) {
    yield post(`${Config.SERVER}/mymusic` , { 'Content-Type' : 'application/json' , 'Cache' : 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_MYMUSIC , ABORT_GET_MYMUSIC)
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

export function* myMusicSaga() {
    yield takeLatest(FETCH_GET_MYMUSIC , fetchGetSaga)
    yield takeLatest(MODAL_FETCH_UPLOAD_FILE , fetchUploadSaga)
    yield takeLatest(MODAL_FETCH_MAKE_MUSIC_LIST , fetchMakeMusicListSaga)
    yield takeLatest(MODAL_FETCH_DELETE_MUSIC_LIST , fetchDeleteMusicListSaga)
}