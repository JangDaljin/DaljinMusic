import * as ActionTypes from '../actions/ActionTypes'

const loginState = {
    userid : '',
    userpw : ''
}

export default function login  (state = loginState , action)  {

    const newState = Object.assign({} , state)

    switch(action.type) {
        case ActionTypes.ACTION_LOGIN : 
            break;
            
        case ActionTypes.ACTION_USERID_CHANGE : 
            newState.userid = action.id
            break
        case ActionTypes.ACTION_USERPW_CHANGE : 
            newState.userpw = action.pw
            break
        
        default : 
            break
        
    }

    return newState;
}

