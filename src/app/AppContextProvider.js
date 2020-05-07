import React, { createContext, useState } from "react";
import { AsyncStorage } from 'react-native';

const STUDENT_LOCAL_STORAGE = 'STUDENT_MSA'

const AppContext = createContext();
const AppContextProvider = ({ children }) => {
    const [state, setState] = useState({ useLoader: false, user: {} })

    const actions = {
        setLoggedUser: async (data) => {
            console.log("setLoggedUser => ", data)
            await AsyncStorage.setItem(STUDENT_LOCAL_STORAGE, data)
        },
        getLoggedUser: async () => {
            return await AsyncStorage.getItem(STUDENT_LOCAL_STORAGE)
        },
    }
    /* 
        const actions = React.useMemo(() => ({
            setUseLoader: useLoader => setState(st => ({
                ...st,
                useLoader
            })),
            setLoggedUser: async (data) => {
                await AsyncStorage.setItem(STUDENT_LOCAL_STORAGE, data)
            },
            getLoggedUser: async () => {
                return await AsyncStorage.getItem(STUDENT_LOCAL_STORAGE)
            },
        }), [setState]) */

    return (
        <AppContext.Provider value={{ state, actions }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
