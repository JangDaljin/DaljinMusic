import { createAction , handleActions } from 'redux-actions'

import config from '../config'


const LOGIN = 'login/LOGIN'
const USERIDCHANGE = 'login/USERIDCHANGE'
const USERPWCHANGE = 'login/USERPWCHANGE'

export const login = createAction(LOGIN)
export const useridchange = createAction(USERIDCHANGE) // id
export const userpwchange = createAction(USERPWCHANGE) // pw


const initialState = {
    userid : '',
    userpw : '',
    isAuthenticated : false,
}

export default handleActions({
    [LOGIN] : (state , action) => {
        
        const newState = { ...state }

        console.log("LOGIN ACTION HANDLERR")
        /*
        const data = {
            userid : newState.userid,
            userpw : newState.userpw
        }
        
        const req = {
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST'
        }

        fetch(config.SERVER + '/login' , req)
        .then(res => res.json())
        .then(json =>  {
        newState.isAuthenticated = json.isOK;
        console.log(newState.isAuthenticated);
        })
        .catch(err => console.log(err))
        */
        return newState;
    },
    [USERIDCHANGE] : (state, action) => {
        const newState = { ...state }
        newState.userid = action.payload
        return newState
    },
    [USERPWCHANGE] : (state , action) => {
        const newState = { ...state }
        newState.userpw = action.payload
        return newState
    }
} , initialState)
