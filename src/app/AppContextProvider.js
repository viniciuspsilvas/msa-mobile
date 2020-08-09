import React, { createContext, useReducer, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import { createApolloFetch } from 'apollo-fetch';
import packageJson from '../../package.json';
import { VALIDATE_TOKEN } from 'msa-mobile/src/api/auth'

const TOKEN_LOCAL_STORE = `${packageJson.name}-token`;

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );


    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            const fetch = createApolloFetch({
                uri: 'http://192.168.1.106:4000/graphql',
            });

            try {
                userToken = await AsyncStorage.getItem(TOKEN_LOCAL_STORE);

                async function removeUser() {
                    await AsyncStorage.removeItem(TOKEN_LOCAL_STORE)
                }

                fetch({
                    query: `query validateToken($token: String) {
                        validateToken(token: $token)
                      }`,
                    variables: { token: userToken },
                }).then(res => {

                    if (res.data.validateToken) {
                        //TODO caso o login seja valido, 
                        // deve ser extrair o usuario do token ou buscar novamente no banco 
                        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
              
                    } else {
                        removeUser();
                        dispatch({ type: 'RESTORE_TOKEN', token: null });
                    }

                }).catch((error) => {
                    removeUser();
                    dispatch({ type: 'RESTORE_TOKEN', token: null });
                });

            } catch (e) {
                // Restoring token failed
                dispatch({ type: 'RESTORE_TOKEN', token: null });
            }
        };

        bootstrapAsync();
    }, []);


    const authContext = React.useMemo(
        () => ({
            logout: () => {
                async function removeUser() {
                    await AsyncStorage.removeItem(TOKEN_LOCAL_STORE)
                }
                removeUser();
                setState({ user: {} })

                // TODO quando o usuario fizer logout, devera ser interrompido o Pusher, a busca das messagens e tb as notificacoes.
                // Lembrar tambem de deleter o device do student. 
                // Ou seja, o aparelho nao deve buscar messagens e receber notificacoes

                dispatch({ type: 'SIGN_OUT' })
            },

            signUp: async data => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
