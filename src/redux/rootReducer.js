import { combineReducers } from "redux";
import loginReducer from "../scenes/Login/reducer"
import messagesReducer from "../scenes/Messages/reducer";

import { reducer as formReducer } from 'redux-form';

import { LOGOUT } from '../scenes/Login/actions';

const appReducer = combineReducers({
    loginReducer,
    messagesReducer,
    form: formReducer
})

export default rootReducer = (state, action) => {
    if (action.type === LOGOUT) {

        // for all keys defined in your persistConfig(s)
        //storage.removeItem('persist:root')
        // storage.removeItem('persist:otherKey')
        state = undefined
    }

    return appReducer(state, action)
}