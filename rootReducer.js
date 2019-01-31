import { combineReducers } from "redux";
import loginReducer from "./scenes/Login/reducer";
import messagesReducer from "./scenes/Messages/reducer";

import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    loginReducer,
    messagesReducer,
    form: formReducer
});