import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import packageJson from '../../package.json';

const TOKEN_LOCAL_STORE = `${packageJson.name}-token`;

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [state, setState] = useState({ useLoader: false, user: {}})

    useEffect(() => {
        try {
            AsyncStorage.getItem(TOKEN_LOCAL_STORE).then(user => {
                setState({ user: JSON.parse(user) })
            })
        } catch (error) {
            // Error retrieving data
        }
    }, []);

    const actions = {
        setLoggedUser: (data) => {
            async function saveStorage(value) {
                await AsyncStorage.setItem(TOKEN_LOCAL_STORE, JSON.stringify(value))
            }
            saveStorage(data);
            setState({ user: data })
        },
        getLoggedUser: () => (state.user),

        logout: () => {
            async function removeUser() {
                await AsyncStorage.removeItem(TOKEN_LOCAL_STORE)
            }
            removeUser();
            setState({ user: {} })
            
            // TODO quando o usuario fizer logout, devera ser interrompido o Pusher, a busca das messagens e tb as notificacoes.
            // Lembrar tambem de deleter o device do student. 
            // Ou seja, o aparelho nao deve buscar messagens e receber notificacoes
        },
    }
    return (
        <AppContext.Provider value={{ state, actions }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
