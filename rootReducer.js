import { combineReducers } from "redux";
import loginReducer from "./scenes/Login/reducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    loginReducer,
    form: formReducer
});