import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = createLogger();

/* Persis the redux store 
*/
const persistConfig = {
    key: "msa-mobile",
    storage,
    //whitelist: ["loginReducer"]
};

export const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(applyMiddleware(thunk, logger))
);

export const persistor = persistStore(store);