import { combineReducers } from "redux";
import loginReducer from "./src/scenes/Login/reducer";
import messagesReducer from "./src/scenes/Messages/reducer";
import attendanceReducer from "./src/scenes/Attendance/reducer";

import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    loginReducer,
    messagesReducer,
    attendanceReducer,
    form: formReducer
});