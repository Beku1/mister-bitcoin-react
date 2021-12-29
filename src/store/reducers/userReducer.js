const INITIAL_STATE = {
    loggedInUser: null
}

export function userReducer(state = INITIAL_STATE, action) {

    
    switch (action.type) {

        case 'SET_LOGGEDIN_USER':
            return{
                ...state,
                loggedInUser:action.loggedInUser
            }

            case 'SIGN_OUT':
                return{
                    ...state,
                    loggedInUser:null
                }

        default:
            return state;
    }
}