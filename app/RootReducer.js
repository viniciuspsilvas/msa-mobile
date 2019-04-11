import { combineReducers } from "redux";
import loginReducer from "../src/scenes/Login/reducer"
import messagesReducer from "../src/scenes/Messages/reducer";
import attendanceReducer from "../src/scenes/Attendance/reducer";

import { reducer as formReducer } from 'redux-form';

import { LOGOUT } from '../src/scenes/Login/actions';

const appReducer = combineReducers({
    loginReducer,
    messagesReducer,
    attendanceReducer,
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