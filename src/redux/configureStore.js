import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
import { AsyncStorage } from 'react-native';

import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = createLogger();

/* Persis the redux store 
*/
const persistConfig = {
    key: "msa-mobile",
    storage: AsyncStorage,
    whitelist: ["loginReducer"]
};

export const store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeWithDevTools(applyMiddleware(thunk, logger))
);

export const persistor = persistStore(store);