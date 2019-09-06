import * as ActionTypes from './ActionTypes'

export function login () {
    return { 
        type : ActionTypes.ACTION_LOGIN 
    }
}

export function useridChange (id)  {
    return {
        type : ActionTypes.ACTION_USERID_CHANGE,
        id
    }
}

export function userpwChange (pw) {
    return {
        type : ActionTypes.ACTION_USERPW_CHANGE,
        pw 
    }
}

