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

const myMusicInitialState = {
    myMusicList : [{
        listName: '',
        items : []
    }],
    curSelectList : 0,
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
        const List = action.payload

        newState.myMusicList = [];

        for(let i = 0 ; i < List.length ; i++) {
            newState.myMusicList.push(List[i])
            for(let j = 0 ;  j < List[i].items.length ; j++) {
                newState.myMusicList[i].checked = false
            }    
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
    }
} , myMusicInitialState)


function* fetchGetSaga(action) {
    yield post(`${Config.SERVER}/mymusic` , { 'Content-Type' : 'application/json' } , JSON.stringify(action.payload) , ACCEPT_GET_MYMUSIC , ABORT_GET_MYMUSIC)
}

function* fetchUploadSaga (action) {
    const formData = new FormData()
    console.dir(action.payload)
    for(const file of action.payload) {
        formData.append('filelist' , file , file.name)
    }

    yield post(`${Config.SERVER}/mymusic/upload` , {} , formData , MODAL_ACCEPT_UPLOAD_FILE , MODAL_ABORT_UPLOAD_FILE)
}

export function* myMusicSaga() {
    yield takeLatest(FETCH_GET_MYMUSIC , fetchGetSaga)
    yield takeLatest(MODAL_FETCH_UPLOAD_FILE , fetchUploadSaga)
}