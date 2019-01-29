import { combineReducers } from "redux";
import loginReducer from "./scenes/Login/reducer";
import { reducer as formReducer } from 'redux-form';

import mainReducer from "./scenes/Main/reducer";

export default combineReducers({
    loginReducer,
    mainReducer,
    form: formReducer
});