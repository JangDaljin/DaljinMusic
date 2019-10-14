import { createAction , handleActions } from 'redux-actions'
import { put , call , takeLatest } from 'redux-saga/effects'
import Config from '../config'

export const FETCH_GET_MYMUSIC = 'mymusic/GETFETCH'
export const fetchMyMusic = createAction(FETCH_GET_MYMUSIC)

export const ACCEPT_GET_MYMUSIC = 'mymusic/GETACCEPT'
export const acceptMyMusic = createAction(ACCEPT_GET_MYMUSIC)

export const ABORT_GET_MYMUSIC = 'mymusic/GETABORT'
export const abortMyMusic = createAction(ABORT_GET_MYMUSIC)

export const SELECT_LIST = 'mymusic/SELECTLIST'
export const selectList = createAction(SELECT_LIST)

const NOTHING = '-'

const myMusicInitialState = {
    myMusicList : [{
        listName: NOTHING,
        items : []
    }],
    nothing : true,
    curSelectList : 0
    /* 
    {
        listName : '',
        items : [
            {
                number : '',
                album : '',
                albumImgUri : '',
                song : '',
                singer : '',
                time : '',
            }
        ]
    }
    */
}

export const myMusicReducer = handleActions({
    [ACCEPT_GET_MYMUSIC] : (state , action) => {
        const newState = { ...state }
        const List = action.payload

        if(newState.nothing === true && List.length > 0) {
            newState.myMusicList.splice(0 , newState.myMusicList.length)
            newState.nothing = false;
            for(let i = 0; i < List.length ; i++) {
                newState.myMusicList.push(List[i])
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
    }
} , myMusicInitialState)


function* fetchGetSaga(action) {
    const request = {
        body : JSON.stringify(action.payload),
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'POST'
    }

    try 
    {
        const response = yield call(fetch , `${Config.SERVER}/mymusic` , request)
        
        if(response.ok) {
            yield put({type: ACCEPT_GET_MYMUSIC , payload : yield call([response , 'json'])})
        }
        else {
            throw new Error('aborted')
        }
    }
    catch(error) {
        yield put({type : ABORT_GET_MYMUSIC})
    }
}

export function* myMusicSaga() {
    yield takeLatest(FETCH_GET_MYMUSIC , fetchGetSaga)
}